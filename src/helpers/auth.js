// @ts-check
import jwt from "jsonwebtoken";
import { server } from "../config/env.js";
/**
 * Generates a JWT token for the cron-dma-reconciliation-report process.
 *
 * @throws {string} If JWT_SECRET is not defined in environment variables.
 * @returns {string} A signed JWT token with 1-hour expiration.
 */
export const generateToken = () => {
  const secret = server.secret;
  if (!secret) throw "JWT_SECRET does not config.";
  return jwt.sign(
    {
      id: "dsg-api-sandbox",
      role: "ITDev",
    },
    secret,
    { expiresIn: "1h" }
  );
};
