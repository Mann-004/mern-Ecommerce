const isProduction = process.env.NODE_ENV === "production"

export const cookieOptionsForAcessToken = {
  httpOnly: true,
  secure: isProduction,               // only require HTTPS in production
  sameSite: "lax", // "none" allows cross-site in dev
  maxAge: 180 * 60 * 1000,
  path: "/",
}

export const cookieOptionsForRefreshToken = {
  httpOnly: true,
  secure: isProduction,
  sameSite:"lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
}
