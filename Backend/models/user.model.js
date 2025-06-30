import mongoose from "mongoose";
import bcrypt, { hash } from "bcryptjs"
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        require: true
    }
},{timestamps: true})


// secure password with bcrypt  ya method zayda acha hai professional level per
userSchema.pre("save" ,async function(next){
    // this sa all database ka data ajaye ga user ke collection ka
    const user = this
    if(!user.isModified('password')){
        next()
    }

    try {
        const saltRound = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(user.password , saltRound)
        user.password = hash_password
    } catch (error) {
        next(error)
    }
})

// compare the password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password , this.password)
}




// jsonwebToken
userSchema.methods.generateToken = function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin

        },
        process.env.JWT_SECRET_KEY,
        {
        expiresIn: "30d"
        }
    )
    } catch (error) {
        console.log(error);
        
    }
}

export const User = new mongoose.model("User" , userSchema)
