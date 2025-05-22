import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
import bankCardRouter from "./routes/bank-card.route";
import profileRouter from "./routes/profile.route";
import donationRouter from "./routes/donation.route";

const app = express();
dotenv.config();

const port = 3001;

app.use(express.json());
app.use(userRouter);
app.use(bankCardRouter);
app.use(profileRouter);
app.use(donationRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
