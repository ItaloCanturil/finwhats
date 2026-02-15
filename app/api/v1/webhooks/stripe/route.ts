import stripe from "@/_lib/stripe";
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
   try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error('Missing stripe signature or webhook secret');
    }
    
    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);

    switch (event.type) {
        case "checkout.session.completed":
            if(event.data.object.payment_status === "paid") {
                // TODO: Add code here
            }

            if (event.data.object.payment_status === "unpaid") {
                // TODO: Add code here
            }
            break;
        case "checkout.session.expired":
            if (event.data.object.payment_status === "unpaid") {
                
            }
            break;
    }

    return NextResponse.json({ result: event, ok: true });
   } catch (error) {
        console.error(error);
        return NextResponse.json({ message: `Webhook error: ${error}`, ok: false }, { status: 500 });
   }
}
