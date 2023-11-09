import express from "express";

export const spotifyRouter = express.Router();

spotifyRouter.get("/top", (req, res) => {
  if (req.user) {
    console.log(req.user);
  }
  res.send(req.session);
});
