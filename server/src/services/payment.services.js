import Stripe from "stripe"
import { AppError, NotFoundError } from "../utils/errorHandler.js"
import { configDotenv } from "dotenv"
configDotenv({
    path: "./.env",
    quiet: true
})


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const createCheckoutSessionService = async (items, orderId) => {
    console.log("orderId")
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

