import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const authmiddleware = async(req , res , next) => {
    const token = req.header("Authorization")

    if(!token){
        return res.status(401)
        .json({msg : "Unauthorized TOKEN not provide"})
    }

    const jwtToken = token.replace("Bearer", "").trim() 
    console.log(jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken ,process.env.JWT_SECRET_KEY )
        console.log(isVerified);
        
        const userData = await User.findOne({ email : isVerified.email})
        .select({password : 0})

        req.user = userData
        req.token = token
        req.userID = userData._id
        
        next()
    } catch (error) {
        
    }
}

export {authmiddleware}