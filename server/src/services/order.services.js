import { findCartByUser } from "../dao/cart.dao.js"
import { createOrder, findOrdersByUser, findAllOrders, updateOrderStatus } from "../dao/order.dao.js"
import Cart from "../models/cart.model.js"
import productModel from "../models/product.model.js"
import orderModel from "../models/order.model.js"
import { BadRequestError } from "../utils/errorHandler.js"

export const placeCartOrderService = async (userId, addressId, paymentMethod = "COD") => {
    const cart = await findCartByUser(userId)
    const products = await cart.populate("items.product")

    // console.log("Cart items:", products.items.length)

    if (!products || products.length === 0) throw new BadRequestError("Cart is empty")

    for (const item of products.items) {
        if (item.quantity > item.product.stock) {
            throw new BadRequestError(
                `Not enough stock for ${item.product.name}. Available: ${item.product.stock}`
            )
        }
    }

    const orderItems = products.items.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        discount: item.product.discount,
        quantity: item.quantity
    }))

    // console.log("ORDER ITEMS services order",orderItems)

    const totalAmount = orderItems.reduce(
        (sum, item) => sum + (item.price - item.discount) * item.quantity,
        0
    )

    // Only reduce stock and clear cart if payment method is COD
    if (paymentMethod === "COD") {
        for (const item of products.items) {
            await productModel.findByIdAndUpdate(item.product._id, {
                $inc: { stock: -item.quantity }
            })
        }

        cart.items = []
        await cart.save()
    } else {
        console.log("ONLINE order - NOT clearing cart yet")
    }

    const order = await createOrder({
        user: userId,
        items: orderItems,
        shippingAddress: addressId,
        totalAmount,
        paymentMethod,
        status: "pending"
    })

    // console.log("Order created:", order._id, "with payment method:", paymentMethod)
    return order
}

export const placeSingleOrderService = async (userId, productId, quantity, addressId, paymentMethod = "COD") => {
    const product = await productModel.findById(productId)
    if (!product) throw new BadRequestError("Product not found")
    if (quantity > product.stock) {
        throw new BadRequestError(`Not enough stock for ${product.name}. Available: ${product.stock}`)
    }

    const orderItem = {
        product: product._id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        quantity
    }

    // console.log("product", product)

    const totalAmount = (product.price - product.discount) * quantity

    if (paymentMethod === "COD") {
        await productModel.findByIdAndUpdate(product._id, {
            $inc: { stock: -quantity }
        })

        if (productId) {
            const cart = await Cart.findOne({ user: userId })
            if (cart) {
                cart.items = cart.items.filter(item => item.product.toString() !== productId.toString())
                await cart.save()
            }
        } else {
            console.log("Product ID undefined — not removing any specific item from cart")
        }
    } else {
        console.log("ONLINE single order - NOT clearing cart yet")
    }

    const order = await createOrder({
        user: userId,
        items: [orderItem],
        shippingAddress: addressId,
        totalAmount,
        paymentMethod,
        status: "pending"
    })
    return order
}

export const completeOnlineOrderService = async (orderId) => {
    const order = await orderModel.findById(orderId).populate("items.product")
    if (!order) throw new BadRequestError("Order not found")

    for (const item of order.items) {
        await productModel.findByIdAndUpdate(item.product._id, {
            $inc: { stock: -item.quantity }
        })
    }

    const productIds = order.items.map(item => item.product._id)

    await Cart.updateOne(
        { user: order.user },
        { $pull: { items: { product: { $in: productIds } } } }
    )

    console.log("Online order completion finished")
    return order
}


export const getUserOrdersService = async (userId) => {
    return await findOrdersByUser(userId)
}

export const getAllOrdersService = async () => {
    return await findAllOrders()
}

export const updateOrderStatusService = async (orderId, status) => {
    // console.log("Updating order status:", orderId, "to", status)
    return await updateOrderStatus(orderId, status)
}