import { getUserOrdersService, updateOrderStatusService, placeSingleOrderService, placeCartOrderService, getAllOrdersService, completeOnlineOrderService } from "../services/order.services.js"
import { NotFoundError } from "../utils/errorHandler.js"
import { errorResponse, successResponse } from "../utils/response.js"
import addressModel from "../models/address.model.js"


export const placeOrderController = async (req, res, next) => {
  try {
    const { addressId, productId, quantity, paymentMethod = "COD" } = req.body
    // console.log("productID",productId)

    if (!addressId) return next(new NotFoundError("Address not provided"))

    const shippingAddress = await addressModel.findById(addressId)
    if (!shippingAddress) return next(new NotFoundError("Address not found"))

    let order
    if (productId) {
      order = await placeSingleOrderService(
        req.user._id,
        productId,
        quantity || 1,
        shippingAddress._id,
        paymentMethod
      )
    } else {
      order = await placeCartOrderService(
        req.user._id,
        shippingAddress._id,
        paymentMethod
      )
    }

    return successResponse(res, "Order placed successfully", order, 201)
  } catch (err) {
    next(err)
  }
}



export const completeOrderController = async (req, res, next) => {
  try {
    const { orderId } = req.body
    const order = await completeOnlineOrderService(orderId)
    return successResponse(res, "Order completed successfully", order)
  } catch (err) {
    next(err)
  }
}

export const getUserOrdersController = async (req, res, next) => {
  try {
    const orders = await getUserOrdersService(req.user._id)
    // console.log(orders)
    return successResponse(res, "User orders fetched", orders)
  } catch (err) {
    next(err)
  }
}

export const getAllOrdersController = async (req, res, next) => {
  try {
    const orders = await getAllOrdersService()
    return successResponse(res, "All orders fetched", orders)
  } catch (err) {
    next(err)
  }
}

export const updateOrderStatusController = async (req, res, next) => {
  try {
    const { orderId } = req.params
    const { status } = req.body
    const order = await updateOrderStatusService(orderId, status)
    return successResponse(res, "Order status updated", order)
  } catch (err) {
    next(err)
  }
}


