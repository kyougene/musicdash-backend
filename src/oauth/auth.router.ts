import express from "express";
import passport from "passport";

export const authRouter = express.Router();

authRouter.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: [
      "user-library-read",
      "user-top-read",
      "user-read-recently-played",
      "user-read-private",
      "user-read-email",
    ],
  })
);

authRouter.get(
  "/spotify/redirect",
  passport.authenticate("spotify", { failureRedirect: "/" }),
  (req, res) => {
    res.status(200).redirect(`http://localhost:3000/dashboard`);
  }
);
