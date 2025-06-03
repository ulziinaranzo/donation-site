import { RequestHandler } from "express";
import { prisma } from "../../db";

export const handleStripe: RequestHandler = async (req, res) => {
  const event = req.body;

  try {
    switch (event.type) {
      case "checkout.session.completed": 
        const { client_reference_id } = event.data.object;

        await prisma.donation.update({
          where: {
            id: Number(client_reference_id),
          },
          data: {
            isPaid: true,
          },
        });

        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.send("Success");
  } catch (error) {
    console.error("Error handling Stripe webhook:", error); 
    res.status(500).send("Internal Server Error"); 
  }
};
