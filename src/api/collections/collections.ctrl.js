// @ts-check
import {
  initCollections,
  initRatesCollections,
  initCommissionCollections,
  initSOACollections,
} from "./collections.lib.js";

/**
 * @typedef {import("./collections.schema.js").CollectionsId} CollectionsId
 * @typedef {import("./collections.schema.js").CreateCollections} CreateCollections
 * @typedef {import("./collections.model.js").CollectionsModel} CollectionsModel
 */

/**
 * Create a collections
 * @param {CreateCollections} data
 * @returns {Promise<CollectionsModel>}
 * @throws {Error} Throws an error if creation fails due to validation or DB issues.
 */
export const createCollections = async (data) => {
  try {
    const result = await initCollections(data);
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Update Rates a collections
 * @param {CollectionsId} data
 * @returns {Promise<CollectionsModel>}
 * @throws {Error} Throws an error if creation fails due to validation or DB issues.
 */
export const ratesCollections = async (data) => {
  try {
    const result = await initRatesCollections(data);
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Update Commission a collections
 * @param {CollectionsId} data
 * @returns {Promise<CollectionsModel>}
 * @throws {Error} Throws an error if creation fails due to validation or DB issues.
 */
export const commissionCollections = async (data) => {
  try {
    const result = await initCommissionCollections(data);
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Update SOA a collections
 * @param {CollectionsId} data
 * @returns {Promise<CollectionsModel>}
 * @throws {Error} Throws an error if creation fails due to validation or DB issues.
 */
export const importSOACollections = async (data) => {
  try {
    const result = await initSOACollections(data);
    return result;
  } catch (error) {
    throw error;
  }
};
