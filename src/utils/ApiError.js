// @ts-check

/**
 * Custom API Error class for handling application-specific errors
 */
export default class ApiError extends Error {
  /**
   * @param {number} [statusCode=500]
   * @param {string} [message="Internal Server Error"] - Error message
   * @param {boolean} [isOperational=true] - Whether the error is operational (expected) or not
   * @param {string} [stack=""] - Custom stack trace (optional)
   */
  constructor(
    statusCode = 500,
    message = "Internal Server Error",
    isOperational = true,
    stack = ""
  ) {
    super(message);

    this.statusCode = statusCode;

    // Set the name of the error
    this.name = "ApiError";

    // Indicate if the error is operational
    this.isOperational = isOperational;

    // Set the stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
