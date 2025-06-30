import { z } from "zod";
const loginSchema = z.object({
  email: z
  .string({ required_error: "Email is required" })
  .trim()
  .email({ message: "Invalid email address" }),

  password: z
  .string({ required_error: "Password is required" })
  .min(6, { message: "Password must be at least 6 characters" })
  .max(100, { message: "Password must not be more than 100 characters" }),
})

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),
    
  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .regex(/^[0-9]{10,15}$/, {
      message: "Phone number must be 10 to 15 digits",
    }),

 
});


export {signupSchema , loginSchema}