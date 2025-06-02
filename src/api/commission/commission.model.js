// @ts-check
import DB from "../../config/db.js";

/** typedef Commission
 * @typedef {Object} CommissionModel
 * @property {string} _id
 * @property {string} corpId
 * @property {string} ccy
 * @property {string} gatewayPartner
 * @property {string} commissionCurrency
 * @property {object} commission
 * @property {string} transactionType
 * @property {string} paymentAddress
 * @property {string} countryCode
 */

/** @typedef {import("mongodb").Collection<CommissionModel>} CommissionCollection */
/** @typedef {import("mongodb").Filter<CommissionModel>} CommissionFilter */
/** @typedef {import("mongodb").FindOptions<CommissionModel>} CommissionFindOptions */
/** @typedef {import("mongodb").FindOneAndUpdateOptions} CommissionFindOneAndUpdateOptions */
/** @typedef {import("mongodb").UpdateFilter<CommissionModel>} CommissionUpdateFilter */

/** @type {CommissionCollection} */
const Commission = DB.collection("ds_corp_commission");

/**
 * Find a single document from the collection.
 * @param {CommissionFilter} query - The query to find a document.
 * @param {CommissionFindOptions=} options - Optional find options.
 * @returns {Promise<CommissionModel | null>} - The found document or null if not found.
 */
export async function findOneCommission(query, options = {}) {
  return Commission.findOne(query, options);
}
