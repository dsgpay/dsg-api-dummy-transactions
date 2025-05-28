// @ts-check
import { Router } from "express";

const router = Router();

/**
 * POST endpoint to create STP payment
 * @route POST /stp/create
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void} Responds with "pong"
 */
router.post("/create", async (req, res, next) => {
  try {
    const data = req.body ?? {};

    res.status(200).json({});
  } catch (error) {
    next(error);
  }
});

export default router;
