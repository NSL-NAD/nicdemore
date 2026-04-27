import { Resend } from "resend";
import { NextResponse } from "next/server";

const PERSONAL_DOMAINS = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com",
  "icloud.com", "me.com", "aol.com", "live.com",
];

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { name, businessEmail, phone, subject, message, website } = await request.json();

    // Honeypot: if filled, silently accept (bot trap)
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!name || !businessEmail || !subject || !message) {
      return NextResponse.json(
        { error: "All required fields must be filled." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(businessEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const domain = businessEmail.split("@")[1]?.toLowerCase();
    if (PERSONAL_DOMAINS.includes(domain)) {
      return NextResponse.json(
        { error: "Please use a business email address." },
        { status: 400 }
      );
    }

    if (message.length < 20) {
      return NextResponse.json(
        { error: "Message must be at least 20 characters." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "nicdemore.com <hello@goodatscale.co>",
      to: "nademore@gmail.com",
      subject: `[nicdemore.com] ${subject} — from ${name}`,
      replyTo: businessEmail,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="font-size: 20px; margin-bottom: 24px;">New contact form message</h2>
          <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">Name</p>
          <p style="margin: 0 0 20px; font-size: 16px;">${name}</p>
          <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">Business Email</p>
          <p style="margin: 0 0 20px; font-size: 16px;"><a href="mailto:${businessEmail}">${businessEmail}</a></p>
          ${phone ? `
          <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">Phone</p>
          <p style="margin: 0 0 20px; font-size: 16px;">${phone}</p>
          ` : ""}
          <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">Subject</p>
          <p style="margin: 0 0 20px; font-size: 16px;">${subject}</p>
          <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">Message</p>
          <p style="margin: 0; font-size: 16px; white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
