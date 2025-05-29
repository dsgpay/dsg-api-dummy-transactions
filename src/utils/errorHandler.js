// @ts-check
import { MongoServerSelectionError, MongoServerError } from "mongodb";
import debug from "../helpers/debug.js";
import ApiError from "../utils/ApiError.js";
import { server } from "../config/env.js";

const logger = debug("utils:errorHandler");

/**
 * Converts an error to a simplified message if not in development
 * @param {Error} err - The error object
 * @returns {string} - Converted error message
 */
const errorConverter = (err) => {
  if (server?.env === "development") return `${err.name}: ${err.message}`;
  return `${err.name}: ${err.message}`;
};

/**
 * Handles various error types and logs them
 * @param {Error} err - The error object
 * @returns {boolean} - Indicates if the error was successfully handled
 */
const errorHandler = (err) => {
  const handledErrors = [
    ApiError,
    ReferenceError,
    SyntaxError,
    TypeError,
    MongoServerSelectionError,
    MongoServerError,
  ];

  // Check if the error is an instance of any known handled error types
  if (handledErrors.some((ErrorType) => err instanceof ErrorType)) {
    logger(errorConverter(err));
    return true;
  }

  // Handle generic errors
  if (err instanceof Error) {
    logger(`${err.name}: ${err.message}`);
    return true;
  }

  // Handle unknown rejections
  if (
    typeof err === "object" &&
    err !== null &&
    "name" in err &&
    "message" in err
  ) {
    const errorObj = /** @type {{ name: string, message: string }} */ (err);
    logger(`Rejection: ${errorObj.name}: ${errorObj.message}`);
    return false;
  }

  logger(`Rejection: ${String(err)}`);
  return false;
};

export default errorHandler;
