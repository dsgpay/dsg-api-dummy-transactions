// @ts-check
import { Router } from "express";
import {
  createPayoutInstuction,
  ratesPayoutInstuction,
  approvePayoutInstuction,
  processPayoutInstuction,
} from "./stpPayment.ctrl.js";
import { validateRequest } from "../middlewares/validation.js";
import {
  payoutInstuctionSchema,
  createPayoutInstuctionSchema,
} from "./stpPayment.schema.js";

const router = Router();

/**
 * POST endpoint to create STP payment
 * @route POST /stp/create
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void} Responds with "pong"
 */
router.post(
  "/create",
  validateRequest(createPayoutInstuctionSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body ?? {};

      /**
       * @param {import("./stpPayment.schema.js").CreatePayoutInstruction} data
       */
      const result = await createPayoutInstuction(data);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST endpoint to fixing rates
 * @route POST /stp/create
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void} Responds with "pong"
 */
router.put(
  "/rates",
  validateRequest(payoutInstuctionSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body ?? {};

      /**
       * @param {import("./stpPayment.schema.js").PayoutInstructionId} data
       */
      const result = await ratesPayoutInstuction(data);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST endpoint to approve and getting pricing
 * @route POST /stp/approve
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void} Responds with "pong"
 */
router.put(
  "/approve",
  validateRequest(payoutInstuctionSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body ?? {};

      /**
       * @param {import("./stpPayment.schema.js").PayoutInstructionId} data
       */
      const result = await approvePayoutInstuction(data);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST endpoint to process and import SOA
 * @route POST /stp/process
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void} Responds with "pong"
 */
router.put(
  "/process",
  validateRequest(payoutInstuctionSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body ?? {};

      /**
       * @param {import("./stpPayment.schema.js").PayoutInstructionId} data
       */
      const result = await processPayoutInstuction(data);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
