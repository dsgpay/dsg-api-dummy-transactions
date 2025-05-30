/**
 * @swagger
 * /api/payments/create:
 *   post:
 *     summary: Generate a fake payment
 *     security:
 *       - BearerAuth: []
 *     tags: [STP Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               corpId:
 *                 type: string
 *                 example: DSGRFB
 *                 required: true
 *               product:
 *                 type: string
 *                 example: USDAUD
 *                 required: true
 *               amount:
 *                 type: number
 *                 example: 100
 *                 required: true
 *               type:
 *                 type: string
 *                 enum: ["global", "local"]
 *                 default: local
 *     responses:
 *       201:
 *         description: A fake payment transaction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "6650c05a60e34721dc2f2301"
 *                 paymentStatus:
 *                   type: string
 *                   example: "CREATED"
 *                 corpId:
 *                   type: string
 *                   example: DSGRFB
 *                 product:
 *                   type: string
 *                   example: "USDAUD"
 *                 amount:
 *                   type: number
 *                   example: 100
 *                 externalReference:
 *                   type: string
 *                   example: "AM8yIOPuYv"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-05-28T11:32:44.674Z"
 */
