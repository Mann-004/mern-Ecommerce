import jwt from "jsonwebtoken"
import { findUserById } from "../dao/users.dao.js"
import { errorResponse } from "../utils/response.js"
import { signToken } from "../utils/signToken.js"
import { cookieOptionsForAcessToken } from "../config/cookieOptions.js"

export const authMiddleware = async (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken
        const refreshToken = req.cookies?.refreshToken

        if (accessToken) {
            try {
                const decodedUser = jwt.verify(accessToken, process.env.JWT_SECERET_KEY)
                const user = await findUserById(decodedUser.id)
                if (!user) return errorResponse(res, "Unauthorized - user not found", 401)

                req.user = user
                return next()
            } catch (err) {
                console.log("Access token expired or invalid:", err.message)
            }
        }


        if (!refreshToken) {
            return errorResponse(res, "Unauthorized - no refresh token", 401)
        }

        try {
            // console.log(refreshToken)
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESHTOKEN_SECERET_KEY)
            // console.log(decoded)
            const user = await findUserById(decoded.id)
            if (!user) return errorResponse(res, "Unauthorized - user not found", 401)

            const newAccessToken = await signToken({ id: user._id, email: user.email })
            // console.log("new access token is ", newAccessToken)
            res.cookie("accessToken", newAccessToken, cookieOptionsForAcessToken)

            req.user = user
            return next()
        } catch (err) {
            console.log("Refresh token invalid:", err.message)
            return errorResponse(res, "Unauthorized - invalid refresh token", 401)
        }
    } catch (err) {
        console.log("Auth middleware error:", err.message)
        return errorResponse(res, "Unauthorized", 401)
    }
}
