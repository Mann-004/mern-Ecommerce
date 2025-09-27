import { configDotenv } from "dotenv"
import dotenv from "dotenv"

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`
})
// console.log("app", process.env.NODE_ENV)
// console.log("url", process.env.FRONTEND_URL)
// console.log("callback url",process.env.CALLBACK_URL)



import express from "express"
import connectDB from "./src/db/db.connect.js"
import chalk from "chalk"
import cookieParser from "cookie-parser"
import path from "path"
import { fileURLToPath } from "url"
import cors from "cors"
import session from "express-session"
import passport from "passport"
import "./src/config/passport.config.js"

import { errorHandler } from "./src/utils/errorHandler.js"
import userRoutes from "./src/routes/user.routes.js"
import productRoutes from "./src/routes/products.routes.js"
import cartRoutes from "./src/routes/cart.routes.js"
import orderRoutes from "./src/routes/order.routes.js"
import stripeRoute from "./src/routes/payment.routes.js"
import webhookRoute from "./src/routes/webhook.routes.js"
import { swaggerDocs } from "./src/docs/swagger.js"


const app = express()
const PORT = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use("/api",webhookRoute)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ["https://scatch-bice.vercel.app"]
    : [
      "http://localhost:5173",
    ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS',],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Cookie',
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  exposedHeaders: ['Set-Cookie'],
  optionsSuccessStatus: 200
}))

app.use(session({
  secret: process.env.SESSION_SECRET || "keyboardcat",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/payment", stripeRoute)

swaggerDocs(app, PORT)



app.use(errorHandler)
app.listen(PORT, async () => {
  await connectDB()
  console.log(`Server running on port ${PORT}`)
})


export default app
