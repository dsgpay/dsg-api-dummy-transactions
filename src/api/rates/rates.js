// @ts-check
import DB from "../../config/db.js";

/** typedef Rates
 * @typedef {Object} RatesModel
 * @property {string} _id
 * @property {string} product
 * @property {number} lastMidRate
 */

/** @typedef {import("mongodb").Collection<RatesModel>} RatesCollection */
/** @typedef {import("mongodb").Filter<RatesModel>} RatesFilter */
/** @typedef {import("mongodb").FindOptions<RatesModel>} RatesFindOptions */
/** @typedef {import("mongodb").FindOneAndUpdateOptions} RatesFindOneAndUpdateOptions */
/** @typedef {import("mongodb").UpdateFilter<RatesModel>} RatesUpdateFilter */

/** @type {RatesCollection} */
const Rates = DB.collection("ds_rates");

/**
 * Find a single document from the collection.
 * @param {RatesFilter} query - The query to find a document.
 * @param {RatesFindOptions=} options - Optional find options.
 * @returns {Promise<RatesModel | null>} - The found document or null if not found.
 */
export async function findOneRates(query, options = {}) {
  return Rates.findOne(query, options);
}
