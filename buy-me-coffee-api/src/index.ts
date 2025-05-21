import express from "express";
import userRouter from "./routes/user.route";
import bankCardRouter from "./routes/bank-card.route";
import profileRouter from "./routes/profile.route";
const app = express();
const port = 3001;

app.use(express.json());
app.use(userRouter);
app.use(bankCardRouter);
app.use(profileRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
