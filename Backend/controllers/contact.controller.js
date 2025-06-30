import { Contact } from "../models/contact.model.js"


 const contactForm = async(req , res) => {
    try {
        const respose = req.body
        await Contact.create(respose)
        return res.status(200).json({msg: "message send successfully"})
    } catch (error) {
        return res.status(500).json({msg: "message not deliver"})
    }
}

export {
    contactForm
}