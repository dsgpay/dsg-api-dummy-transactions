// @ts-check
import { ObjectId } from "mongodb";

import DB from "../../config/db.js";

/** typedef Collections
 * @typedef {Object} CollectionsModel
 * @property {ObjectId} _id
 * @property {string} corpID
 * @property {string} currencyIsoCode
 * @property {string} amount
 * @property {'COLLECTED' | 'FUNDED'} paymentStatus
 * @property {string=} countryCode
 * @property {string} transactionType
 * @property {string} paymentAddress
 * @property {string} billPaymentRef1
 * @property {string} billPaymentRef2
 * @property {Date} createdTimestamp
 * @property {Date} updatedTimestamp
 * @property {string} gatewayRefId
 * @property {string=} gatewayPartner
 * @property {string=} commissionStatus
 * @property {string=} commissionCurrency
 * @property {object=} commissionMatchedTier
 * @property {number=} commission
 * @property {number=} commissionPercent
 * @property {number=} commissionStatic
 * @property {string} virtualAccountNo
 * @property {string} statementId
 * @property {string} statementCommissionId
 * @property {number} revenueRate
 */

/** @typedef {import("mongodb").Collection<CollectionsModel>} CollectionsCollection */
/** @typedef {import("mongodb").Filter<CollectionsModel>} CollectionsFilter */
/** @typedef {import("mongodb").FindOptions<CollectionsModel>} CollectionsFindOptions */
/** @typedef {import("mongodb").FindOneAndUpdateOptions} CollectionsFindOneAndUpdateOptions */
/** @typedef {import("mongodb").UpdateFilter<CollectionsModel>} CollectionsUpdateFilter */

/** @type {CollectionsCollection} */
const Collections = DB.collection("ds_corp_stp_payment");

/**
 * Find a single document from the collection.
 * @param {CollectionsFilter} query - The query to find a document.
 * @param {CollectionsFindOptions=} options - Optional find options.
 * @returns {Promise<CollectionsModel | null>} - The found document or null if not found.
 */
export async function findOneCollections(query, options = {}) {
  return Collections.findOne(query, options);
}

/**
 * Upsert a document into STP Payments collection.
 * @param {CollectionsFilter} filter - The query to match the document.
 * @param {Partial<CollectionsModel>} update - The update payload.
 * @param {import('mongodb').FindOneAndUpdateOptions} [options={}] - Optional MongoDB options.
 * @returns {Promise<CollectionsModel>} - The upserted or updated document.
 */
export async function upsertCollections(filter, update, options = {}) {
  const result = await Collections.findOneAndUpdate(
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
 * @param {CollectionsFindOptions=} options - Optional find options (e.g., projection).
 * @returns {Promise<CollectionsModel | null>} - The found document or null if not found.
 */
export async function findCollectionsById(id, options = {}) {
  return Collections.findOne(id, options);
}

/**
 * Transform raw STP data into CreatePayoutData format.
 *
 * @param {object} data - Raw data input
 * @returns {CollectionsModel}
 */
export function transformSTP(data) {
  /** @type {Partial<CollectionsModel>} */
  const transformed = {};

  const fields = [
    "_id",
    "corpID",
    "currencyIsoCode",
    "amount",
    "paymentStatus",
    "billPaymentRef1",
    "billPaymentRef2",
    "createdTimestamp",
    "paymentAddress",
    "transactionType",
    "countryCode",
    "gatewayPartner",
    "revenueRate",
    "ticketRevenueStatus",
    "commission",
    "commissionCurrency",
    "statementId",
    "statementCommissionId",
  ];

  fields.forEach((field) => {
    // @ts-ignore: index signature is not declared but we're sure the keys exist
    transformed[field] = data[field];
  });

  return /** @type {CollectionsModel} */ (transformed);
}
