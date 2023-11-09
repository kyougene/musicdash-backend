import express from "express";
import axios from "axios";
export const spotifyRouter = express.Router();

// const getRefreshToken = async () => {
//   const refreshToken =
//     "BQA0G2w_c8j1AJjJ6fLtdE_LjEFf1_UBk1KdiJUT0FmhsRWLQjqI9aJZAQSu_JmYECwCJYijOCTTCS12qLknA3Rr8pxwRFycjrVTaAq14FaqqCj9zUxAwCj5uEHUSmBb0Bs6qlbdJUP8-Rs3pZUFqlyPHpH-CygA58WMqHaYFWh2bofBBahtmbzafdUdczEoayWEhqM";
//   const url = "https://accounts.spotify.com/api/token";

//   const payload = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: new URLSearchParams({
//       grant_type: "refresh_token",
//       refresh_token: refreshToken,
//       client_id: process.env.CLIENT_ID,
//     }),
//   };
//   const body = await axios(url, payload);
// };

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
    console.log(result.data);
  } catch (err) {
    console.error(err);
  }
});
