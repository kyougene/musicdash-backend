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

// const refresh = async () => {
//   const spotifyId = "kaiyougene"
//   const payload = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: new URLSearchParams({
//       grant_type: "refresh_token",
//       refresh_token:
//         "AQB7uxRA6t17RPPmFAF_OhwU5e6YBqlC3QEUvrQLJ0FITKfDrvysw05TZqd-ZPSh2XKS5XacaUW9rYK2vTmxoc7wOri_F_wWEc6qUJd_M34uhRx7zYui5PM0dsx6oXkWmYg",
//       client_id: process.env.CLIENT_ID,
//     }),
//   };
//   const body = await fetch("https://accounts.spotify.com/api/token", payload);
//   const data = await body.json();
//   console.log(data);

//   await prisma.user.update({
//     where: {
//       spotifyId: spotifyId
//     },
//     data:{data.accessToken, data.refreshToken}
//   })

// };
