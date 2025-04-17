import { string, number, boolean, date, object, mixed } from "yup";

export const instructionSchema = object().shape({
  businessModel: string()
    .oneOf(["B2B", "B2C", "C2B", "C2C"])
    .required("businessModel is required"),
  amount: number().min(10).max(2000001).required("amount is required"),
  corpId: string().required("corpId is required"),
  credit: number().required("credit is required"),
  decimalPlaces: string(),
  externalReference: string().required("externalReference is required"),
  externalReferenceAlphaNum: string(),
  intermediaryBankSwiftCode: string(),
  gatewayPartner: string().required("gatewayPartner is required"),
  paymentAddress: string().required("paymentAddress is required"),
  payoutChannel: string(),
  product: string().required("beneficiaryCountryCode is required"),
  senderPurposeOfRemittance: string(),
  senderPurposeOfRemittanceCode: string(),
  senderSourceOfFunds: string(),
  transactionType: string().required("transactionType is required"),
});

export const rateSchema = object().shape({
  bankRate: number().required("bankRate is required"),
  bankRateAt: date().required("bankRateAt is required"),
  beneficiaryCurrencyCode: string(),
  fxRate: number().required("fxRate is required"),
  fxRateAt: date().required("fxRateAt is required"),
  midRate: number().required("midRate is required"),
  midRateAt: date().required("midRateAt is required"),
  mqStpRatesFixing: string(),
  payoutSpread: number(),
  quoteId: string(),
  senderCurrencyCode: string(),
});
