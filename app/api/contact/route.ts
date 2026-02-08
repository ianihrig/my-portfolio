import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, company } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Honeypot check
    if (company) {
      // Pretend success to fool bots
      return NextResponse.json({ ok: true });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ??
      req.headers.get("x-real-ip") ??
      "unknown";

    const now = Date.now();
    const entry = ipHits.get(ip);

    if (!entry || now - entry.ts > RATE_LIMIT_WINDOW_MS) {
      ipHits.set(ip, { count: 1, ts: now });
    } else {
      entry.count += 1;
      if (entry.count > RATE_LIMIT_MAX) {
        return NextResponse.json(
          { error: "Too many requests" },
          { status: 429 }
        );
      }
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password
      },
    });

    const finalSubject = subject?.trim() ? subject.trim() : "Portfolio message";

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] ${finalSubject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}\n`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max submissions per IP
const ipHits = new Map<string, { count: number; ts: number }>();
