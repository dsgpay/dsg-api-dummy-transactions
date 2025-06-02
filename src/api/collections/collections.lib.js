// @ts-check
import { transformSTP, upsertCollections } from "./collections.model.js";
import { collectionsFakeValue } from "./collections.faker.js";

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
export const initCollections = async (data) => {
  const tData = collectionsFakeValue(data);

  const { externalReference, ...rest } = tData;

  const newData = await upsertCollections({ externalReference }, rest);

  return transformSTP(newData);
};

function mapGatewayConfig(data) {}
