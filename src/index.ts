import express from "express";
import type { Request, Response } from "express";
import { authRouter } from "./oauth/auth.router.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prisma from "./db.js";
import session from "express-session";
import cors from "cors";
import "./config/passport-setup.js";
import passport from "passport";
import { spotifyRouter } from "./spotify/spotify.router.js";
import { UserInfo } from "./custom.js";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: ["https://solo-project-six.vercel.app", "http://localhost:3000"],
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
    credentials: true,
  })
);

app.use(
  session({
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.use("/auth", authRouter);

app.use("/spotify", spotifyRouter);

app.listen(PORT, () => {
  console.log(`now listening on ${PORT}`);
});
