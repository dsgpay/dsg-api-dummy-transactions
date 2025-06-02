// @ts-check
import { initCollections } from "./collections.lib.js";

/**
 * @typedef {import("./collections.schema.js").CollectionsId} CollectionsId
 * @typedef {import("./collections.schema.js").CreateCollections} CreateCollections
 * @typedef {import("./collections.model.js").CollectionsModel} CollectionsModel
 */

/**
 * Create a payout instruction
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
