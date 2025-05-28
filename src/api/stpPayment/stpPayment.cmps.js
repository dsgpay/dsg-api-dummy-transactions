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
 *                 enum: [global, local]
 *                 example: local
 *                 required: true
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
 *                 status:
 *                   type: string
 *                   enum: [pending, completed, failed]
 *                   example: "pending"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-05-28T11:32:44.674Z"
 */
