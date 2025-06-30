import express from "express"
import { DeleteUsers, getAllContacts, getAllUsers , getUserById,EditUser , DeleteContact } from "../controllers/admin.controller.js"
import { authmiddleware } from "../middleware/auth-middleware.js"
import { adminMiddleware } from "../middleware/admin-middleware.js"
export const router = express.Router()

router.route("/users").get( authmiddleware , adminMiddleware, getAllUsers)
router.route("/users/:id").get( authmiddleware , adminMiddleware , getUserById)
router.route("/users/delete/:id").delete( authmiddleware , adminMiddleware , DeleteUsers)
router.route("/users/update/:id").patch( authmiddleware , adminMiddleware , EditUser)
router.route("/contacts").get( authmiddleware , adminMiddleware , getAllContacts)
router.route("/contacts/delete/:id").delete( authmiddleware , adminMiddleware , DeleteContact)


