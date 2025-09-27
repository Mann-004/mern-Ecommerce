import { createCheckoutSessionService } from "../services/payment.services.js"


export const createCheckoutSession = async (req, res,next) => {
  try {
    const { items, orderId } = req.body
    const session = await createCheckoutSessionService(items, orderId)
    res.json({ success: true, url: session.url })
  } catch (err) {
    next(err)
   
  }
}


