// @ts-check
import { ObjectId } from 'mongodb';
import { number, object, string } from "yup";

/**
 * @typedef {object} PayoutInstructionId
 * @property {string} _id - ObjectId - str
 */

/**
 * STP Payment Status
 * @typedef {'CREATE' | 'APPROVED' | 'TRANSFERRING' | 'SETTLED' | 'FAILED' | 'REJECTED' | 'CANCELLED'} PaymentStatus
 */

/**
 * @typedef {object} CreatePayoutData
 * @property {string} corpId
 * @property {string} product
 * @property {number} amount
 * @property {string} type
 * @property {PaymentStatus=} paymentStatus
 * @property {ObjectId=} _id
 * @property {string=} externalReference
 * @property {Date=} createdAt
 */

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

/**
 * @type {import('yup').ObjectSchema<PayoutInstructionId>}
 */
export const payoutInstuctionSchema = object({
  _id: string().required(),
}).unknown(false);
