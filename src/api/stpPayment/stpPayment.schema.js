// @ts-check

import { number, object, string } from "yup";

/**
 * @typedef {object} CreatePayoutInstruction
 * @property {string} corpId - Uppercase string, required
 * @property {string} product - 6-char uppercase string, required
 * @property {number} amount - Positive number, required
 * @property {"local" | "global"} [type] - Defaults to "local"
 */

/**
 * @type {import('yup').ObjectSchema<CreatePayoutInstruction>}
 */
export const createPayoutInstuctionSchema = object({
  corpId: string().required().uppercase(),
  product: string().required().uppercase().min(6).max(6),
  amount: number().required().positive(),
  type: string().oneOf(["local", "global"]).default("local"),
}).unknown(false);
