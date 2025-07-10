import express from "express";
import morganLogger from "./middlewares/logger.middleware";
import errorHandler from "./middlewares/error.middleware";
import userRoutes from "./routes/users.routes";
import authRoutes from "./routes/auth.routes";
import generateRoutes from "./routes/generate.routes";
import "./config/passport";
import sessionMiddleware from "./middlewares/session.middleware";
import passport from "passport";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp"

const app = express();

app.use(express.json());

//security
app.use(helmet())
app.use(hpp())

//middlewares
app.use(morganLogger);
app.use(errorHandler);

//apply cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

//setting up express-session
app.use(sessionMiddleware);

//initializing passport
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/generate", generateRoutes);

export default app;
