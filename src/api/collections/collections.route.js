// @ts-check
import { Router } from "express";

import { validateRequest } from "../middlewares/validation.js";
import {
  createCollectionschema,
  collectionsIdSchema,
} from "./collections.schema.js";
import { createCollections, ratesCollections, commissionCollections } from "./collections.ctrl.js";

const router = Router();

/**
 * POST endpoint to create Collections
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

/**
 * PUT endpoint to update rates
 * @route POST /collections/rates
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void} Responds with "pong"
 */
router.put(
  "/rates",
  validateRequest(collectionsIdSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body ?? {};

      /**
       * @param {import("./collections.schema.js").CollectionsId} data
       */
      const result = await ratesCollections(data);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PUT endpoint to update rates
 * @route POST /collections/rates
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void} Responds with "pong"
 */
router.put(
  "/commission",
  validateRequest(collectionsIdSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body ?? {};

      /**
       * @param {import("./collections.schema.js").CollectionsId} data
       */
      const result = await commissionCollections(data);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
