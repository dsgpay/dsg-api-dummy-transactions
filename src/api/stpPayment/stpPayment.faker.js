// @ts-check
import { faker } from "@faker-js/faker";
import { getCountryCodeByCurrency } from "../../helpers/country.js";

const compliances = {
  complianceCumulativePass: true,
  complianceCommonCusTelPass: true,
  complianceFirstTransPass: true,
  complianceAmendPass: true,
  complianceCommonBenAcctPass: true,
  complianceMemoPass: true,
  complianceRestrictedCountryPass: true,
  complianceBlacklistPassBen: true,
  complianceBlacklistPassCus: true,
  complianceTransactionThresholdPass: true,
};

const mandatoryFieldsFakeValue = (
  field,
  {
    corpId,
    product,
    amount,
    transactionType,
    paymentAddress,
    payoutChannel,
    gatewayPartner,
    payinSpread,
    payoutSpread,
  }
) => {
  switch (field) {
    case "corpId":
      return corpId;
    case "product":
      return product;
    case "amount":
    case "credit":
      return (
        amount ||
        parseFloat(faker.finance.amount({ min: 100, max: 1000, dec: 2 }))
      );
    case "transactionType":
      return transactionType;
    case "beneficiaryCurrencyCode":
      return product.substring(3, 6);
    case "senderCurrencyCode":
      return product.substring(0, 3);
    case "beneficiaryCountryCode":
      return getCountryCodeByCurrency(product.substring(3, 6));
    case "beneficiaryBankCountryCode":
      return getCountryCodeByCurrency(product.substring(3, 6));
    case "paymentAddress":
      return paymentAddress;
    case "payoutChannel":
      return payoutChannel;
    case "gatewayPartner":
    case "payoutPartner":
      return gatewayPartner;
    case "payinSpread":
      return payinSpread;
    case "payoutSpread":
      return payoutSpread;
    case "payinPartner":
      return corpId;
    case "senderName":
    case "beneficiaryName":
      return faker.person.fullName();
    case "senderAddress":
    case "beneficiaryAddress":
      return faker.location.streetAddress();
    case "senderCity":
    case "beneficiaryCity":
      return faker.location.city();
    case "senderState":
    case "beneficiaryState":
      return faker.location.state();
    case "senderPostcode":
    case "beneficiaryPostcode":
      return faker.location.zipCode();
    case "senderCountryCode":
      return faker.location.countryCode();
    case "beneficiaryAccountNumber":
      return faker.finance.accountNumber();
    case "senderCurrencyCode":
      return product ? product.substring(0, 3) : faker.finance.currencyCode();
    case "beneficiaryCurrencyCode":
      return product ? product.substring(3, 6) : faker.finance.currencyCode();
    case "beneficiaryBSBCode":
      return faker.string.numeric(6);
    case "externalReference":
      return faker.string.alphanumeric(10);
    case "businessModel":
      return faker.helpers.arrayElement(["B2B", "B2C", "C2C"]);
    case "transactionType":
      return transactionType;
    case "paymentAddress":
      return paymentAddress;
    default:
      return "N/A";
  }
};

/**
 * payoutInstructionFakeValue
 * @param {Array} mandatoryFields
 * @param {object} data
 * @returns {object}
 */
export const payoutInstructionFakeValue = (mandatoryFields, data) => {
  const defaultMandatoryFields = [
    "corpId",
    "amount",
    "product",
    "transactionType",
    "paymentAddress",
    "senderCurrencyCode",
    "beneficiaryCurrencyCode",
    "businessModel",
    "beneficiaryBankCountryCode",
    "beneficiaryCountryCode",
    "payoutChannel",
    "payinPartner",
    "payoutPartner",
    "gatewayPartner",
    "payinSpread",
    "payoutSpread",
    "credit",
  ];
  const allFields = [
    ...new Set([...defaultMandatoryFields, ...mandatoryFields]),
  ];
  return allFields.reduce(
    (acc, field) => {
      acc[field] = mandatoryFieldsFakeValue(field, data);
      return acc;
    },
    {
      createdAt: new Date(),
      paymentStatus: "CREATED",
      complianceStatus: "completed",
      notifyStatus: "AWAITING_CALLBACK",
      updatedAt: new Date(),
      complianceQueue: true,
      stpSystem: true,
      ...compliances,
      balanceStatus: "active",
    }
  );
};
