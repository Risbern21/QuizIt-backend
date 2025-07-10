import { PrismaClient } from "@prisma/client";
import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import { prisma } from "../lib/prisma";
import { User } from "../generated/prisma";

const GoogleStratergy = passportGoogle.Strategy;

passport.use(
  new GoogleStratergy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      //get profile details and save info in supabase
      const user = await prisma.users.findUnique({
        where: {
          id: profile.id,
        },
      });

      if (!user) {
        const newUser = await prisma.users.create({
          data: {
            id: profile.id,
            username: profile.displayName,
            email: profile.emails?.[0].value!,
          },
        });
        if (newUser) {
          done(null, newUser);
        }
      } else {
        done(null, user);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user: any, done) => {
  //find user by id
  done(null, user);
});
