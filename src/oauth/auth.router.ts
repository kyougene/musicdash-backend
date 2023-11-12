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
  "/spotify/redirect",
  passport.authenticate("spotify", { failureRedirect: "/" }),
  (req, res) => {
    res.status(200).redirect(`https://solo-project-six.vercel.app/dashboard`);
  }
);
