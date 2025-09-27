import { Router } from "express"
import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { createCheckoutSession } from "../controllers/payment.controller.js"
import bodyParser from "body-parser"

const router = Router()


router.post("/", authMiddleware, createCheckoutSession)

export default router
