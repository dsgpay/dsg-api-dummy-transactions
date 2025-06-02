// @ts-check
import { ObjectId } from "mongodb";

import {
  findCollectionsById,
  transformCollections,
  upsertCollections,
} from "./collections.model.js";
import { collectionsFakeValue } from "./collections.faker.js";
import ApiError from "../../utils/ApiError.js";
import { findOneRates } from "../rates/rates.js";
import { findOneCommission } from "../commission/commission.model.js";
import { importCollection, importCommission } from "../../services/finance.js";

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
export const initCollections = async (data) => {
  const tData = collectionsFakeValue(mapDataAndGatewayConfig(data));

  const { billPaymentRef1, ...rest } = tData;

  const newData = await upsertCollections({ billPaymentRef1 }, rest);

  return transformCollections(newData);
};

/**
 * Update rates a collections
 * @param {CollectionsId} data
 * @returns {Promise<CollectionsModel>}
 * @throws {Error} Throws an error if creation fails due to validation or DB issues.
 */
export const initRatesCollections = async (data) => {
  const { _id: id } = data;

  const stp = await findCollectionsById(new ObjectId(id), {
    projection: {
      currencyIsoCode: 1,
      amount: 1,
    },
  });
  if (!stp) throw new ApiError(400, "Data not found.");
  const { _id, currencyIsoCode, amount } = stp;

  const revRate = await findOneRates(
    {
      product: "USD" + currencyIsoCode,
    },
    {
      projection: {
        lastMidRate: 1,
      },
    }
  );
  if (!revRate) throw new ApiError(400, "revRate does not exists.");

  const revenueRate = revRate?.lastMidRate;
  const amountUSD = parseFloat(amount) / revenueRate;

  const newData = await upsertCollections(
    { _id: new ObjectId(_id) },
    {
      revenueRate,
      amountUSD,
    }
  );

  return transformCollections(newData);
};

/**
 * Update commission a collections
 * @param {CollectionsId} data
 * @returns {Promise<CollectionsModel>}
 * @throws {Error} Throws an error if creation fails due to validation or DB issues.
 */
export const initCommissionCollections = async (data) => {
  const { _id: id } = data;

  const collections = await findCollectionsById(new ObjectId(id), {
    projection: {
      corpID: 1,
      currencyIsoCode: 1,
      paymentAddress: 1,
      transactionType: 1,
      gatewayPartner: 1,
      countryCode: 1,
    },
  });
  if (!collections) throw new ApiError(400, "Data not found.");
  const {
    _id,
    corpID: corpId,
    currencyIsoCode: ccy,
    countryCode,
    paymentAddress,
    transactionType,
    gatewayPartner,
  } = collections;

  const comm = await findOneCommission(
    {
      corpId,
      ccy,
      paymentAddress,
      transactionType,
      countryCode,
      gatewayPartner,
      commissionCurrency: { $exists: true },
      commission: { $exists: true },
    },
    {
      projection: {
        commissionCurrency: 1,
        commission: 1,
      },
    }
  );

  if (!comm) throw new ApiError(400, "commission does not exists.");
  const { commissionCurrency, commission } = comm;

  const pricing = {
    commissionStatus: "OK",
    commissionCurrency,
    commissionMatchedTier: comm?.[0],
    commission: comm?.[0]?.fee,
  };

  const newData = await upsertCollections({ _id: new ObjectId(_id) }, pricing);

  return transformCollections(newData);
};

/**
 * Update SOA a collections
 * @param {CollectionsId} data
 * @returns {Promise<CollectionsModel>}
 * @throws {Error} Throws an error if creation fails due to validation or DB issues.
 */
export const initSOACollections = async (data) => {
  const { _id: id } = data;

  const collections = await findCollectionsById(new ObjectId(id), {
    projection: {
      _id: 1,
      statementId: 1,
      statementCommissionId: 1,
    },
  });
  if (!collections) throw new ApiError(400, "Data not found.");

  const { statementId, statementCommissionId } = collections;

  if (!statementId) {
    const soa = await importCollection(collections);
    console.log("soa :>> ", soa);
  }

  if (!statementCommissionId) {
    const soa = await importCommission(collections);
    console.log("soa :>> ", soa);
  }

  const newData = await findCollectionsById(new ObjectId(id));

  return transformCollections(newData);
};

function gatewayConfig({ currencyIsoCode, countryCode, type }) {
  if (currencyIsoCode == "AUD" && countryCode == "AU" && type == "local")
    return {
      paymentAddress: ["SVA", "STATIC_PAY_ID", "DYNAMIC_PAY_ID"],
      transactionType: ["NPP", "DE"],
      gatewayPartner: "Zai",
    };

  if (
    ["HKD", "USD"]?.includes(currencyIsoCode) &&
    countryCode == "HK" &&
    type == "local"
  )
    return {
      paymentAddress: ["SVA"],
      transactionType: ["CHATS"],
      gatewayPartner: "DBS",
    };

  if (
    ["USD"]?.includes(currencyIsoCode) &&
    countryCode == "US" &&
    type == "local"
  )
    return {
      paymentAddress: ["SVA"],
      transactionType: ["ACH_RDFI", "FEDWIRE"],
      gatewayPartner: "CFSB",
    };

  if (
    ["KRW"]?.includes(currencyIsoCode) &&
    countryCode == "KR" &&
    type == "local"
  )
    return {
      paymentAddress: ["SVA"],
      transactionType: ["BANK_TRANSFER"],
      gatewayPartner: "GMERemit",
    };

  if (
    [
      "AUD",
      "CAD",
      "CNH",
      "CHF",
      "DKK",
      "EUR",
      "GBP",
      "HKD",
      "JPY",
      "NOK",
      "NZD",
      "SEK",
      "SGD",
      "USD",
    ].includes(currencyIsoCode) &&
    type == "global"
  )
    return {
      paymentAddress: ["SVA"],
      transactionType: ["TT"],
      gatewayPartner: "DBS",
    };

  throw new ApiError(400, "The mapper has not been configured for the API.");
}

function mapDataAndGatewayConfig(data) {
  const { corpId: corpID, ...rest } = data;

  return {
    corpID,
    ...rest,
    ...gatewayConfig(data),
  };
}
