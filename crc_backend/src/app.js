import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.routes.js";
import programsRoutes from "./routes/programs.routes.js";
import kinesRoutes from "./routes/kines.routes.js";
import clientsRoutes from "./routes/clients.routes.js";
import attentionRoutes from "./routes/attentions.routes.js";
import { URL_FRONTEND } from "./config.js";

const app = express();

app.use(
    cors({
        origin: [URL_FRONTEND],
        credentials: true,
    })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/api", programsRoutes);
app.use("/api", kinesRoutes);
app.use("/api", clientsRoutes);
app.use("/api", attentionRoutes);

export default app;
