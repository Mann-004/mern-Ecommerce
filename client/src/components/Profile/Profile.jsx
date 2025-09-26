import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { LogOut, Edit2, Save, X, User, Mail, Phone, Lock } from "lucide-react"
import { logoutUserApi, upadteUserProfileApi } from "../../api/userAPI"
import { logout as logoutAction, login } from "../../store/authslice"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

const Profile = ({ setShowProfile }) => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phonenumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone number is required"),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstname: user?.fullname?.firstname || "",
      lastname: user?.fullname?.lastname || "",
      email: user?.email || "",
      phonenumber: user?.phonenumber || "",
    },
  })

  const handleUpdate = async (data) => {
    try {
      setIsLoading(true)
      const res = await upadteUserProfileApi(data)
      dispatch(login(res))
      reset({
        firstname: res?.fullname?.firstname || "",
        lastname: res?.fullname?.lastname || "",
        email: res?.email || "",
        phonenumber: res?.phonenumber || "",
      })
      toast.success("Profile updated successfully!")
      setEditMode(false)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Update failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      await logoutUserApi()
      dispatch(logoutAction())
      toast.success("Logged out successfully!")
      navigate("/auth")
      setShowProfile(false)
    } catch (error) {
      dispatch(logoutAction())
      navigate("/auth")
      setShowProfile(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 sm:p-6 h-screen overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md p-4 sm:p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => setShowProfile(false)}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-500 hover:text-red-500"
        >
          <X size={16} sm:size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullname?.firstname || "User"}`}
            alt="Profile"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-2 sm:mb-3"
          />
          <h2 className="text-lg sm:text-xl font-bold">
            {editMode ? "Edit Profile" : "My Profile"}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
            <InputField
              id="firstname"
              label="First Name"
              icon={<User size={12} sm:size={14} />}
              editMode={editMode}
              register={register}
              error={errors.firstname}
              displayValue={user?.fullname?.firstname}
            />
            <InputField
              id="lastname"
              label="Last Name"
              icon={<User size={12} sm:size={14} />}
              editMode={editMode}
              register={register}
              error={errors.lastname}
              displayValue={user?.fullname?.lastname}
            />
          </div>

          <InputField
            id="email"
            label="Email"
            type="email"
            icon={<Mail size={12} sm:size={14} />}
            editMode={editMode}
            register={register}
            error={errors.email}
            displayValue={user?.email}
          />

          <InputField
            id="phonenumber"
            label="Phone"
            icon={<Phone size={12} sm:size={14} />}
            editMode={editMode}
            register={register}
            error={errors.phonenumber}
            displayValue={user?.phonenumber}
          />

          {/* Actions */}
          <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-3">
            {editMode ? (
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-[var(--heading-color)] text-white py-1.5 sm:py-2 rounded-md flex items-center justify-center gap-1 sm:gap-2 hover:bg-[var(--secondary-bg-color)] hover:text-black disabled:opacity-50 text-sm sm:text-base"
                >
                  {isLoading ? (
                    <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Save size={14} sm:size={16} />
                  )}
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-1.5 sm:py-2 rounded-md flex items-center justify-center gap-1 sm:gap-2 hover:bg-gray-200 text-sm sm:text-base"
                >
                  <X size={14} sm:size={16} />
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  reset({
                    firstname: user?.fullname?.firstname || "",
                    lastname: user?.fullname?.lastname || "",
                    email: user?.email || "",
                    phonenumber: user?.phonenumber || "",
                  })
                  setEditMode(true)
                }}
                className="w-full bg-[var(--heading-color)] text-white py-1.5 sm:py-2 rounded-md flex items-center justify-center gap-1 sm:gap-2 hover:bg-[var(--secondary-bg-color)] hover:text-black text-sm sm:text-base"
              >
                <Edit2 size={14} sm:size={16} />
                Edit Profile
              </button>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => navigate("/change-password")}
                className="bg-gray-100 text-gray-700 py-1.5 sm:py-2 rounded-md flex items-center justify-center gap-1 sm:gap-2 hover:bg-gray-200 text-sm sm:text-base"
              >
                <Lock size={14} sm:size={16} />
                Password
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoading}
                className="bg-red-100 text-red-600 py-1.5 sm:py-2 rounded-md flex items-center justify-center gap-1 sm:gap-2 hover:bg-red-200 disabled:opacity-50 text-sm sm:text-base"
              >
                {isLoading ? (
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <LogOut size={14} sm:size={16} />
                )}
                Logout
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

const InputField = ({ id, label, type = "text", icon, editMode, register, error, displayValue }) => (
  <div className="space-y-1">
    <label htmlFor={id} className="text-xs sm:text-sm font-medium text-gray-700">
      {label}
    </label>
    {editMode ? (
      <div className="relative">
        <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          {...register(id)}
          className={`w-full pl-8 sm:pl-9 pr-2 sm:pr-3 py-1.5 sm:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${error ? "border-red-300" : "border-gray-300"}`}
          placeholder={`Enter ${label}`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
      </div>
    ) : (
      <div className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 border rounded-md bg-gray-50 text-gray-700 text-sm sm:text-base">
        <span className="text-gray-400">{icon}</span>
        <span>{displayValue || <span className="italic text-gray-400">Not provided</span>}</span>
      </div>
    )}
  </div>
)

export default Profile