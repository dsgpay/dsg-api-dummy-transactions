// @ts-check
import DB from "../../config/db.js";

/** typedef STPProduct
 * @typedef {Object} STPProductModel
 * @property {string} _id
 * @property {string} corpId
 * @property {string} product
 * @property {string} beneficiaryCountryCode
 * @property {string} transactionType
 * @property {string} paymentAddress
 * @property {Array<string>} mandatoryFields
 * @property {string} payoutChannel
 * @property {string} gatewayPartner
 * @property {string} payinSpread
 */

/** @typedef {import("mongodb").Collection<STPProductModel>} STPProductCollection */
/** @typedef {import("mongodb").Filter<STPProductModel>} STPProductFilter */
/** @typedef {import("mongodb").FindOptions<STPProductModel>} STPProductFindOptions */
/** @typedef {import("mongodb").FindOneAndUpdateOptions} STPProductFindOneAndUpdateOptions */
/** @typedef {import("mongodb").UpdateFilter<STPProductModel>} STPProductUpdateFilter */

/** @type {STPProductCollection} */
const STPProduct = DB.collection("ds_corp_stp_product");

/**
 * Find a single document from the collection.
 * @param {STPProductFilter} query - The query to find a document.
 * @param {STPProductFindOptions=} options - Optional find options.
 * @returns {Promise<STPProductModel | null>} - The found document or null if not found.
 */
export async function findOneSTPProduct(query, options = {}) {
  return STPProduct.findOne(query, options);
}
