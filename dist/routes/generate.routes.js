"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generate_controller_1 = require("../controllers/generate.controller");
const router = (0, express_1.Router)();
router.post("/", generate_controller_1.generate);
exports.default = router;
