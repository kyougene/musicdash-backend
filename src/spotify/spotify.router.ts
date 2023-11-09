import express from "express";
export const spotifyRouter = express.Router();

spotifyRouter.get("/recents", (req, res) => {
  res.send(req.user);
});
