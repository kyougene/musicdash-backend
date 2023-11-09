import express from "express";
import type { Request, Response } from "express";
import { authRouter } from "./oauth/auth.router.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prisma from "./db.js";
import session from "express-session";
import cors from "cors";
import "./config/passport-setup.js";
import passport from "passport";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(
  session({
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req: Request, res: Response) => {
  if (req.session.authorized) {
    return res.redirect("/home");
  } else {
    return res.send("welcome to the page");
  }
});

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`now listening on ${PORT}`);
});
