import { Service } from "../models/service.model.js";

const services =  async (req , res) => {
    try {
        const response = await Service.find()
        if(!response){
            res.status(404).json({msg : "No service found"})
        }
        
       return res.status(200).json({msg : response})

    } catch (error) {
        console.log("Service error" ,error);
        
    }
}

export {services}