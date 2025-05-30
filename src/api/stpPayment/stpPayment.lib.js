// @ts-check
import { ObjectId } from "mongodb";
import ApiError from "../../utils/ApiError.js";
import { findOneSTPProduct } from "../stpProduct/stpProduct.model.js";
import { payoutInstructionFakeValue } from "./stpPayment.faker.js";
import {
  findSTPPaymentById,
  transformSTP,
  upsertSTPPayment,
} from "./stpPayment.model.js";
import {
  importSTP,
  importFeeSTP,
  importUpdateStatusSTP,
  importUpdateFailedSTP,
} from "../../services/finance.js";
import { findOneRates } from "../rates/rates.js";

/**
 * @typedef {import("./stpPayment.schema.js").PayoutInstructionId} PayoutInstructionId
 * @typedef {import("./stpPayment.schema.js").CreatePayoutData} CreatePayoutData
 * @typedef {import("./stpPayment.schema.js").SettlementPayoutInstruction} SettlementPayoutInstruction
 * @typedef {import("./stpPayment.model.js").STPPaymentModel} STPPaymentData
 */

/**
 * Create a payout instruction
 * @param {CreatePayoutData} data
 * @returns {Promise<STPPaymentData>}
 * @throws {Error} Throws an error if creation fails due to validation or DB issues.
 */
export const initPayoutInstruction = async (data) => {
  const { corpId, product, type } = data;

  const stpProduct = await findOneSTPProduct(
    {
      corpId,
      product,
      ...(type == "global" && { transactionType: /SWIFT_/i }),
    },
    {
      projection: {
        mandatoryFields: 1,
        transactionType: 1,
        paymentAddress: 1,
        payoutChannel: 1,
        gatewayPartner: 1,
        payinSpread: 1,
        payoutSpread: 1,
      },
    }
  );

  if (!stpProduct) throw new ApiError(400, "Product does not exists.");
  const {
    mandatoryFields,
    transactionType,
    paymentAddress,
    payoutChannel,
    gatewayPartner,
    payinSpread,
    payoutSpread,
  } = stpProduct;

  const tData = payoutInstructionFakeValue(mandatoryFields, {
    ...data,
    transactionType,
    paymentAddress,
    payoutChannel,
    gatewayPartner,
    payinSpread,
    payoutSpread,
  });

  const { externalReference, ...rest } = tData;

  const newData = await upsertSTPPayment({ externalReference }, rest);

  return transformSTP(newData);
};

/**
 * Create a payout instruction
 * @param {PayoutInstructionId} data
 * @returns {Promise<STPPaymentData>}
 * @throws {Error} Throws an error if creation fails due to validation or DB issues.
 */
export const initFixingRates = async (data) => {
  const { _id: id } = data;

  const stp = await findSTPPaymentById(new ObjectId(id), {
    projection: {
      corpId: 1,
      product: 1,
      amount: 1,
      payinSpread: 1,
      payoutSpread: 1,
      paymentStatus: 1,
    },
  });
  if (!stp) throw new ApiError(400, "Data not found.");

  const {
    _id,
    corpId,
    product,
    amount,
    payinSpread = 0,
    payoutSpread = 0,
    paymentStatus,
  } = stp;

  if (paymentStatus != "CREATED")
    throw new ApiError(400, "Method not allowed.");

  const stpProduct = await findOneSTPProduct(
    {
      corpId,
      product,
      midRate: { $exists: true },
    },
    {
      projection: {
        midRate: 1,
      },
    }
  );
  if (!stpProduct) throw new ApiError(400, "stpProduct does not exists.");

  const fundRate = await findOneRates(
    {
      product: "USD" + product?.substring(0, 3),
    },
    {
      projection: {
        lastMidRate: 1,
      },
    }
  );

  if (!fundRate) throw new ApiError(400, "fundRate does not exists.");

  const payoutRate = await findOneRates(
    {
      product: "USD" + product?.substring(3, 6),
    },
    {
      projection: {
        lastMidRate: 1,
      },
    }
  );

  if (!payoutRate) throw new ApiError(400, "fundRate does not exists.");

  const { midRate } = stpProduct;

  const fxRate = (1 - payinSpread / 100) * midRate;

  const rates = {
    midRate: midRate,
    fxRate,
    bankRate: (1 - payoutSpread / 100) * midRate,
    midRateAt: new Date(),
    fxRateAt: new Date(),
    bankRateAt: new Date(),
    payinDebit: amount / fxRate,
    balanceStatus: "completed",
    fixingStatus: "completed",
    approvalsStatus: "active",
    fundCurrencyRate: fundRate?.lastMidRate,
    payoutCurrencyRate: payoutRate?.lastMidRate,
  };

  const newData = await upsertSTPPayment({ _id: new ObjectId(_id) }, rates);

  return transformSTP(newData);
};

