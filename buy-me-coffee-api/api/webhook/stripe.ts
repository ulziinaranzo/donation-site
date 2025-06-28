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
    console.log("✅ Webhook signature verified", event.type);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err);
    return res.status(400).json({ error: `Webhook Error: ${err}` });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        const { client_reference_id } = session;

        console.log(
          "Processing payment completion for donation:",
          client_reference_id
        );

        if (client_reference_id) {
          const updatedDonation = await prisma.donation.update({
            where: {
              id: Number(client_reference_id),
            },
            data: {
              isPaid: true,
              updatedAt: new Date(),
            },
          });

          console.log("✅ Donation updated successfully:", {
            id: updatedDonation.id,
            isPaid: updatedDonation.isPaid,
          });
        }
        break;

      case "payment_intent.succeeded":
        console.log("Payment intent succeeded:", event.data.object.id);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Error handling Stripe webhook:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
