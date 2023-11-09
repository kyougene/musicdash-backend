import express from "express";

export const spotifyRouter = express.Router();

spotifyRouter.get("/top", (req, res) => {
  console.log(req.session);
  //   console.log(req.user ? true : false);
});
