import Stripe from "stripe"
import { updateOrderStatusService, completeOnlineOrderService } from "../services/order.services.js"
import { AppError, NotFoundError } from "../utils/errorHandler.js"
import { configDotenv } from "dotenv"
configDotenv({
    path: "./.env",
    quiet: true
})
console.log(process.env.FRONTEND_URL)


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const createCheckoutSessionService = async (items, orderId) => {
    if (!items || items.length === 0) throw new NotFoundError("items are not provided")

    const line_items = items.map(item => ({
        price_data: {
            currency: "inr",
            product_data: { name: item.name },
            unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
    }))

    return await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items,
        success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/`,
        metadata: { orderId },
        payment_intent_data: { description: `Order #${orderId}` },
        locale: "en",
    })
}

export const handleWebhookEventService = async (req) => {
    const sig = req.headers["stripe-signature"]
    // console.log("Stripe signature:", req.headers["stripe-signature"])
    // console.log("Raw body length:", req.body.length)

    let event
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
        throw new AppError("Webhook signature verification failed: " + err.message)
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object
        const { orderId } = session.metadata

        await completeOnlineOrderService(orderId)
        await updateOrderStatusService(orderId, "completed")

        console.log("Stripe webhook: Order completed and cart cleared", orderId)
    }
}
