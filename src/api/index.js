// @ts-check
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../config/swagger.js";

import { server } from "../config/env.js";
import { homepage } from "./public/index.js";
import debug from "../helpers/debug.js";

const logger = debug("api:index");

const app = express();

app.use(express.json());

/**
 * Root endpoint that checks if the server is running.
 * @route GET /
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {void} Responds with "OK"
 */
app.get("/", (req, res) => {
  res.status(200).send(homepage);
});

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = server?.port || 3000;
app.listen(PORT, () => {
  logger(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
