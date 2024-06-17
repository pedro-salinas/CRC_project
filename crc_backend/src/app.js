import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.routes.js";
import programsRoutes from "./routes/programs.routes.js";
import kinesRoutes from "./routes/kines.routes.js";
import clientsRoutes from "./routes/clients.routes.js";
import attentionRoutes from "./routes/attentions.routes.js";
import { URL_FRONTEND } from "./config.js";
// import slowDown from "express-slow-down";

const app = express();

// const speedLimiter = slowDown({
//     windowMs: 1 * 60 * 1000, // 1 minuto
//     delayAfter: 25, // Permitir 20 solicitudes por IP en el periodo windowMs antes de aplicar retrasos
//     delayMs: () => 5000, // Retrasar cada solicitud posterior en 1 seg
// });

// app.use(speedLimiter);

app.use(
    cors({
        origin: [URL_FRONTEND],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/api", programsRoutes);
app.use("/api", kinesRoutes);
app.use("/api", clientsRoutes);
app.use("/api", attentionRoutes);

export default app;
