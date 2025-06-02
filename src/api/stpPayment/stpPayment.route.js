// @ts-check
import { Router } from "express";

import { validateRequest } from "../middlewares/validation.js";
import {
  payoutIdSchema,
  createPayoutInstuctionSchema,
  settlementPayoutSchema,
} from "./stpPayment.schema.js";
import {
  createPayoutInstuction,
  ratesPayoutInstuction,
  approvePayoutInstuction,
  processPayoutInstuction,
  settlementPayoutInstuction,
} from "./stpPayment.ctrl.js";

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
 * PUT endpoint to fixing rates
 * @route PUT /stp/create
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void} Responds with "pong"
 */
router.put(
  "/rates",
  validateRequest(payoutIdSchema, "body"),
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
 * PUT endpoint to approve and getting pricing
 * @route PUT /stp/approve
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void} Responds with "pong"
 */
router.put(
  "/approve",
  validateRequest(payoutIdSchema, "body"),
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
 * PUT endpoint to process and import SOA
 * @route PUT /stp/process
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void} Responds with "pong"
 */
router.put(
  "/process",
  validateRequest(payoutIdSchema, "body"),
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

/**
 * PUT endpoint to process and import SOA
 * @route PUT /stp/process
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void} Responds with "pong"
 */
router.put(
  "/settlement",
  validateRequest(settlementPayoutSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body ?? {};

      /**
       * @param {import("./stpPayment.schema.js").SettlementPayoutInstruction} data
       */
      const result = await settlementPayoutInstuction(data);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
