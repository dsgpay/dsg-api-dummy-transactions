// @ts-check
import { Router } from "express";
import { createPayoutInstuction } from "./stpPayment.ctrl.js";
import { validateRequest } from "../middlewares/validation.js";
import { createPayoutInstuctionSchema } from "./stpPayment.schema.js";

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

export default router;
