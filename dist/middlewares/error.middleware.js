"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({
        message: err.message || "internal server error",
    });
};
exports.default = errorHandler;
