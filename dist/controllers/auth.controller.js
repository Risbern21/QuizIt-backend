"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.userHandler = exports.redirect = void 0;
const redirect = (_, res) => {
    res.redirect(`${process.env.CLIENT_URL}`);
};
exports.redirect = redirect;
const userHandler = (req, res) => {
    if (req.isAuthenticated()) {
        // console.log(req.user);
        res.status(200).json({ user: req.user });
    }
    else {
        res.status(401).json({ error: "unauthenticated" });
    }
};
exports.userHandler = userHandler;
const logout = (req, res, next) => {
    req.logout(function (error) {
        if (error) {
            return next(error);
        }
        res.redirect(`${process.env.CLIENT_URL}/signin`);
    });
};
exports.logout = logout;
