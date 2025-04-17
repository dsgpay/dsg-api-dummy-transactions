import { string, number, boolean, date, object, mixed } from "yup";

export const otherSchema = object().shape({
  log: string(),
  logApi: string(),
  mode: string(),
  notifyManualUpdateStatementPass: boolean(),
  notifyStatus: string(),
  payoutConfirmDate: date(),
  payoutConfirmId: string(),
  payoutDate: date(),
  payoutIncrementAmount: number(),
  payoutMaxAmount: number(),
  payoutMinAmount: number(),
  payoutStatus: string(),
  rawData: string(),
  service: string(),
  statusReason: string(),
});

export const stpSystemSchema = object().shape({
  appNotificationQueue: boolean(),
  approvalsStatus: string().oneOf(["active", "completed"]),
  approvedDate: date().required('approvedDate is required'),
  balanceStatus: string().oneOf(["active", "completed"]),
  cancelledBy: string(),
  cancelledDate: date(),
  complianceQueue: boolean(),
  complianceStatus: string().oneOf(["active", "completed"]),
  fixingStatus: string().oneOf(["active", "completed"]),
  paymentStatus: string().oneOf([
    "CREATED",
    "APPROVED",
    "TRANSFERRING",
    "SETTLED",
    "FAILED",
    "REJECTED",
    "CANCELLED",
  ]).required('paymentStatus is required'),
  settlementDate: date(),
  settlementStatus: string().oneOf(["active", "completed"]),
  signature: string(),
  stpSystem: boolean(),
});
