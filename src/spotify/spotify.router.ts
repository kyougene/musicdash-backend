import express from "express";
import { UserInfo } from "../custom.js";
import prisma from "../db.js";
import axios from "axios";
export const spotifyRouter = express.Router();

spotifyRouter.get("/top", async (req: UserInfo, res) => {
  console.log(req.user);
  console.log(req.user.spotifyId);
  const id = req.user.spotifyId;
  const user = await prisma.user.findFirst({
    where: {
      spotifyId: id,
    },
  });
  const accessToken = user.accessToken;
  const url = "https://api.spotify.com/v1/me/top/tracks";
  const options = {
    method: "GET",
    url,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
    params: {
      time_range: "short_term",
      limit: 10,
    },
  };

  try {
    const response = await axios(options);
    const topTracks = response.data.items.map((data) => {
      return data.name;
    });
    console.log(topTracks);
    res.json(topTracks);
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    res.status(500).json({ error: "Failed to fetch top tracks" });
  }
});
