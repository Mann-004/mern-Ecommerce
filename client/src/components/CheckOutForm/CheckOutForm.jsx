import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaMapMarkerAlt, FaCity, FaFlag, FaGlobe, FaLandmark } from "react-icons/fa";
import { MdOutlineMarkunreadMailbox } from "react-icons/md";

const CheckoutForm = ({ onSubmit, onCancel }) => {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("India");
  const [landmark, setLandmark] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!street.trim()) newErrors.street = "Required";
    if (!city.trim()) newErrors.city = "Required";
    if (!state.trim()) newErrors.state = "Required";
    if (!postalCode.trim()) newErrors.postalCode = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }
    onSubmit(
      { street, city, state, postalCode, country, landmark },
      paymentMethod
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start sm:items-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 rounded-2xl shadow-2xl w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl my-4 sm:my-6 md:my-8 max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 md:mb-5 text-center text-gray-800">
          Shipping Address & Payment
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6">
          {/* Street Address */}
          <div className="md:col-span-2">
            <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1">
              Street Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Street address"
                className={`w-full pl-8 pr-2 py-2 sm:py-2.5 md:py-3 border rounded-lg text-xs sm:text-sm md:text-base focus:ring-1 focus:ring-green-700 focus:border-green-700 outline-none transition-all duration-200 bg-white ${
                  errors.street ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaCity className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className={`w-full pl-8 pr-2 py-2 sm:py-2.5 md:py-3 border rounded-lg text-xs sm:text-sm md:text-base focus:ring-1 focus:ring-green-700 focus:border-green-700 outline-none transition-all duration-200 bg-white ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
          </div>

          {/* State */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaFlag className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
                className={`w-full pl-8 pr-2 py-2 sm:py-2.5 md:py-3 border rounded-lg text-xs sm:text-sm md:text-base focus:ring-1 focus:ring-green-700 focus:border-green-700 outline-none transition-all duration-200 bg-white ${
                  errors.state ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1">
              Postal Code <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MdOutlineMarkunreadMailbox className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Postal code"
                className={`w-full pl-8 pr-2 py-2 sm:py-2.5 md:py-3 border rounded-lg text-xs sm:text-sm md:text-base focus:ring-1 focus:ring-green-700 focus:border-green-700 outline-none transition-all duration-200 bg-white ${
                  errors.postalCode ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaGlobe className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                className={`w-full pl-8 pr-2 py-2 sm:py-2.5 md:py-3 border rounded-lg text-xs sm:text-sm md:text-base focus:ring-1 focus:ring-green-700 focus:border-green-700 outline-none transition-all duration-200 bg-white ${
                  errors.country ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
            </div>
          </div>

          {/* Landmark */}
          <div className="md:col-span-2">
            <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1">
              Landmark (Optional)
            </label>
            <div className="relative">
              <FaLandmark className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="Landmark"
                className="w-full pl-8 pr-2 py-2 sm:py-2.5 md:py-3 border rounded-lg text-xs sm:text-sm md:text-base focus:ring-1 focus:ring-green-700 focus:border-green-700 outline-none transition-all duration-200 bg-white border-gray-300"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 md:mt-6">
          <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 sm:py-2.5 md:py-3 px-2 sm:px-3 text-xs sm:text-sm md:text-base focus:ring-1 focus:ring-green-700 focus:border-green-700 outline-none transition-all duration-200"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="ONLINE">Pay Online (Card)</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-5 md:mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-xs sm:text-sm md:text-base transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm md:text-base font-medium transition-all duration-200"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;