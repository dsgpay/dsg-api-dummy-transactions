// @ts-check

import { requestPayoutInstuction } from "./stpPayment.lib.js";

/**
 * @typedef {import("./stpPayment.lib.js").CreatePayoutData} CreatePayoutData
 */

/**
 * Create a payout instruction
 * @param {CreatePayoutData} data
 * @returns {Promise<CreatePayoutData>}
 * @throws {Error} Throws an error if creation fails due to validation or DB issues.
 */
export const createPayoutInstuction = async (data) => {
  try {
    const result = await requestPayoutInstuction(data);
    return result;
  } catch (error) {
    throw error;
  }
};
