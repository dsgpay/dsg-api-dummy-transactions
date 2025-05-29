// @ts-check
import { ObjectId } from "mongodb";

import ApiError from "../../utils/ApiError.js";
import { findOneSTPProduct } from "../stpProduct/stpProduct.model.js";
import { payoutInstructionFakeValue } from "./stpPayment.faker.js";
import { upsertSTPPayment } from "./stpPayment.model.js";

/**
 * STP Payment Status
 * @typedef {'CREATE' | 'APPROVED' | 'TRANSFERRING' | 'SETTLED' | 'FAILED' | 'REJECTED' | 'CANCELLED'} PaymentStatus
 */

/**
 * @typedef {object} CreatePayoutData
 * @property {string} corpId
 * @property {string} product
 * @property {number} amount
 * @property {string} type
 * @property {PaymentStatus=} paymentStatus
 * @property {ObjectId=} _id
 * @property {string=} externalReference
 * @property {Date=} createdAt
 */

/**
 * Create a payout instruction
 * @param {CreatePayoutData} data
 * @returns {Promise<CreatePayoutData>}
 * @throws {Error} Throws an error if creation fails due to validation or DB issues.
 */
export const requestPayoutInstuction = async (data) => {
  try {
    const result = await initPayoutInstruction(data);
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Create a payout instruction
 * @param {CreatePayoutData} data
 * @returns {Promise<CreatePayoutData>}
 * @throws {Error} Throws an error if creation fails due to validation or DB issues.
 */
async function initPayoutInstruction(data) {
  const { corpId, product, type } = data;

  const stpProduct = await findOneSTPProduct({
    corpId,
    product,
    ...(type == "global" && { transactionType: /SWIFT_/i }),
  });

  if (!stpProduct) throw new ApiError(400, "Product does not exists.");
  const {
    mandatoryFields,
    transactionType,
    paymentAddress,
    payoutChannel,
    gatewayPartner,
    payinSpread,
  } = stpProduct;

  const tData = payoutInstructionFakeValue(mandatoryFields, {
    ...data,
    transactionType,
    paymentAddress,
    payoutChannel,
    gatewayPartner,
    payinSpread,
  });

  const { externalReference, ...rest } = tData;

  const newData = await upsertSTPPayment({ externalReference }, rest);

  return transformSTP(newData);
}

/**
 * Transform raw STP data into CreatePayoutData format.
 *
 * @param {object} data - Raw data input
 * @returns {CreatePayoutData}
 */
function transformSTP(data) {
  /** @type {Partial<CreatePayoutData>} */
  const transformed = {};

  const fields = [
    "_id",
    "corpId",
    "product",
    "amount",
    "paymentStatus",
    "externalReference",
    "createdAt",
  ];

  fields.forEach((field) => {
    // @ts-ignore: index signature is not declared but we're sure the keys exist
    transformed[field] = data[field];
  });

  return /** @type {CreatePayoutData} */ (transformed);
}
