import { createUser, findUserByEmail, findUserById, findUserByResetToken, findUserForPasswordUpdate, updateRefreshToken, updateUserDeatils } from "../dao/users.dao.js"
import { AppError, BadRequestError, ConflictError, NotFoundError } from "../utils/errorHandler.js"
import { signRefreshToken, signToken } from "../utils/signToken.js"
import { sendEmail } from "../utils/sendEmail.js"
import crypto from "crypto"
import userModel from "../models/users.models.js"

export const registerUserService = async (fullname, email, password, phonenumber, address, role) => {
    const userAlreadyExists = await findUserByEmail(email)
    if (userAlreadyExists) throw new ConflictError("User alredy exists")

    const newUser = await createUser(fullname, email, password, phonenumber, address, role)
    if (!newUser) throw new AppError("User creation Failed")

    const token = await signToken({ id: newUser._id, email: newUser.email })
    if (!token) throw new AppError("Token generations is failed")

    const refreshToken = await signRefreshToken({ id: newUser._id, email: newUser.email })
    if (!refreshToken) throw new AppError("Refresh Token Generations is failed ")

    const updatedUser = await updateRefreshToken(newUser._id, refreshToken)
    newUser.refreshToken = refreshToken


    return { newUser: updatedUser, token, refreshToken }

}

export const loginUserService = async (email, password) => {
    const existingUser = await findUserByEmail(email)
    if (!existingUser) throw new BadRequestError("Invalid email or password")

    const isPasswordValid = await existingUser.comparePassword(password)
    if (!isPasswordValid) throw new BadRequestError("Invalid email or password")

    const token = await signToken({ id: existingUser._id, email: existingUser.email })
    if (!token) throw new AppError("Token Generations is failed")

    const refreshToken = await signRefreshToken({ id: existingUser._id, email: existingUser.email })
    if (!refreshToken) throw new AppError("Refresh Token Generations is Failed ")

    const updatedUser = await updateRefreshToken(existingUser._id, refreshToken)

    return { existingUser: updatedUser, token, refreshToken }


}


export const updateUserDeatilsServices = async (currentUser, allowedUserUpdateDetails) => {
    const updatedUser = await updateUserDeatils(currentUser, allowedUserUpdateDetails)
    return updatedUser
}

export const updatePasswordService = async (userId, currentPassword, newPassword) => {
    const user = await findUserForPasswordUpdate(userId, true) 
    if (!user) throw new BadRequestError("User not found")

    if (user.password) {
        if (!currentPassword) {
            throw new BadRequestError("Current password is required")
        }

        const isMatch = await user.comparePassword(currentPassword)
        if (!isMatch) throw new BadRequestError("Current password is incorrect")
    } else {
        if (!currentPassword) {
            console.log("Google user: setting initial password")
        } else {
            throw new BadRequestError("Cannot verify current password for this user")
        }
    }

    user.password = newPassword
    const updatedUser = await user.save()

    if (!updatedUser) throw new AppError("Password update failed")

    return updatedUser
}


export const forgotPasswordServices = async (email) => {
    const user = await findUserByEmail(email)
    if (!user) throw new NotFoundError("User not found")

    const resetToken = await user.setResetPasswordToken()

    await user.save({ validateBeforeSave: false })


    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`

    const message = `You requested a password reset. Click the link below to reset your password:\n\n${resetUrl}\n\nIf you did not request, ignore this email.`

    await sendEmail({
        to: user.email,
        subject: "Password Reset Token",
        text: message
    })

    return resetToken
}

export const resetPasswordService = async (token, newPassword) => {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

    const user = await findUserByResetToken(hashedToken)

    if (!user) throw new BadRequestError("Invalid or expired token")

    user.password = newPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    return user
}

