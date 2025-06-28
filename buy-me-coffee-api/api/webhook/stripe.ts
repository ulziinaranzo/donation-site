import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { prisma } from "../../src/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const sig = req.headers["stripe-signature"] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    console.log("✅ Webhook signature verified:", event.type);
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return res.status(400).json({ error: `Webhook Error: ${err}` });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("▶️ Received checkout.session.completed event");
        console.log(
          "💡 Full session object:",
          JSON.stringify(session, null, 2)
        );

        const client_reference_id = session.client_reference_id;

        if (!client_reference_id) {
          console.warn("⚠️ client_reference_id not found in session");
          return res
            .status(400)
            .json({ error: "client_reference_id is missing" });
        }

        const updatedDonation = await prisma.donation.update({
          where: { id: Number(client_reference_id) },
          data: {
            isPaid: true,
            updatedAt: new Date(),
          },
        });

        console.log("✅ Donation updated successfully:", {
          id: updatedDonation.id,
          isPaid: updatedDonation.isPaid,
        });
        break;

      case "payment_intent.succeeded":
        console.log("✅ Payment intent succeeded:", event.data.object.id);
        break;

      default:
        console.log(`❕ Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("❌ Error handling webhook:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
