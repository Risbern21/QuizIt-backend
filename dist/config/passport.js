"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const prisma_1 = require("../lib/prisma");
const GoogleStratergy = passport_google_oauth20_1.default.Strategy;
passport_1.default.use(new GoogleStratergy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URL,
}, async (accessToken, refreshToken, profile, done) => {
    //get profile details and save info in supabase
    const user = await prisma_1.prisma.users.findUnique({
        where: {
            id: profile.id,
        },
    });
    if (!user) {
        const newUser = await prisma_1.prisma.users.create({
            data: {
                id: profile.id,
                username: profile.displayName,
                email: profile.emails?.[0].value,
            },
        });
        if (newUser) {
            done(null, newUser);
        }
    }
    else {
        done(null, user);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser(async (user, done) => {
    //find user by id
    done(null, user);
});
