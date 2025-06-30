import express from "express"
import { contactForm } from "../controllers/contact.controller.js"
export const router = express.Router()

router.route("/contact").post(contactForm)

