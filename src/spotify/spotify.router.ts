import express from "express";
import { UserAuthInfoRequest } from "../custom.js";

export const spotifyRouter = express.Router();

spotifyRouter.get("/top", (req: UserAuthInfoRequest, res) => {
  console.log(req.user);
  res.send(req.user);
});
