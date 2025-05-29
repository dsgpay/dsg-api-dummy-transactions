// @ts-check
import { ObjectId } from "mongodb";

import DB from "../../config/db.js";

/** typedef STPPayment
 * @typedef {Object} STPPaymentModel
 * @property {ObjectId} _id
 * @property {string} corpId
 * @property {string} product
 * @property {number} amount
 * @property {string=} beneficiaryCountryCode
 * @property {string=} beneficiaryBankCountryCode
 * @property {string} transactionType
 * @property {string} paymentAddress
 * @property {string=} externalReference
 * @property {string=} payoutChannel
 * @property {string=} gatewayPartner
 * @property {number=} payinSpread
 * @property {number=} payoutSpread
 * @property {number=} midRate
 * @property {number=} fxRate
 * @property {number=} bankRate
 * @property {string=} ticketRevenueStatus
 * @property {string=} ticketRevenueCurrency
 * @property {object=} ticketRevenueMatchedTier
 * @property {number=} ticketRevenue
 * @property {Date=} approvedDate
 * @property {string} payoutConfirmId
 * @property {string} statementId
 * @property {string} statementTicketFeeId
 */

/** @typedef {import("mongodb").Collection<STPPaymentModel>} STPPaymentCollection */
/** @typedef {import("mongodb").Filter<STPPaymentModel>} STPPaymentFilter */
/** @typedef {import("mongodb").FindOptions<STPPaymentModel>} STPPaymentFindOptions */
/** @typedef {import("mongodb").FindOneAndUpdateOptions} STPPaymentFindOneAndUpdateOptions */
/** @typedef {import("mongodb").UpdateFilter<STPPaymentModel>} STPPaymentUpdateFilter */

/** @type {STPPaymentCollection} */
const STPPayment = DB.collection("ds_corp_stp_payment");

/**
 * Find a single document from the collection.
 * @param {STPPaymentFilter} query - The query to find a document.
 * @param {STPPaymentFindOptions=} options - Optional find options.
 * @returns {Promise<STPPaymentModel | null>} - The found document or null if not found.
 */
export async function findOneSTPPayment(query, options = {}) {
  return STPPayment.findOne(query, options);
}

/**
 * Upsert a document into STP Payments collection.
 * @param {STPPaymentFilter} filter - The query to match the document.
 * @param {Partial<STPPaymentModel>} update - The update payload.
 * @param {import('mongodb').FindOneAndUpdateOptions} [options={}] - Optional MongoDB options.
 * @returns {Promise<STPPaymentModel>} - The upserted or updated document.
 */
export async function upsertSTPPayment(filter, update, options = {}) {
  const result = await STPPayment.findOneAndUpdate(
    filter,
    { $set: update },
    {
      ...options,
      upsert: true,
      returnDocument: "after", // ensures the returned doc is the updated/new one
    }
  );

  if (!result) throw new Error("Upsert failed");

  return result;
}

/**
 * Find a payment document by its ObjectId.
 * @param {ObjectId} id - The MongoDB ObjectId of the payment document.
 * @param {STPPaymentFindOptions=} options - Optional find options (e.g., projection).
 * @returns {Promise<STPPaymentModel | null>} - The found document or null if not found.
 */
export async function findSTPPaymentById(id, options = {}) {
  return STPPayment.findOne(id, options);
}

/**
 * Transform raw STP data into CreatePayoutData format.
 *
 * @param {object} data - Raw data input
 * @returns {STPPaymentModel}
 */
export function transformSTP(data) {
  /** @type {Partial<STPPaymentModel>} */
  const transformed = {};

  const fields = [
    "_id",
    "corpId",
    "product",
    "amount",
    "paymentStatus",
    "externalReference",
    "createdAt",
    "midRate",
    "fxRate",
    "bankRate",
    "payinDebit",
    "ticketRevenueStatus",
    "ticketRevenue",
    "ticketRevenueCurrency",
    "approvedDate",
    "payoutConfirmId",
    "statementTicketFeeId",
  ];

  fields.forEach((field) => {
    // @ts-ignore: index signature is not declared but we're sure the keys exist
    transformed[field] = data[field];
  });

  return /** @type {STPPaymentModel} */ (transformed);
}