/**
 * Create a payout instruction
 * @param {PayoutInstructionId} data
 * @returns {Promise<STPPaymentData>}
 * @throws {Error} Throws an error if creation fails due to validation or DB issues.
 */
export const initApprovePricing = async (data) => {
  const { _id: id } = data;

  const stp = await findSTPPaymentById(new ObjectId(id), {
    projection: {
      _id: 1,
      corpId: 1,
      product: 1,
      paymentStatus: 1,
    },
  });
  if (!stp) throw new ApiError(400, "Data not found.");

  const { _id, product, corpId, paymentStatus } = stp;

  if (paymentStatus != "CREATED")
    throw new ApiError(400, "Method not allowed.");

  const ticketFee = await findOneSTPProduct(
    {
      corpId,
      product,
      ticketRevenueCurrency: { $exists: true },
      ticketRevenue: { $exists: true },
    },
    {
      projection: {
        ticketRevenueCurrency: 1,
        ticketRevenue: 1,
      },
    }
  );

  if (!ticketFee) throw new ApiError(400, "ticketRevenue does not exists.");
  const { ticketRevenueCurrency, ticketRevenue } = ticketFee;

  const pricing = {
    paymentStatus: "APPROVED",
    approvedDate: new Date(),
    approvalsStatus: "completed",
    ticketRevenueStatus: "OK",
    ticketRevenueCurrency,
    ticketRevenueMatchedTier: ticketRevenue?.[0],
    ticketRevenue: ticketRevenue?.[0]?.fee,
  };

  const newData = await upsertSTPPayment({ _id: new ObjectId(_id) }, pricing);

  return transformSTP(newData);
};

/**
 * Create a payout instruction
 * @param {PayoutInstructionId} data
 * @returns {Promise<STPPaymentData>}
 * @throws {Error} Throws an error if creation fails due to validation or DB issues.
 */
export const initProcessWithSOA = async (data) => {
  const { _id: id } = data;

  const stp = await findSTPPaymentById(new ObjectId(id), {
    projection: {
      _id: 1,
      paymentStatus: 1,
      statementId: 1,
      statementTicketFeeId: 1,
    },
  });
  if (!stp) throw new ApiError(400, "Data not found.");

  const { _id, paymentStatus, statementId, statementTicketFeeId } = stp;

  if (paymentStatus != "APPROVED")
    throw new ApiError(400, "Method not allowed.");

  const process = {
    paymentStatus: "TRANSFERRING",
    payoutConfirmId: new Date().valueOf().toString(),
  };

  const processData = await upsertSTPPayment(
    { _id: new ObjectId(_id) },
    process
  );

  if (!statementId) {
    const soa = await importSTP(processData);
    console.log("soa :>> ", soa);
  }

  if (!statementTicketFeeId) {
    const fee = await importFeeSTP(processData);
    console.log("fee :>> ", fee);
  }

  const newData = await findSTPPaymentById(new ObjectId(id));

  return transformSTP(newData);
};

/**
 * Create a payout instruction
 * @param {SettlementPayoutInstruction} data
 * @returns {Promise<STPPaymentData>}
 * @throws {Error} Throws an error if creation fails due to validation or DB issues.
 */
export const initSettlementWithSOA = async (data) => {
  const { _id: id, paymentStatus } = data;

  const stp = await findSTPPaymentById(new ObjectId(id), {
    projection: {
      _id: 1,
      statementId: 1,
      statementTicketFeeId: 1,
    },
  });
  if (!stp) throw new ApiError(400, "Data not found.");

  const { _id, paymentStatus: status } = stp;

  if (!["TRANSFERRING", "SETTLED"].includes(status))
    throw new ApiError(400, "Method not allowed.");

  const settlement = {
    paymentStatus,
    ...(paymentStatus == "FAILED" && {
      statusReason: "Invalid Account Details.",
    }),
  };

  const processData = await upsertSTPPayment(
    { _id: new ObjectId(_id) },
    settlement
  );

  if (status == "SETTLED" && paymentStatus == "FAILED") {
    const soa = await importUpdateFailedSTP(processData);
    console.log("soa :>> ", soa);
  } else {
    const soa = await importUpdateStatusSTP(processData);
    console.log("soa :>> ", soa);
  }

  const newData = await findSTPPaymentById(new ObjectId(id));

  return transformSTP(newData);
};
