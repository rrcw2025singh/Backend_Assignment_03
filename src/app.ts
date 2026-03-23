import express, { Application } from "express";

import healthRoutes from "./api/v1/routes/healthRoutes";
import loanRoutes from "./api/v1/routes/loanRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";

import { errorHandler } from "./api/v1/middleware/errorHandler";
import { httpLogger, consoleHttpLogger } from "./api/v1/middleware/httpLogger";

const app: Application = express();

app.use(httpLogger);

if (process.env.NODE_ENV !== "production") {
  app.use(consoleHttpLogger);
}

app.use(express.json());

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/loans", loanRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use(errorHandler);

export default app;