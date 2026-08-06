import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Nodemailer needs Node APIs, so this route can't run on the edge runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface BookingPayload {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  message: string;
  /** Honeypot — real users never fill this in. */
  company?: string;
}

const GUEST_LABELS: Record<string, string> = {
  "250": "Up to 250 Guests",
  "500": "250 – 500 Guests",
  "1000": "500 – 1,500 Guests",
  "3000": "1,500 – 3,000+ Guests",
};

/**
 * Very small in-memory throttle. Serverless instances are short-lived so this
 * won't stop a determined attacker, but it does stop the accidental
 * double-submit and casual form spam without adding a dependency.
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) hits.clear(); // crude guard against unbounded growth
  return recent.length > RATE_LIMIT_MAX;
}

/** Strip characters that could be used to inject extra SMTP headers. */
function sanitizeHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, 200);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASSWORD."
    );
  }

  const port = Number(SMTP_PORT);

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    // 465 is implicit TLS; 587/25 start plaintext and upgrade via STARTTLS.
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as BookingPayload;

    // Honeypot hit — accept silently so bots don't learn they were caught.
    if (body.company) {
      return NextResponse.json({ ok: true });
    }

    const name = sanitizeHeader(body.name ?? "");
    const phone = sanitizeHeader(body.phone ?? "");
    const email = sanitizeHeader(body.email ?? "");
    const eventType = sanitizeHeader(body.eventType ?? "");
    const eventDate = sanitizeHeader(body.eventDate ?? "");
    const guestCount = sanitizeHeader(body.guestCount ?? "");
    const message = (body.message ?? "").trim().slice(0, 2000);

    if (!name || !phone || !email || !eventDate) {
      return NextResponse.json(
        { error: "Please fill in your name, phone, email and preferred date." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "That email address doesn't look right." },
        { status: 400 }
      );
    }

    const transporter = buildTransport();

    const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER!;
    const toAddress = process.env.BOOKING_TO_EMAIL || fromAddress;
    const guests = GUEST_LABELS[guestCount] ?? guestCount;
    const prettyDate = eventDate
      ? new Date(eventDate).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "—";

    const rows: [string, string][] = [
      ["Name", name],
      ["Phone", phone],
      ["Email", email],
      ["Event Type", eventType],
      ["Preferred Date", prettyDate],
      ["Estimated Guests", guests],
      ["Notes", message || "—"],
    ];

    const notificationHtml = `
      <div style="font-family:Helvetica,Arial,sans-serif;background:#090909;padding:32px;color:#E2E2E2;">
        <div style="max-width:600px;margin:0 auto;background:#111;border:1px solid rgba(183,169,154,0.25);border-radius:16px;padding:32px;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#B7A99A;">Astoria Convention Centre</p>
          <h1 style="margin:0 0 24px;font-size:24px;font-weight:300;color:#fff;">New Booking Enquiry</h1>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${rows
              .map(
                ([label, value]) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#A3A3A3;width:170px;vertical-align:top;">${label}</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#fff;">${escapeHtml(value)}</td>
              </tr>`
              )
              .join("")}
          </table>
          <p style="margin:24px 0 0;font-size:12px;color:#666;">Submitted from astoriaconventioncentre.com</p>
        </div>
      </div>`;

    const notificationText = rows.map(([l, v]) => `${l}: ${v}`).join("\n");

    // 1 — Notify the venue. replyTo means staff can just hit reply.
    await transporter.sendMail({
      from: `"Astoria Website" <${fromAddress}>`,
      to: toAddress,
      replyTo: `"${name}" <${email}>`,
      subject: `New Booking Enquiry — ${name} (${eventType})`,
      text: notificationText,
      html: notificationHtml,
    });

    // 2 — Acknowledge to the guest. Never let this fail the whole request:
    // the enquiry is already safely in the venue's inbox.
    try {
      await transporter.sendMail({
        from: `"Astoria Convention Centre" <${fromAddress}>`,
        to: email,
        subject: "We've received your enquiry — Astoria Convention Centre",
        text:
          `Dear ${name},\n\n` +
          `Thank you for your interest in Astoria Convention Centre. We have received your enquiry ` +
          `for a ${eventType} on ${prettyDate} for ${guests}.\n\n` +
          `Our event concierge will contact you within 24 hours.\n\n` +
          `Warm regards,\nAstoria Convention Centre, Kannur`,
        html: `
          <div style="font-family:Helvetica,Arial,sans-serif;background:#090909;padding:32px;color:#E2E2E2;">
            <div style="max-width:600px;margin:0 auto;background:#111;border:1px solid rgba(183,169,154,0.25);border-radius:16px;padding:40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#B7A99A;">Astoria Convention Centre</p>
              <h1 style="margin:0 0 20px;font-size:28px;font-weight:300;color:#fff;">Thank you, ${escapeHtml(name)}</h1>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#A3A3A3;">
                We've received your enquiry for a <span style="color:#B7A99A;">${escapeHtml(eventType)}</span>
                on <span style="color:#B7A99A;">${escapeHtml(prettyDate)}</span> for ${escapeHtml(guests)}.
              </p>
              <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#A3A3A3;">
                Our senior event concierge will be in touch within 24 hours to confirm your visit.
              </p>
              <p style="margin:0;font-size:12px;color:#666;">Kannur, Kerala</p>
            </div>
          </div>`,
      });
    } catch (ackError) {
      console.error("Booking auto-reply failed:", ackError);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Booking submission failed:", error);
    return NextResponse.json(
      { error: "We couldn't send your request. Please call us or try again." },
      { status: 500 }
    );
  }
}
