import express from "express";
import passport from "passport";

export const authRouter = express.Router();

authRouter.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: ["user-library-read", "user-top-read", "user-read-recently-played"],
  })
);

authRouter.get(
  "/auth/spotify/redirect",
  passport.authenticate("spotify", {
    successRedirect: `${process.env.URL}dashboard`,
    failureRedirect: `${process.env.URL}`,
  })
);
