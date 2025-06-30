import express from "express"
import { home , register , login , user } from "../controllers/auth.controller.js"
import { loginSchema, signupSchema } from "../validators/auth-validator.js"
import { validate } from "../middleware/validate-middleware.js"
import {authmiddleware} from "../middleware/auth-middleware.js"

export const router = express.Router()

router.route("/").get(home)

router.route("/register").post( validate(signupSchema),  register)
router.route("/login").post( validate(loginSchema) ,   login)
router.route("/user").get( authmiddleware , user)







