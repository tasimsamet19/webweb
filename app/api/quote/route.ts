import { NextResponse } from "next/server";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { createOrder } from "@/lib/orders";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip, "quote", 5)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const formData = await request.formData();
    const fields: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") fields[key] = value;
    }
    const artworkFile = formData.get("artworkFile") as File | null;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fields.email || !emailRegex.test(fields.email)) {
      return NextResponse.json({ success: false, error: "Invalid email address" }, { status: 400 });
    }

    // Create order record & generate order number
    const order = await createOrder({
      customerName: `${fields.firstName} ${fields.lastName}`.trim(),
      customerEmail: fields.email,
      customerPhone: fields.phone,
      company: fields.company || undefined,
      productName: fields.productName || fields.category,
      category: fields.category,
      quantity: Number(fields.quantity) || 0,
      decorationMethod: fields.decorationMethod,
      designNotes: fields.designNotes,
    });

    // Admin email body
    const adminEmailBody = `
NEW ORDER — ${order.orderNumber}
========================================

ORDER NUMBER: ${order.orderNumber}
Submitted: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}

CONTACT
-------
Name: ${fields.firstName} ${fields.lastName}
Email: ${fields.email}
Phone: ${fields.phone}
Company: ${fields.company || "N/A"}

ORDER DETAILS
-------------
Product: ${fields.productName || fields.category}
Decoration Method: ${fields.decorationMethod}
Quantity: ${fields.quantity}
Number of Colors: ${fields.numberOfColors}
Sizes Breakdown: ${fields.sizesBreakdown || "N/A"}
Date Needed By: ${fields.neededByDate || "N/A"}

PRINT LOCATIONS
---------------
${fields.selectedLocations || "Not specified"}

ARTWORK
-------
Status: ${fields.hasArtwork}
File: ${artworkFile ? artworkFile.name : "None uploaded"}
Pantone Colors: ${fields.pantoneColors || "N/A"}
Design Notes: ${fields.designNotes}

ADDITIONAL NOTES
----------------
${fields.additionalNotes || "None"}
    `.trim();

    // Customer confirmation HTML email
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://printwearledgewood.com";
    const trackUrl = `${siteUrl}/track-order?order=${order.orderNumber}`;

    const customerEmailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#080808;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#f0f0f0">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:40px">
      <div style="font-size:13px;font-weight:700;letter-spacing:0.2em;color:#E84520;text-transform:uppercase;margin-bottom:4px">Printwear Ledgewood</div>
      <div style="font-size:11px;letter-spacing:0.15em;color:rgba(255,255,255,0.4);text-transform:uppercase">Ledgewood, New Jersey</div>
    </div>

    <!-- Order confirmed banner -->
    <div style="background:#E84520;border-radius:12px;padding:28px 24px;text-align:center;margin-bottom:32px">
      <div style="font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.8);margin-bottom:8px">Order Received</div>
      <div style="font-size:32px;font-weight:800;letter-spacing:0.05em;color:#fff">${order.orderNumber}</div>
    </div>

    <!-- Greeting -->
    <p style="font-size:16px;color:rgba(255,255,255,0.85);margin:0 0 8px 0">Hi ${fields.firstName},</p>
    <p style="font-size:15px;color:rgba(255,255,255,0.5);line-height:1.6;margin:0 0 32px 0">
      We've received your order for <strong style="color:#fff">${fields.productName || fields.category}</strong> (${fields.quantity} pieces).
      We'll review your request and reach out within 24 hours with next steps.
    </p>

    <!-- Order summary -->
    <div style="background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px;margin-bottom:32px">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:16px">Order Summary</div>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;color:rgba(255,255,255,0.4)">Order #</td><td style="padding:6px 0;color:#fff;text-align:right;font-weight:600">${order.orderNumber}</td></tr>
        <tr><td style="padding:6px 0;color:rgba(255,255,255,0.4)">Product</td><td style="padding:6px 0;color:#fff;text-align:right">${fields.productName || fields.category}</td></tr>
        <tr><td style="padding:6px 0;color:rgba(255,255,255,0.4)">Quantity</td><td style="padding:6px 0;color:#fff;text-align:right">${fields.quantity} pieces</td></tr>
        <tr><td style="padding:6px 0;color:rgba(255,255,255,0.4)">Decoration</td><td style="padding:6px 0;color:#fff;text-align:right">${fields.decorationMethod}</td></tr>
      </table>
    </div>

    <!-- Status steps -->
    <div style="background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px;margin-bottom:32px">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:16px">What Happens Next</div>
      ${[
        { step: "1", label: "Quote Received", done: true },
        { step: "2", label: "Design Review (1–2 business days)" },
        { step: "3", label: "You Approve the Design" },
        { step: "4", label: "In Production (7–10 business days)" },
        { step: "5", label: "Shipped to You" },
      ].map(({ step, label, done }) => `
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <div style="width:28px;height:28px;border-radius:50%;background:${done ? "#E84520" : "rgba(255,255,255,0.06)"};border:1px solid ${done ? "#E84520" : "rgba(255,255,255,0.12)"};display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px;font-weight:700;color:${done ? "#fff" : "rgba(255,255,255,0.3)"}">${step}</div>
          <span style="font-size:14px;color:${done ? "#fff" : "rgba(255,255,255,0.4)"};font-weight:${done ? "600" : "400"}">${label}</span>
        </div>
      `).join("")}
    </div>

    <!-- Track button -->
    <div style="text-align:center;margin-bottom:32px">
      <a href="${trackUrl}" style="display:inline-block;background:#E84520;color:#fff;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;letter-spacing:0.02em">Track Your Order →</a>
    </div>

    <!-- Contact -->
    <div style="text-align:center;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06)">
      <p style="font-size:13px;color:rgba(255,255,255,0.3);margin:0 0 8px 0">Questions? We're here.</p>
      <a href="tel:+19735804455" style="font-size:15px;font-weight:600;color:#E84520;text-decoration:none">(973) 580-4455</a>
      <p style="font-size:12px;color:rgba(255,255,255,0.2);margin:16px 0 0 0">Printwear Ledgewood · Ledgewood, NJ 07852</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      const attachments: { filename: string; content: Buffer }[] = [];
      if (artworkFile && artworkFile.size > 0) {
        const ab = await artworkFile.arrayBuffer();
        attachments.push({ filename: artworkFile.name, content: Buffer.from(ab) });
      }

      // Email to admin
      await resend.emails.send({
        from: "orders@printwearledgewood.com",
        to: "printwearledgewood@gmail.com",
        replyTo: fields.email,
        subject: `Order ${order.orderNumber}: ${fields.productName || fields.category} (${fields.quantity} pcs) — ${fields.firstName} ${fields.lastName}`,
        text: adminEmailBody,
        attachments: attachments.length > 0 ? attachments : undefined,
      });

      // Confirmation email to customer
      await resend.emails.send({
        from: "orders@printwearledgewood.com",
        to: fields.email,
        subject: `Order Confirmed: ${order.orderNumber} — Printwear Ledgewood`,
        html: customerEmailHtml,
      });
    } else {
      console.log("[ORDER CREATED]", order.orderNumber, adminEmailBody);
    }

    return NextResponse.json({ success: true, orderNumber: order.orderNumber });
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
