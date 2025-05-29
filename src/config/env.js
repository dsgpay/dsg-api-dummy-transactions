// @ts-check
import "dotenv/config";
import { object, string, number } from "yup";

/**
 * @typedef {Object} Env
 * @property {string} DEBUG
 * @property {"development" | "production" | "test"} NODE_ENV
 * @property {string} MONGO_URL
 * @property {string} DB_NAME
 * @property {string} JWT_SECRET
 * @property {number} PORT
 * @property {string} FINANCE_API_URL
 */

/** @type {import('yup').ObjectSchema<Env>} */
const envSchema = object({
  DEBUG: string().required(),
  NODE_ENV: string().oneOf(["development", "production", "test"]).required(),
  MONGO_URL: string().required(),
  DB_NAME: string().required(),
  JWT_SECRET: string().min(8).required(),
  PORT: number().default(3000).required(),
  FINANCE_API_URL: string().required(),
}).noUnknown(true);

/**
 * Validates process.env against the schema.
 *
 * @returns {Promise<Env>}
 */
const validateEnv = async () => {
  try {
    /** @type {Env} */
    const validated = await envSchema.validate(process.env, {
      stripUnknown: true,
    });
    return validated;
  } catch (err) {
    console.error("❌ Invalid environment configuration:", err.message);
    process.exit(1);
  }
};

const envVars = await validateEnv();

/**
 * Server configuration object.
 * @type {{ env: string, port: number, secret: string }}
 */
export const server = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  secret: envVars.JWT_SECRET,
};

/**
 * MongoDB configuration object.
 * @type {{ url: string, db: string }}
 */
export const mongo = {
  url: envVars.MONGO_URL,
  db: envVars.DB_NAME,
};

/**
 * MongoDB configuration object.
 * @type {{ url: string }}
 */
export const finance = {
  url: envVars.FINANCE_API_URL,
};
