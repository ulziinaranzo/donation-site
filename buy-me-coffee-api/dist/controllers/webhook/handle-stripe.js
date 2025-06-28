"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStripe = void 0;
const db_1 = require("../../db");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
});
const handleStripe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log("✅ Webhook signature verified");
    }
    catch (err) {
        console.log(`❌ Webhook signature verification failed.`, err);
        res.status(400).send(`Webhook Error: ${err}`);
        return;
    }
    try {
        switch (event.type) {
            case "checkout.session.completed":
                const session = event.data.object;
                const { client_reference_id } = session;
                console.log("Processing payment completion for donation:", client_reference_id);
                if (client_reference_id) {
                    const updatedDonation = yield db_1.prisma.donation.update({
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
    }
    catch (error) {
        console.error("Error handling Stripe webhook:", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.handleStripe = handleStripe;
//# sourceMappingURL=handle-stripe.js.map