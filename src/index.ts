import express from "express";
import type { Request, Response } from "express";
import { userRouter } from "./user/user.router.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`now listening on ${PORT}`);
});
