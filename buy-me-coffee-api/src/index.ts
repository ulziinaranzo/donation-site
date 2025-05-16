import express from "express";
import userRouter from "./routes/user.route";
const app = express();
const port = 3001;

app.use(userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
