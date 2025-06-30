import { Contact } from "../models/contact.model.js"
import { User } from "../models/user.model.js"

const getAllUsers =async (req , res) => {
    try {
        const users = await User.find( { isAdmin: false } , {password : 0} , )
        
        if(!users || users.length === 0){
            return res.status(404).json({message : "No Users found"})
        }

       return res.status(200).json(users)
        
    } catch (error) {
        next(error)
    }
}

const getAllContacts = async (req , res) => {
    try {
        const contacts = await Contact.find()
        
        if(!contacts || contacts.length === 0){
            return res.status(404).json({message : "No Contact found"})
        }

       return res.status(200).json(contacts)
        
    } catch (error) {
        next(error)
    }
}

const DeleteUsers = async (req , res , next) => {
    try {
        const id = req.params.id
        await User.deleteOne({_id : id})

       return  res.status(200).json({message : "User Deleted"})

    } catch (error) {
        next(error)
    }
}

// Single user data
const getUserById = async(req , res , next) => {
    try {
        const id = req.params.id
        const user = await User.findOne({_id : id} , {password: 0})

       res.status(200).json({msg : user})
    } catch (error) {
        next(error)

    }
}

const EditUser = async (req , res , next) => {
    try {
        const id = req.params.id
        const data = req.body // updated data

        const updateUser = await User.updateOne({_id: id} , {
            $set: data,
        })

        return res.status(200).json(updateUser)
        
    } catch (error) {
        next(error)
    }
}

const DeleteContact = async (req , res , next) => {
    try {
        const id = req.params.id
        await Contact.deleteOne({_id : id})

       return  res.status(200).json({message : "Deleted Contact"})

    } catch (error) {
        next(error)
    }
}

export {getAllUsers , getAllContacts , DeleteUsers , getUserById , EditUser , DeleteContact}