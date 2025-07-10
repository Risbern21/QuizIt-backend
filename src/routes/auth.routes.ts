import { Router } from "express";
import passport from "passport";
import { logout, redirect, userHandler } from "../controllers/auth.controller";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}`,
    session: true,
  })
);

router.get("/user", userHandler);

router.get("/logout", logout);

export default router;
