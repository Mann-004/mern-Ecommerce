import { cookieOptionsForAcessToken, cookieOptionsForRefreshToken } from "../config/cookieOptions.js"
import { findUserByEmail, findUserById, updateRefreshToken } from "../dao/users.dao.js"
import addressModel from "../models/address.model.js"
import { forgotPasswordServices, loginUserService, registerUserService, resetPasswordService, updatePasswordService, updateUserDeatilsServices } from "../services/users.services.js"
import { BadRequestError, NotFoundError, UnauthorizedError } from "../utils/errorHandler.js"
import { errorResponse, successResponse } from "../utils/response.js"
import { sendEmail } from "../utils/sendEmail.js"
import { signRefreshToken, signToken } from "../utils/signToken.js"


export const registerUserController = async (req, res, next) => {
    try {
        const { fullname, email, password, phonenumber, address, role } = req.body
        // console.log(fullname,email,password,phonenumber,address,role)
        const { newUser, token, refreshToken } = await registerUserService(fullname, email, password, phonenumber, address, role)

        res.cookie("accessToken", token, cookieOptionsForAcessToken)
        res.cookie("refreshToken", refreshToken, cookieOptionsForRefreshToken)
        req.user = newUser

        // await sendEmail({
        //     to: newUser.email,
        //     subject: "Welcome to Scatch – Let’s Get Started!",
        //     text: `Hi ${newUser.name || "there"},
        //             Welcome to Scatch! We’re excited to have you join our community.
        //             If you ever have questions, we’re here to help — just reply to this email.

        //             Cheers,  
        //             The Scatch Team `
        // })

        return successResponse(res, "User registed successfully", newUser, 201)
    } catch (error) {
        next(error)

    }
}

export const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const { existingUser, token, refreshToken } = await loginUserService(email, password)
        res.clearCookie("accessToken", cookieOptionsForAcessToken)
        res.clearCookie("refreshToken", cookieOptionsForRefreshToken)

        res.cookie("accessToken", token, cookieOptionsForAcessToken)
        res.cookie("refreshToken", refreshToken, cookieOptionsForRefreshToken)
        req.user = existingUser

        // console.log("login req user", existingUser)
        // console.log("login access token",token)
        // console.log("login access token",refreshToken)

        return successResponse(res, "User Login successfully", existingUser, 200)

    } catch (error) {
        next(error)
    }

}

export const logoutUserController = async (req, res, next) => {
    try {
        if (req.user?.id) {
            await updateRefreshToken(req.user.id, null)
        }
        res.clearCookie("accessToken", cookieOptionsForAcessToken)
        res.clearCookie("refreshToken", cookieOptionsForRefreshToken)

        return successResponse(res, "Logout succesfull", 200)
    } catch (error) {
        next(error)
    }

}

export const getCurrentUserController = async (req, res, next) => {
    try {
        // if (!req.user || !req.user._id) {
        //     return errorResponse(res, "Unauthorized user", null, 401)
        // }

        const currentUser = await findUserById(req.user._id)
        // console.log("current user", currentUser)
        return successResponse(res, "Current user fetched successfully", currentUser, 200)

    } catch (error) {
        next(error)
    }
}


export const updateUserDetailsController = async (req, res, next) => {
    try {
        const currentUser = req.user?._id
        if (!currentUser) {
            return errorResponse(res, "Unauthorized user", 401)
        }
        const { email, firstname, lastname, phonenumber } = req.body
        // console.log(phonenumber)
        if (email) {
            const existingUser = await findUserByEmail(email)
            if (existingUser && existingUser._id.toString() !== currentUser.toString()) {
                return errorResponse(res, "Email already in use", 400)
            }
        }

        const updatedUserDetails = await updateUserDeatilsServices(
            currentUser,
            {
                email,
                fullname: {
                    firstname,
                    lastname
                },
                phonenumber
            }
        )
        // console.log(updatedUserDetails)

        if (!updatedUserDetails) {
            return errorResponse(res, "User not found", 404)
        }

        return successResponse(res, "User updated successfully", updatedUserDetails, 200)
    } catch (error) {
        next(error)
    }
}

export const updatePasswordController = async (req, res, next) => {
    try {
        const userId = req.user._id
        const { currentPassword, newPassword } = req.body

        if (!newPassword || newPassword.length < 6) {
            return next(new BadRequestError("New password must be at least 6 characters"))
        }

        const updatedUser = await updatePasswordService(userId, currentPassword, newPassword)
        return successResponse(res, "Password updated successfully", updatedUser, 200)
    } catch (error) {
        next(error)
    }
}

export const forgotPasswordController = async (req, res, next) => {
    try {
        const { email } = req.body
        if (!email) throw new BadRequestError("Email is required")

        const resetPasword = await forgotPasswordServices(email)
        return successResponse(res, "Reset email sent", resetPasword, 200)


    } catch (error) {
        next(error)

    }

}

export const resetPasswordController = async (req, res, next) => {
    try {
        const { newPassword } = req.body
        const { token } = req.query

        if (!token || !newPassword) throw new BadRequestError("Token and new password are required")

        const updatedUser = await resetPasswordService(token, newPassword)

        return successResponse(res, "Password reset successful", { userId: updatedUser._id }, 200)
    } catch (error) {
        next(error)
    }
}

export const googleAuthController = async (req, res) => {
    console.log("frontend url :", process.env.FRONTEND_URL)
    console.log("callback url", process.env.CALLBACK_URL)
    try {
        const token = await signToken({ id: req.user._id, email: req.user.email })
        const refreshToken = await signRefreshToken({ id: req.user._id })
        await updateRefreshToken(req.user._id, refreshToken)

        res.cookie("accessToken", token, cookieOptionsForAcessToken)
        res.cookie("refreshToken", refreshToken, cookieOptionsForRefreshToken)
        // console.log("frontend url :",process.env.FRONTEND_URL)

        res.redirect(process.env.FRONTEND_URL)
    } catch (error) {
        console.error("Google login failed:", error)
        res.redirect(`${process.env.FRONTEND_URL}/auth`)
    }
}

export const userAddressController = async (req, res, next) => {
    try {
        const user = await findUserById(req.user._id)
        if (!user) throw new NotFoundError("User not found")

        const { street, city, state, postalCode, country, landmark } = req.body
        const address = await addressModel.create({
            user: user._id,
            street,
            city,
            state,
            postalCode,
            country,
            landmark
        })
        // console.log("newly created address:", address)

        user.addresses.unshift(address._id)
        await user.save()
        return successResponse(res, "Address added successfully", address, 201)
    } catch (err) {
        next(err)
    }
}




