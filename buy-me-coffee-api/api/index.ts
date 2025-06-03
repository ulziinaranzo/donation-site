import express from "express";
import dotenv from "dotenv";
import userRouter from "../src/routes/user.route";
import bankCardRouter from "../src/routes/bank-card.route";
import profileRouter from "../src/routes/profile.route";
import donationRouter from "../src/routes/donation.route";
import authRouter from "../src/routes/auth.route";
import webhookRouter from "../src/routes/webhook.route";
import cors from "cors";

const app = express();
dotenv.config();

const port = 3001;

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(bankCardRouter);
app.use(profileRouter);
app.use(donationRouter);
app.use(authRouter);
app.use(webhookRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
