import React, { useEffect, useState, useRef } from "react"
import { getUserOrdersApi } from "../../api/ordersAPI"
import { CheckCircle, Clock, Package, MapPin, ArrowRight, Plane, Luggage } from "lucide-react"
import { useNavigate } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const sectionRef = useRef(null)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getUserOrdersApi()
                setOrders(data || [])
            } catch (err) {
                console.error("Error fetching orders:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-6">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-2 border-b-2 border-[var(--heading-color)]"></div>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 font-semibold">
                        Loading your orders...
                    </p>
                </div>
            </div>
        )
    }

    if (!orders.length) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-6">
                <Package className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 text-gray-400 mb-4 sm:mb-6 animate-pulse" />
                <p className="text-base sm:text-lg md:text-xl text-gray-700 font-semibold mb-4 sm:mb-6 text-center">
                    You have not placed any orders yet.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="group inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-[var(--heading-color)] to-[var(--secondary-bg-color)] text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg font-semibold uppercase tracking-wide text-xs sm:text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                    <span>Start Shopping</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
            </div>
        )
    }

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-gradient-to-br from-yellow-100 via-white to-purple-100 px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16 lg:py-20"
        >
            <div className="max-w-screen-xl mx-auto py-12">
                <div className="text-center mb-8 sm:mb-12 md:mb-16 relative ">
                    <div className="relative flex justify-center items-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl">
                            <Luggage className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                        </div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                            <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                    </div>

                    <h2 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 tracking-tighter uppercase bg-gradient-to-r from-red-900 via-indigo-500 to-yellow-600 bg-clip-text text-transparent leading-tight">
                        My Orders
                    </h2>
                    <div className="relative h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-4 sm:mb-6 max-w-xs sm:max-w-sm md:max-w-md mx-auto"></div>
                </div>

                {/* Orders Grid - Responsive */}
                <div className="grid gap-4 sm:gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
                    {orders.map((order) => {
                        const firstItem = order.items[0]
                        return (
                            <div
                                key={order._id}
                                className="bg-white shadow-lg rounded-lg sm:rounded-xl p-4 border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-4 sm:gap-5"
                            >
                                {/* Product Image */}
                                {firstItem?.product?.image?.url && (
                                    <div className="w-full sm:w-32 md:w-36  sm:h-36 md:h-40 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                                        <img
                                            src={firstItem.product.image.url}
                                            alt={firstItem.name}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 ease-out"
                                        />
                                    </div>
                                )}

                                {/* Order Details */}
                                <div className="flex-1 flex flex-col">
                                    {/* Header */}
                                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                                        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 truncate">
                                            Order #{order._id.slice(-6)}
                                        </h2>
                                        <span
                                            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${order.status === "completed"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {order.status === "completed" ? (
                                                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                                            ) : (
                                                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                                            )}
                                            {order.status.charAt(0).toUpperCase() +
                                                order.status.slice(1)}
                                        </span>
                                    </div>

                                    {/* Shipping Address */}
                                    {/* Shipping Address */}
                                    {order.shippingAddress ? (
                                        <div className="mb-2 sm:mb-3 bg-gray-50 p-2 sm:p-3 rounded-lg border border-gray-200 flex items-start gap-2">
                                            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                                {order.shippingAddress.street},{" "}
                                                {order.shippingAddress.city},{" "}
                                                {order.shippingAddress.state},{" "}
                                                {order.shippingAddress.country} -{" "}
                                                {order.shippingAddress.postalCode}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="mb-2 sm:mb-3 bg-gray-50 p-2 sm:p-3 rounded-lg border border-gray-200 flex items-center gap-2">
                                            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                                            <p className="text-xs sm:text-sm text-gray-600 italic">No shipping address available</p>
                                        </div>
                                    )}


                                    {/* Items */}
                                    <ul className="flex-1 space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
                                        {order.items.slice(0, 2).map((item) => (
                                            <li
                                                key={item._id}
                                                className="flex justify-between text-xs sm:text-sm text-gray-700"
                                            >
                                                <span className="truncate flex-1">
                                                    {item.name} × {item.quantity}
                                                </span>
                                                <span className="font-medium">
                                                    ₹
                                                    {(
                                                        (item.price - item.discount) *
                                                        item.quantity
                                                    ).toLocaleString("en-IN")}
                                                </span>
                                            </li>
                                        ))}
                                        {order.items.length > 2 && (
                                            <li className="text-xs sm:text-sm text-gray-500 italic">
                                                + {order.items.length - 2} more item
                                                {order.items.length - 2 > 1 ? "s" : ""}
                                            </li>
                                        )}
                                    </ul>

                                    {/* Footer */}
                                    <div className="flex justify-between items-center text-xs sm:text-sm border-t pt-2 sm:pt-3 mt-auto">
                                        <p className="text-gray-600">
                                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <p className="font-semibold text-gray-800">
                                                ₹{order.totalAmount.toLocaleString("en-IN")}
                                            </p>
                                            <button
                                                className="group inline-flex items-center gap-1 bg-[var(--heading-color)] text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-semibold uppercase tracking-wide hover:shadow-md"
                                            >
                                                View
                                                <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-x-1 transition-transform duration-300" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Orders