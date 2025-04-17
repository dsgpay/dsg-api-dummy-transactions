import { string, number, boolean, date, object, mixed } from "yup";

export const senderSchema = object().shape({
  senderAddress: string(),
  senderBeneficiaryRelationship: string(),
  senderCity: string(),
  senderCountryCode: string(),
  senderDateOfBirth: string()
    .optional()
    .nullable()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid DOB format (YYYY-MM-DD)") // format check
    .test("is-valid-date", "Invalid date value", (value) => {
      if (!value) return true;
      const date = new Date(value);
      return !isNaN(date.getTime());
    }),
  senderIdNumber: string(),
  senderIdType: string(),
  senderMSISDN: string(),
  senderName: string().required('senderName is required'),
  senderNationalityCountryCode: string(),
  senderPostcode: string(),
  senderState: string(),
  senderVirtualAccountNumber: string(),
});
