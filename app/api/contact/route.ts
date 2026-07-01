import { NextResponse } from "next/server";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip, "contact", 5)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const emailBody = `
NEW CONTACT MESSAGE — Printwear Ledgewood
==========================================

From: ${name} <${email}>
Subject: ${subject}

Message:
${message}

Submitted at: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}
    `.trim();

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      await resend.emails.send({
        from: "contact@printwearledgewood.com",
        to: "printwearledgewood@gmail.com",
        replyTo: email,
        subject: `Contact: ${subject} — ${name}`,
        text: emailBody,
      });
    } else {
      console.log("[CONTACT MESSAGE]", emailBody);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
