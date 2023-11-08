import passport from "passport";
import { Strategy } from "passport-spotify";
import prisma from "../db.js";

type User = {
  id: number;
  spotifyId: string;
  accessToken: string;
  refreshToken: string;
};

passport.serializeUser((user: User, done) => {
  done(null, user.spotifyId);
});

passport.deserializeUser(async (id, done) => {
  const user = await prisma.spotifyProfile.findFirst({
    where: {
      spotifyId: id,
    },
  });
  done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/spotify/redirect",
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      try {
        const user = await prisma.spotifyProfile.findFirst({
          where: { spotifyId: profile.id },
        });
        if (user) {
          done(null, user);
        } else {
          const newUser = await prisma.spotifyProfile.create({
            data: {
              spotifyId: profile.id,
              accessToken,
              refreshToken,
            },
          });
          console.log(newUser);
          return done(null, newUser);
        }
      } catch (error) {
        console.error(error);
      }
    }
  )
);
