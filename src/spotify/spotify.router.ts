import express from "express";
import axios from "axios";
export const spotifyRouter = express.Router();

spotifyRouter.get("/top", async (req, res) => {
  const accessToken =
    "AQA-G788WVQDJTBVmn6HUAI3xWs7yEib_3vSUT7PE9N7RSwGO-ziIVyG4hA5nZ0KKQ0FhgxlSCqVwmIkxifU40ocv5gJUKnxqlcdOYO1A3Rxq7rn1lvhYlemPMhOTFul5tc ";

  const url = "https://api.spotify.com/v1/me/top/artists";

  const headers = {
    Authorization: `Bearer ${accessToken}`, // Include the user's access token in the request headers
  };

  const payload = {
    method: "get",
    url,
    headers: headers,
    params: {
      time_range: "short_term",
      limit: 10,
    },
  };
  try {
    const result = await axios(payload);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
});
