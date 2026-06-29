import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fields: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") {
        fields[key] = value;
      }
    }

    const artworkFile = formData.get("artworkFile") as File | null;

    // Build email body
    const emailBody = `
NEW QUOTE REQUEST — Printwear Ledgewood
========================================

CONTACT
-------
Name: ${fields.firstName} ${fields.lastName}
Email: ${fields.email}
Phone: ${fields.phone}
Company: ${fields.company || "N/A"}

ORDER DETAILS
-------------
Product/Category: ${fields.category}
Product Name: ${fields.productName || "N/A"}
Decoration Method: ${fields.decorationMethod}
Quantity: ${fields.quantity}
Number of Colors: ${fields.numberOfColors}
Sizes Breakdown: ${fields.sizesBreakdown || "N/A"}
Date Needed By: ${fields.neededByDate || "N/A"}

ARTWORK
-------
Artwork Status: ${fields.hasArtwork}
Artwork File: ${artworkFile ? artworkFile.name : "None uploaded"}
Pantone Colors: ${fields.pantoneColors || "N/A"}
Design Notes: ${fields.designNotes}

ADDITIONAL NOTES
----------------
${fields.additionalNotes || "None"}

Submitted at: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}
    `.trim();

    // Send via Resend if API key is set
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      await resend.emails.send({
        from: "quotes@printwearledgewood.com",
        to: "printwearledgewood@gmail.com",
        replyTo: fields.email,
        subject: `New Quote Request: ${fields.productName || fields.category} (${fields.quantity} pcs) — ${fields.firstName} ${fields.lastName}`,
        text: emailBody,
      });
    } else {
      // Development: log to console
      console.log("[QUOTE REQUEST]", emailBody);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
