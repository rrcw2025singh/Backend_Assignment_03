import express, { Application } from "express";
import loanRoutes from "./api/v1/routes/loanRoutes";

const app: Application = express();

app.use(express.json());

app.use("/api/v1", loanRoutes);

export default app;