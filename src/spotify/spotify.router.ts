import express from "express";

export const spotifyRouter = express.Router();

spotifyRouter.get("/top", (req, res) => {
  if (req.session) {
    console.log(req.session.user);
  }
  res.send(req.session);
});
