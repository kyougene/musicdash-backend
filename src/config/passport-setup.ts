import passport from "passport";
import { Strategy } from "passport-spotify";
import prisma from "../db.js";
import { User } from "../custom.js";

passport.serializeUser((user: User, done) => {
  done(null, user.spotifyId);
});

passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findFirst({
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
        let user = await prisma.user.findFirst({
          where: { spotifyId: profile.id },
        });
        if (user) {
          user = await prisma.user.update({
            where: { id: user.id },
            data: {
              accessToken,
              refreshToken,
              expires_at: Date.now() + expires_in * 1000,
            },
          });
          return done(null, user);
        } else {
          const newUser = await prisma.user.create({
            data: {
              spotifyId: profile.id,
              accessToken,
              refreshToken,
              expires_at: Date.now() + expires_in * 1000,
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
