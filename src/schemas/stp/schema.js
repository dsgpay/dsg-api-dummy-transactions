import { string, number, boolean, date, object, mixed } from "yup";
import { ObjectId } from "mongodb";

import { beneficiarySchema, bankSchema } from "./beneficiary.schema.js";
import { complianceSchema } from "./compliance.schema.js";
import { revenueSchema, statementSchema } from "./finance.schema.js";
import { instructionSchema, rateSchema } from "./instruction.schema.js";
import { otherSchema, stpSystemSchema } from "./other.schema.js";
import { senderSchema } from "./sender.schema.js";

const objectIdSchema = mixed()
  .required("_id is required")
  .test("is-valid-objectid", "_id is invalid ObjectId", (val) =>
    ObjectId.isValid(val)
  )
  .transform((val, originalValue) => {
    if (typeof val === "string" && ObjectId.isValid(val)) {
      return new ObjectId(val); // ✅ safe
    }
    return val; // ❌ leave it alone if it's invalid (let validation fail)
  });

const baseSchema = object()
  .shape({
    _id: objectIdSchema,
    createdAt: date().required('createdAt is required'),
    updatedAt: date(),
  })
  .noUnknown(true, "Unknown key in Schema")
  .strict(); // strict mode to disallow unknown keys

export const STPSchema = baseSchema
  .concat(instructionSchema)
  .concat(beneficiarySchema)
  .concat(senderSchema)
  .concat(bankSchema)
  .concat(stpSystemSchema)
  .concat(otherSchema)
  .concat(rateSchema)
  .concat(complianceSchema)
  .concat(revenueSchema)
  .concat(statementSchema)
  .noUnknown(true, 'Unknown field in STP payload')
  .strict();
