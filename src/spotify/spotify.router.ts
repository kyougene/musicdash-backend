import express from "express";
import axios from "axios";
export const spotifyRouter = express.Router();

spotifyRouter.get("/top", async (req, res) => {
  const accessToken =
    "BQA0G2w_c8j1AJjJ6fLtdE_LjEFf1_UBk1KdiJUT0FmhsRWLQjqI9aJZAQSu_JmYECwCJYijOCTTCS12qLknA3Rr8pxwRFycjrVTaAq14FaqqCj9zUxAwCj5uEHUSmBb0Bs6qlbdJUP8-Rs3pZUFqlyPHpH-CygA58WMqHaYFWh2bofBBahtmbzafdUdczEoayWEhqM";

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
