import express from "express";

export const spotifyRouter = express.Router();

spotifyRouter.get("/top", (req, res) => {
  console.log(req.session);
  res.send(req.session);
});
