import React, { useState } from "react"
import toast from "react-hot-toast"
import { FaMapMarkerAlt, FaCity, FaFlag, FaGlobe, FaLandmark, FaMoneyBillWave, FaCreditCard } from "react-icons/fa"
import { MdOutlineMarkunreadMailbox } from "react-icons/md"

const CheckoutForm = ({ onSubmit, onCancel }) => {
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("India")
  const [landmark, setLandmark] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("COD")
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!street.trim()) newErrors.street = "Required"
    if (!city.trim()) newErrors.city = "Required"
    if (!state.trim()) newErrors.state = "Required"
    if (!postalCode.trim()) newErrors.postalCode = "Required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) {
      toast.error("Please fill all required fields")
      return
    }
    onSubmit({ street, city, state, postalCode, country, landmark }, paymentMethod)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start sm:items-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl my-6 max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-900">
          Shipping Address & Payment
        </h2>

        {/* Address Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Street Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Street address"
                className={`w-full pl-10 pr-3 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-all duration-200 ${
                  errors.street ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaCity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className={`w-full pl-10 pr-3 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaFlag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
                className={`w-full pl-10 pr-3 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none ${
                  errors.state ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MdOutlineMarkunreadMailbox className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Postal code"
                className={`w-full pl-10 pr-3 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none ${
                  errors.postalCode ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                className="w-full pl-10 pr-3 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none border-gray-300"
              />
            </div>
          </div>

          {/* Landmark */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Landmark (Optional)
            </label>
            <div className="relative">
              <FaLandmark className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="Landmark"
                className="w-full pl-10 pr-3 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* COD */}
            <div
              onClick={() => setPaymentMethod("COD")}
              className={`cursor-pointer flex items-center gap-3 border rounded-xl px-4 py-3 transition-all duration-200 ${
                paymentMethod === "COD"
                  ? "border-green-600 bg-green-50"
                  : "border-gray-300 hover:border-green-400"
              }`}
            >
              <FaMoneyBillWave className="text-green-600 text-xl" />
              <span className="text-sm font-medium">Cash on Delivery</span>
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
                className="hidden"
              />
            </div>

            {/* Online Payment */}
            <div
              onClick={() => setPaymentMethod("ONLINE")}
              className={`cursor-pointer flex items-center gap-3 border rounded-xl px-4 py-3 transition-all duration-200 ${
                paymentMethod === "ONLINE"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              <FaCreditCard className="text-blue-600 text-xl" />
              <span className="text-sm font-medium">Pay Online (Card)</span>
              <input
                type="radio"
                name="payment"
                value="ONLINE"
                checked={paymentMethod === "ONLINE"}
                onChange={() => setPaymentMethod("ONLINE")}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-sm font-medium transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-[var(--heading-color)] hover:bg-green-800 text-white rounded-xl text-sm font-medium transition-all"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm
