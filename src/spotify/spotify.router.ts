import express from "express";

export const spotifyRouter = express.Router();

spotifyRouter.get("/recents", (req, res) => {
  const user = req.session.user;
  console.log(user);
});
