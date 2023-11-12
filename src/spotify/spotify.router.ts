import express from "express";
import { UserInfo } from "../custom.js";
import prisma from "../db.js";
import axios from "axios";

type ResponseData = {
  refresh_token: string;
  access_token: string;
  expires_at: number;
  token_type: string;
  bearer: string;
};

export const spotifyRouter = express.Router();

spotifyRouter.get("/top/songs/", async (req: UserInfo, res) => {
  refreshAccessToken(req.user.spotifyId);
  if (req.user.spotifyId) {
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
      params: {
        time_range: "short_term",
        limit: 10,
      },
    };

    try {
      const response = await axios(options);
      const topTracks = response.data.items.map((data) => {
        return { name: data.name, artist: data.artists[0].name };
      });
      res.json(topTracks);
    } catch (error) {
      console.error("Error fetching top tracks:", error);
      res.status(500).json({ error: "Failed to fetch top tracks" });
    }
  } else {
    res.status(500).json({ error: "No user found" });
  }
});

spotifyRouter.get("/top/artists/", async (req: UserInfo, res) => {
  refreshAccessToken(req.user.spotifyId);
  const id = req.user.spotifyId;
  const user = await prisma.user.findFirst({
    where: {
      spotifyId: id,
    },
  });
  const accessToken = user.accessToken;
  const url = "https://api.spotify.com/v1/me/top/artists";
  const options = {
    method: "GET",
    url,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      time_range: "medium_term",
      limit: 10,
    },
  };

  try {
    const response = await axios(options);
    const topArtists = response.data.items.map((data) => {
      return data.name;
    });
    res.json(topArtists);
  } catch (error) {
    console.error("Error fetching top artists:", error);
    res.status(500).json({ error: "Failed to fetch top artists" });
  }
});

spotifyRouter.get("/profile/", async (req: UserInfo, res) => {
  refreshAccessToken(req.user.spotifyId);
  const id = req.user.spotifyId;
  const user = await prisma.user.findFirst({
    where: {
      spotifyId: id,
    },
  });
  const accessToken = user.accessToken;
  const url = `https://api.spotify.com/v1/users/${user.spotifyId}`;
  const options = {
    method: "GET",
    url,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const profile = await axios(options);

    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

spotifyRouter.get("/top/songs/", async (req: UserInfo, res) => {
  refreshAccessToken(req.user.spotifyId);
  if (req.user.spotifyId) {
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
      res.json(topTracks);
    } catch (error) {
      console.error("Error fetching top tracks:", error);
      res.status(500).json({ error: "Failed to fetch top tracks" });
    }
  } else {
    res.status(500).json({ error: "No user found" });
  }
});

spotifyRouter.get("/recommendations/", async (req: UserInfo, res) => {
  refreshAccessToken(req.user.spotifyId);
  if (req.user.spotifyId) {
    const id = req.user.spotifyId;
    const user = await prisma.user.findFirst({
      where: {
        spotifyId: id,
      },
    });
    const accessToken = user.accessToken;

    try {
      const trackResponse = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            time_range: "short_term",
            limit: 5,
          },
        }
      );
      const topTracks = trackResponse.data.items.map((data) => {
        return data.id;
      });
      const artistResponse = await axios.get(
        "https://api.spotify.com/v1/me/top/artists",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            time_range: "short_term",
            limit: 5,
          },
        }
      );
      const topArtists = artistResponse.data.items.map((data) => {
        return data.id;
      });

      const recommendationsResponse = await axios.get(
        "https://api.spotify.com/v1/recommendations/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            limit: 10,
            seed_artists: topArtists.join(","),
          },
        }
      );
      const recommendations = recommendationsResponse.data.tracks.map(
        (data) => {
          return {
            name: data.name,
            artist: data.artists.map((artist) => {
              return artist.name;
            }),
          };
        }
      );
      res.status(200).send(recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      res.status(500).json({ error: "Failed to fetch top recommendations" });
    }
  }
});

const refreshAccessToken = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      spotifyId: id,
    },
  });

  const refreshToken = user.refreshToken;

  if (Date.now() > user.expires_at) {
    try {
      const refreshResponse: ResponseData = await axios.post(
        "https://accounts.spotify.com/api/token",
        `grant_type=refresh_token&refresh_token=${refreshToken}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
              `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
            ).toString("base64")}`,
          },
        }
      );

      prisma.user.update({
        where: {
          spotifyId: user.spotifyId,
        },
        data: {
          accessToken: refreshResponse.access_token,
          refreshToken: refreshResponse.refresh_token,
          expires_at: Date.now() + refreshResponse.expires_at * 1000,
        },
      });
    } catch (error) {
      console.error("Error refreshing token:", error.message);
      return;
    }
  }
};
