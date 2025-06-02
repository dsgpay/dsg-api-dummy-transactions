// @ts-check
import { faker } from "@faker-js/faker";
import { getCountryCodeByCurrency } from "../../helpers/country.js";

const mandatoryFieldsFakeValue = (
  field,
  {
    corpID,
    currencyIsoCode,
    countryCode,
    amount,
    transactionType,
    paymentAddress,
    gatewayPartner,
  }
) => {
  const type = faker.helpers.arrayElement(transactionType);
  const payment = faker.helpers.arrayElement(paymentAddress);

  switch (field) {
    case "corpID":
      return corpID;
    case "currencyIsoCode":
      return currencyIsoCode;
    case "countryCode":
      return transactionType == "TT"
        ? getCountryCodeByCurrency(currencyIsoCode)
        : countryCode;
    case "amount":
      return (
        amount?.toString() ||
        parseFloat(
          faker.finance.amount({ min: 100, max: 1000, dec: 2 })
        )?.toString()
      );
    case "transactionType":
    case "gatewayType":
      return type;
    case "paymentAddress":
    case "gatewayMethod":
      return payment;
    case "gatewayPartner":
    case "collector":
      return gatewayPartner;
    case "billPaymentRef1":
      return faker.string.alphanumeric(10);
    case "billPaymentRef2":
      return faker.string.alphanumeric(10);
    case "payerName":
      return faker.person.fullName();
    case "payerAccountNumber":
      return faker.finance.accountNumber();
    case "gatewayRefId":
      return faker.string.uuid();
    case "payerNote":
      return faker.finance.transactionDescription();
    case "virtualAccountNo":
      return faker.finance.accountNumber();
    case "paymentDetails":
      return faker.finance.transactionDescription();
    default:
      return "N/A";
  }
};

/**
 * payoutInstructionFakeValue
 * @param {object} data
 * @returns {object}
 */
export const collectionsFakeValue = (data) => {
  const defaultMandatoryFields = [
    "corpID",
    "amount",
    "currencyIsoCode",
    "countryCode",
    "transactionType",
    "paymentAddress",
    "gatewayPartner",
    "billPaymentRef1",
    "billPaymentRef2",
    "payerName",
    "payerAccountNumber",
    "gatewayRefId",
    "payerNote",
    "paymentDetails",
    "virtualAccountNo",
    "collector",
    "gatewayMethod",
  ];
  const allFields = [...new Set([...defaultMandatoryFields])];
  return allFields.reduce(
    (acc, field) => {
      acc[field] = mandatoryFieldsFakeValue(field, data);
      return acc;
    },
    {
      createdTimestamp: new Date(),
      paymentStatus: "COLELCTED",
      notifyStatus: "AWAITING_CALLBACK",
      reportStatus: "NOT_REQUIRED",
      updatedTimestamp: new Date(),
      payinNotification: true,
      appNotificationQueue: true,
      paymentType: "payin",
      payinMethod: "bank",
    }
  );
};
