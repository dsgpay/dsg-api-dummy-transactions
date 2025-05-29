// @ts-check
import {
  initPayoutInstruction,
  initFixingRates,
  initApprovePricing,
  initProcessWithSOA,
} from "./stpPayment.lib.js";

/**
 * @typedef {import("./stpPayment.schema.js").PayoutInstructionId} PayoutInstructionId
 * @typedef {import("./stpPayment.schema.js").CreatePayoutData} CreatePayoutData
 * @typedef {import("./stpPayment.model.js").STPPaymentModel} STPPaymentData
 */

/**
 * Create a payout instruction
 * @param {CreatePayoutData} data
 * @returns {Promise<STPPaymentData>}
 * @throws {Error} Throws an error if creation fails due to validation or DB issues.
 */
export const createPayoutInstuction = async (data) => {
  try {
    const result = await initPayoutInstruction(data);
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Fixing Rates a payout instruction
 * @param {PayoutInstructionId} data
 * @returns {Promise<STPPaymentData>}
 * @throws {Error} Throws an error if creation fails due to validation or DB issues.
 */
export const ratesPayoutInstuction = async (data) => {
  try {
    const result = await initFixingRates(data);
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Approve a payout instruction
 * @param {PayoutInstructionId} data
 * @returns {Promise<STPPaymentData>}
 * @throws {Error} Throws an error if creation fails due to validation or DB issues.
 */
export const approvePayoutInstuction = async (data) => {
  try {
    const result = await initApprovePricing(data);
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Process a payout instruction
 * @param {PayoutInstructionId} data
 * @returns {Promise<STPPaymentData>}
 * @throws {Error} Throws an error if creation fails due to validation or DB issues.
 */
export const processPayoutInstuction = async (data) => {
  try {
    const result = await initProcessWithSOA(data);
    return result;
  } catch (error) {
    throw error;
  }
};
