import { Router } from "express"
import bodyParser from "body-parser"
import Stripe from "stripe"
import dotenv from "dotenv"
import { completeOnlineOrderService, updateOrderStatusService } from "../services/order.services.js"
import { AppError } from "../utils/errorHandler.js"

dotenv.config()

const router = Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-08-27.basil"
})

router.post("/webhook", bodyParser.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"]

    let event
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    const handleEvent = async () => {
        switch (event.type) {
            case "checkout.session.completed": {
                const { orderId } = event.data.object.metadata

                try {
                    await completeOnlineOrderService(orderId)
                    await updateOrderStatusService(orderId, "completed")
                } catch (err) {
                    throw new AppError("Failed to update order after checkout")
                }
                break
            }
        }
    }

    try {
        await handleEvent()
        res.status(200).json({ received: true })
    } catch (err) {
        res.status(500).send("Internal Server Error")
    }
})

export default router
