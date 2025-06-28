import { RequestHandler } from "express";
import { prisma } from "../../db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export const handleStripe: RequestHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log("✅ Webhook signature verified");
  } catch (err) {
    console.log(`❌ Webhook signature verification failed.`, err);
    res.status(400).send(`Webhook Error: ${err}`);
    return;
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

    res.json({ received: true });
  } catch (error) {
    console.error("Error handling Stripe webhook:", error);
    res.status(500).send("Internal Server Error");
  }
};
