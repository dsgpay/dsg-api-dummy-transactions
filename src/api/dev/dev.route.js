// @ts-check
import { Router } from "express";

import { generateToken } from "../../helpers/auth.js";
import { server } from "../../config/env.js";
import ApiError from "../../utils/ApiError.js";

const router = Router();

/**
 * POST endpoint to get the Token
 * @route POST /stp/create
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void} Responds with "pong"
 */
router.get("/token", async (req, res, next) => {
  try {
    if (server?.env != "development") throw new ApiError(405, "NOT ALLOWED.");
    const token = await generateToken();

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
