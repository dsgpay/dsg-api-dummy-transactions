// @ts-check
import { MongoServerSelectionError, MongoServerError } from "mongodb";
import { server } from "../../config/env.js";
import debug from "../../helpers/debug.js";
import ApiError from "../../utils/ApiError.js";
import httpStatus from "../../utils/http-status-codes.js";

const logger = debug("middlewares:error");

/**
 * Converts errors into ApiError instances for consistent error handling.
 * This middleware processes different types of errors and normalizes them
 * into a standardized format (ApiError).
 *
 * @param {Object} err - The error thrown in the application
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void} Passes the normalized error to the next middleware
 */
export const errorConverter = (err, req, res, next) => {
  let error = err;
  // If the error is not an instance of ApiError, we normalize it
  if (!(error instanceof ApiError)) {
    // Handling specific error types
    if (error.name === "UnauthorizedError") {
      logger(error.message);
      error = new ApiError(401, "Unauthorized", true, err.stack);
    } else if (error instanceof ReferenceError) {
      logger(error.message);
      error = new ApiError(500, httpStatus[500], false, err.stack);
    } else if (error instanceof SyntaxError) {
      logger(error.message);
      error = new ApiError(400, error.message, false, err.stack);
    } else if (error instanceof TypeError) {
      logger(error.message);
      error = new ApiError(500, error.message, false, err.stack);
    } else if (error instanceof MongoServerSelectionError) {
      logger(error.message);
      error = new ApiError(503, "Database connection error.", false, err.stack);
    } else if (error instanceof MongoServerError) {
      logger(error.message);
      error = new ApiError(504, error.message, false, err.stack);
    } else {
      // If no specific error type, create a generic ApiError
      const statusCode = error.statusCode || 500;
      const message = error.message || httpStatus[statusCode];
      error = new ApiError(statusCode, message, false, err.stack);
    }
  }

  next(error);
};

/**
 * Global error handler middleware for Express.
 * This middleware handles all errors passed by previous middlewares
 * and sends an appropriate HTTP response to the client.
 *
 * @param {Object} err - The error object that was passed through the middleware stack
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void} Sends the response with the error information
 */
export const errorHandler = (err, req, res, next) => {
  let { statusCode, message, stack } = err;
  // In production, hide stack traces and return generic messages for non-operational errors
  if (server?.env === "production" && !err.isOperational) {
    statusCode = 500;
    message = "Internal Server Error";
  }

  // Add the error message to the response locals for possible use in templates
  res.locals.errorMessage = err.message;

  // Constructing the response to be sent to the client
  const response = {
    code: statusCode,
    status: httpStatus[statusCode],
    message,
    ...(server?.env === "development" && { stack: err.stack }), // Include stack trace in dev environment
  };

  // Log the error information for debugging purposes
  logger(`${JSON.stringify(response)}`);

  // Send the error response to the client
  res.status(statusCode).send(response);
};
