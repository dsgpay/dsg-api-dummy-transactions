// @ts-check
import express, { json, urlencoded } from "express";
import { expressjwt as jwt } from "express-jwt";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../config/swagger.js";

import { server } from "../config/env.js";
import { homepage } from "./public/index.js";
import debug from "../helpers/debug.js";
import ApiError from "../utils/ApiError.js";
import { errorConverter, errorHandler } from "./middlewares/errors.js";

// Routes
import devRoute from "./dev/dev.route.js";
import stpPaymentRoute from "./stpPayment/stpPayment.route.js";

const logger = debug("api:index");

const app = express();

// Middleware to parse JSON bodies and URL-encoded bodies
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(cors());

// Logger middleware to log HTTP requests in the 'dev' format
app.use(
  morgan("dev", {
    skip: (req) => ["", "/", "/favicon.ico"].includes(req?.originalUrl), // Skip logging for the root and favicon routes
  })
);

// Middleware to prevent caching by setting Cache-Control header to "no-store"
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// JWT authentication middleware
app.use(
  jwt({
    secret: server?.secret, // Secret key for JWT
    algorithms: ["HS256"], // Supported algorithms for JWT
    // credentialsRequired: false,
  }).unless({ path: ["", "/", /^\/api-docs\/.*/, /^\/dev\/.*/] })
);

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

/**
 * Ping endpoint to verify that the server is active.
 * @route GET /ping
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void} Responds with "pong"
 */
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Dev
app.use("/dev", devRoute);

// Dev
app.use("/stp-payment", stpPaymentRoute);

/**
 * Middleware to handle 404 errors for routes not found.
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void} Passes the error to the next error handler
 */
app.use((req, res, next) => {
  next(new ApiError(404, "Resource not found"));
});

// Middleware to convert errors into ApiError instances, if needed
app.use(errorConverter);

// Middleware to handle errors and send the appropriate response
app.use(errorHandler);

const PORT = server?.port || 3000;
app.listen(PORT, () => {
  logger(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
