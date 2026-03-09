import express from "express";
import { consoleLogger } from "./api/v1/middleware/logger";
import healthRoutes from "./api/v1/routes/healthRoutes";
import loanRoutes from "./api/v1/routes/loanRoutes";

const app = express();

app.use(consoleLogger);

app.use(express.json());

app.use("/api/v1", healthRoutes);

app.use("/api/v1", loanRoutes);

export default app;