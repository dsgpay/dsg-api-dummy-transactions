// @ts-check
import { Router } from "express";

import { validateRequest } from "../middlewares/validation.js";
import { createCollectionschema } from "./collections.schema.js";
import { createCollections } from "./collections.ctrl.js";

const router = Router();

/**
 * POST endpoint to create STP payment
 * @route POST /collections/create
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void} Responds with "pong"
 */
router.post(
  "/create",
  validateRequest(createCollectionschema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body ?? {};

      /**
       * @param {import("./collections.schema.js").CreateCollections} data
       */
      const result = await createCollections(data);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
