import { string, number, boolean, date, object, mixed } from "yup";

export const beneficiarySchema = object().shape({
  beneficiaryAddress: string(),
  beneficiaryCity: string(),
  beneficiaryCountryCode: string().required('beneficiaryCountryCode is required'),
  beneficiaryDateOfBirth: string()
    .optional()
    .nullable()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid DOB format (YYYY-MM-DD)") // format check
    .test("is-valid-date", "Invalid date value", (value) => {
      if (!value) return true;
      const date = new Date(value);
      return !isNaN(date.getTime());
    }),
  beneficiaryEmail: string(),
  beneficiaryIdNumber: string(),
  beneficiaryIdType: string(),
  beneficiaryMSISDN: string(),
  beneficiaryName: string().required('beneficiaryName is required'),
  beneficiaryOccupation: string(),
  beneficiaryPostcode: string(),
  beneficiaryState: string(),
});

export const bankSchema = object().shape({
  beneficiaryAccountNumber: string().required('beneficiaryCountryCode is required'),
  beneficiaryBankCode: string(),
  beneficiaryBankCountryCode: string().required('beneficiaryBankCountryCode is required'),
  beneficiaryBankName: string(),
  beneficiaryBranchCode: string(),
  beneficiaryBranchRoutingNo: string(),
  beneficiaryBSBCode: string(),
  beneficiaryIBAN: string(),
  beneficiarySwiftCode: string(),
});