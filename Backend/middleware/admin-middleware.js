export const adminMiddleware = async(req , res , next) => {
    try {
        const adminRole = req.user.isAdmin

        if(!adminRole) {
            return res.status(403)
            .json({message : "Access denied. user is not admin"})
        }

        next()
    } catch (error) {
        console.log("Admin middle ware error" , error);
        
    }
}