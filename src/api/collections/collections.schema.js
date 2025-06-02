// @ts-check
import { ObjectId } from "mongodb";
import { number, object, string } from "yup";

/**
 * @typedef {object} CollectionsId
 * @property {string} _id - ObjectId - str
 */

/**
 * STP Payment Status
 * @typedef {'COLLECTED' | 'FUNDED'} PaymentStatus
 */

/**
 * @typedef {object} CreateCollections
 * @property {string} corpId - Uppercase string, required
 * @property {string} currencyIsoCode - 3-char uppercase string, required
 * @property {number} amount - Positive number, required
 * @property {"local" | "global"} [type] - Defaults to "local"
 */
/**
 * @type {import('yup').ObjectSchema<CreateCollections>}
 */
export const createCollectionschema = object({
  corpId: string().required().uppercase(),
  currencyIsoCode: string().required().uppercase().min(3).max(3),
  amount: number().required().positive(),
  type: string().oneOf(["local", "global"]).default("local"),
}).unknown(false);

/**
 * @type {import('yup').ObjectSchema<CollectionsId>}
 */
export const payoutIdSchema = object({
  _id: string().required(),
}).unknown(false);
