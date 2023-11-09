import express from "express";
import { isAuthenticated } from "../authentication.js";
export const spotifyRouter = express.Router();

spotifyRouter.get("/recents", isAuthenticated, (req, res) => {
  res.send(req.user);
});
