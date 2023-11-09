import express from "express";

export const spotifyRouter = express.Router();

spotifyRouter.get("/recents", (req, res) => {
  const user = req.user;
  console.log(user);
});
