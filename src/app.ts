import express, { Application } from "express";
import healthRoutes from "./api/v1/routes/healthRoutes";
import loanRoutes from "./api/v1/routes/loanRoutes";

const app: Application = express();

app.use(express.json());
app.use("/api/v1", healthRoutes);

app.use("/api/v1", loanRoutes);

export default app;