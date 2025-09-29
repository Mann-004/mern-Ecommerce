import { Router } from "express"
import {
  placeOrderController,
  getUserOrdersController,
  getAllOrdersController,
  updateOrderStatusController
} from "../controllers/order.controller.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { adminMiddleware } from "../middlewares/adminMiddleware.js"

const router = Router()

/**
 * @swagger
 * /api/orders/:
 *   post:
 *     summary: Place a new order (authenticated users only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []   # Requires login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to order
 *                 example: 68ab4d4457a1c1828bfc63e5
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product
 *                 example: 2
 *               shippingAddressId:
 *                 type: string
 *                 description: Optional shipping address ID (if user has multiple addresses)
 *                 example: 68cacedbf28e6f32516e1fa4
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Order placed successfully
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request (e.g., product not found, missing fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Product not found
 *       401:
 *         description: Unauthorized (user not logged in)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */
router.post("/", authMiddleware, placeOrderController)

/**
 * @swagger
 * /api/orders/my-order:
 *   get:
 *     summary: Get all orders of the logged-in user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []   # Requires login
 *     responses:
 *       200:
 *         description: List of user orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User orders fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized (user not logged in)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */
router.get("/my-order", authMiddleware, getUserOrdersController)

/**
 * @swagger
 * /api/orders/all:
 *   get:
 *     summary: Get all orders that are placed by user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []   # Requires login
 *     responses:
 *       200:
 *         description: List of user orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User orders fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized (user not logged in)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */
router.get("/all", authMiddleware, adminMiddleware, getAllOrdersController)

/**
 * @swagger
 * /api/orders/{orderId}/status:
 *   patch:
 *     summary: Update order status (User or Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []   # Requires login
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 description: New status of the order
 *                 enum: [pending, processing, shipped, delivered, cancelled]
 *                 example: shipped
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Order status updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request (invalid status or order not found)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid status
 *       401:
 *         description: Unauthorized (user not logged in)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden (user cannot update this order)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Forbidden
 */
router.patch("/:orderId/status", authMiddleware, adminMiddleware, updateOrderStatusController)             

export default router
