"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_middleware_1 = __importDefault(require("./middlewares/logger.middleware"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const generate_routes_1 = __importDefault(require("./routes/generate.routes"));
require("./config/passport");
const session_middleware_1 = __importDefault(require("./middlewares/session.middleware"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//security
app.use((0, helmet_1.default)());
app.use((0, hpp_1.default)());
//middlewares
app.use(logger_middleware_1.default);
app.use(error_middleware_1.default);
//apply cors
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
}));
//setting up express-session
app.use(session_middleware_1.default);
//initializing passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", users_routes_1.default);
app.use("/api/generate", generate_routes_1.default);
exports.default = app;
