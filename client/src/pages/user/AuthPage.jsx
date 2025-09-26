import { Eye, EyeOff } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { FaUser, FaEnvelope, FaPhoneAlt, FaLock } from "react-icons/fa"
import { registerUserApi, loginUserApi } from "../../api/userAPI"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "../../store/authslice"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

console.log("backend url:", import.meta.env.VITE_API_URL)

const registerSchema = Yup.object().shape({
    firstname: Yup.string()
        .required("First name is required")
        .min(3, "First name must be at least 3 characters"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
    phonenumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone number is required"),
})

const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
})

const AuthPage = () => {
    const [isRegister, setIsRegister] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [apiError, setApiError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(isRegister ? registerSchema : loginSchema),
    })

    const onSubmit = async (data) => {
        setApiError("")

        const payload = isRegister
            ? {
                fullname: {
                    firstname: data.firstname,
                    lastname: data.lastname,
                },
                email: data.email,
                password: data.password,
                phonenumber: data.phonenumber,
            }
            : {
                email: data.email,
                password: data.password,
            }

        try {
            if (isRegister) {
                const res = await registerUserApi(payload)
                dispatch(login({ user: res.data }))
                navigate("/")
                setTimeout(() => {
                    toast.success("Account created successfully")

                }, 1500);
            } else {
                const res = await loginUserApi(payload)

                dispatch(login({ user: res.data }))
                navigate("/")
                setTimeout(() => {
                    toast.success(`Welcome Back ,${res.data.fullname.firstname}`)
                }, 1500)
            }
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.response?.data?.errors?.join(", ") ||
                "Something went wrong"

            setApiError(message)
            console.error("API Error:", message)

            toast.error(message)


        }
    }

    return (
        <div className="w-full min-h-screen bg-[#f2f2f2] flex items-center justify-center p-4">
            <div className="bg-white p-4 lg:p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="lg:text-2xl font-bold lg:mb-2 text-[var(--heading-color)] text-xl">
                    {isRegister ? "Create Account" : "Welcome Back"}
                </h2>
                <p className="text-zinc-700 lg:mb-6 mb-4">
                    {isRegister ? "Join us and start your journey" : "Login to continue"}
                </p>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    {isRegister && (
                        <div className="flex lg:gap-4 gap-3">
                            <InputField
                                id="firstname"
                                label="First Name"
                                placeholder="First Name"
                                icon={<FaUser />}
                                register={register}
                                error={errors.firstname?.message}
                            />
                            <InputField
                                id="lastname"
                                label="Last Name"
                                placeholder="Last Name"
                                register={register}
                                error={errors.lastname?.message}
                            />
                        </div>
                    )}

                    <InputField
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        icon={<FaEnvelope />}
                        register={register}
                        error={errors.email?.message}
                    />

                    <div className="w-full">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-2 lg:px-3 focus-within:ring-1 focus-within:ring-[var(--heading-color)]">
                            <span className="text-gray-500">
                                <FaLock />
                            </span>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password")}
                                className="w-full lg:px-3 lg:py-2 p-2 outline-none rounded-lg"
                            />
                            <span
                                className="text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <Eye /> : <EyeOff />}
                            </span>
                        </div>
                        {!isRegister && (
                            <p className="text-right text-sm mt-1">
                                <Link to="/forgot-password" className="text-[var(--heading-color)] hover:underline">
                                    Forgot Password?
                                </Link>
                            </p>
                        )}

                        {errors.password && (
                            <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {isRegister && (
                        <InputField
                            id="phonenumber"
                            label="Phone Number"
                            placeholder="Enter your number"
                            icon={<FaPhoneAlt />}
                            register={register}
                            error={errors.phonenumber?.message}
                        />
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[var(--heading-color)] text-white py-2 rounded-lg hover:bg-[#00685a]"
                    >
                        {isRegister ? "Register" : "Login"}
                    </button>
                </form>

                <button
                    type="button"
                    onClick={() => window.open(`${import.meta.env.VITE_API_URL}/api/users/google`, "_self")}
                    className="w-full mt-4 flex items-center justify-center gap-2 border border-gray-300 lg:py-2 py-2 rounded-lg hover:bg-gray-100"
                >
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    Continue with Google
                </button>

                <p className="mt-4 text-center text-gray-600 text-sm">
                    {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
                    <button
                        type="button"
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-[var(--heading-color)] hover:underline"
                    >
                        {isRegister ? "Login" : "Register"}
                    </button>
                </p>
            </div>
        </div>
    )
}

const InputField = ({ id, label, type = "text", placeholder, icon, register, error }) => {
    return (
        <div className="w-full">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-2 lg:px-3 focus-within:ring-1 focus-within:ring-[var(--heading-color)]">
                {icon && <span className="text-gray-500">{icon}</span>}
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    {...register(id)}
                    className="w-full lg:px-3 lg:py-2 px-2 py-1 outline-none rounded-lg"
                />
            </div>
            {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
        </div>
    )
}

export default AuthPage
