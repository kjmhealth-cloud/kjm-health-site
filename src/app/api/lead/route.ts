import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;

        if (!webhookUrl) {
            console.error(
                "❌ ZAPIER_WEBHOOK_URL is missing – set it in .env.local"
            );
            throw new Error(
                "ZAPIER_WEBHOOK_URL is not configured — check .env.local"
            );
        }

        // ── Normalize phone to (XXX) XXX-XXXX ──
        const cleanPhone = data.phone.replace(/\D/g, "").slice(-10);
        const formattedPhone = cleanPhone.replace(
            /(\d{3})(\d{3})(\d{4})/,
            "($1) $2-$3"
        );
        const payload = { ...data, phone: formattedPhone };

        // ── Forward payload to Zapier ──
        console.log("Webhook Payload:", JSON.stringify(payload, null, 2));

        try {
            const webhookResponse = await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!webhookResponse.ok) {
                console.error(
                    `Webhook responded with status ${webhookResponse.status}`
                );
                return NextResponse.json(
                    { error: "Failed to process your request. Please try again." },
                    { status: 502 }
                );
            }
        } catch (webhookError) {
            console.error("Webhook Error:", webhookError);
            return NextResponse.json(
                { error: "Failed to process your request. Please try again." },
                { status: 502 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Lead API error:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}
