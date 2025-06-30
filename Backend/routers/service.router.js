import express from "express"

import { services } from "../controllers/service.controller.js"
export const router = express.Router()

router.route('/service').get(services)

