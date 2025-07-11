"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.get("/google", passport_1.default.authenticate("google", {
    scope: ["email", "profile"],
}));
router.get("/google/redirect", passport_1.default.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}`,
    session: true,
}));
router.get("/user", auth_controller_1.userHandler);
router.get("/logout", auth_controller_1.logout);
exports.default = router;
