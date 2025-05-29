import jwt from "jsonwebtoken";

import { server } from "../../config/env.js";
import ApiError from "../../utils/ApiError.js";

/**
 * @typedef {object} DecodedToken
 * @property {string} corpId
 */

/**
 * Middleware to validate request data with a Yup schema.
 * Validates data from the specified source (params, body, or query) against the provided schema.
 *
 * @param {import('yup').ObjectSchema} schema - The Yup schema to validate against.
 * @param {"params" | "body" | "query"} [dataSource="params"] - The data source to validate. Defaults to "params".
 * @returns {(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => Promise<void>}
 *          Middleware function that validates the request and forwards errors if validation fails.
 */
export function validateRequest(schema, dataSource = "params") {
  return async (req, res, next) => {
    try {
      // Select the data source (params, body, or query)
      const data = req[dataSource];

      // Validate the data against the schema
      await schema.validate(data, { abortEarly: false });

      // If validation passes, move to the next middleware/handler
      next();
    } catch (error) {
      const errorMessage = error?.errors?.join(" | ") || error.message;
      next(new ApiError(400, errorMessage)); // Pass error to error handler
    }
  };
}

/**
 * Middleware to check if the user has admin privileges.
 * Verifies the provided JWT token and ensures the user has the correct permissions (corpId === "DSG").
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @throws {ApiError} If the token is missing, invalid, or if the user lacks admin privileges.
 * @returns {void} If valid, proceeds to the next middleware or route handler.
 */
export function isAdmin(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from "Bearer <token>"
  if (!token) {
    return next(new ApiError(401, "Access denied. No token provided."));
  }

  try {
    const secretKey = server?.secret;

    const decoded = verifyToken(token, secretKey);

    if (decoded?.corpId !== "DSG") {
      throw new ApiError(401, "Access denied. Insufficient permissions.");
    }

    next(); // Proceed to the next middleware/handler
  } catch (err) {
    next(new ApiError(401, err?.message ?? "Invalid token.")); // Forward error
  }
}

/**
 * @param {string} token
 * @param {string} secretKey
 * @returns {DecodedToken}
 * @throws {Error}
 */
function verifyToken(token, secretKey) {
  const decoded = jwt.verify(token, secretKey);

  // Runtime check to ensure it's an object
  if (
    typeof decoded !== "object" ||
    decoded === null ||
    typeof decoded.corpId !== "string"
  ) {
    throw new Error("Invalid token payload");
  }

  return /** @type {DecodedToken} */ (decoded);
}
