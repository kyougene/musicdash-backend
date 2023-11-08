import express from "express";
import passport from "passport";

export const spotifyRouter = express.Router();

spotifyRouter.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: ["user-library-read", "user-top-read", "user-read-recently-played"],
  })
);

spotifyRouter.get(
  "/spotify/redirect",
  passport.authenticate("spotify"),
  (req, res) => {
    res.redirect(`${process.env.URL}home`);
  }
);
