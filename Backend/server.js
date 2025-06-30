import express from "express"
// import dotenv from "dotenv"
// dotenv.config()
import  cors  from "cors"
import  { router as authRouter } from "./routers/auth.router.js"
import { router as  contactRouter} from "./routers/contact.router.js"
import { router as  serviceRouter} from "./routers/service.router.js"
import { router as  adminRouter} from "./routers/admin.router.js"


import { connectDB } from "./utils/db.js"
import { errorMiddleware } from "./middleware/error-middleware.js"


const app = express()

const corsOptions = {
    origin: [
      "http://localhost:5173",
      "https://social-app-seven-red.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"],
    credentials: true,
  };
  
  app.use(cors(corsOptions));

app.use(express.json())
app.use('/images', express.static('public/images'));
app.use("/api/auth" , authRouter)
app.use("/api/form" , contactRouter)
app.use("/api/data" , serviceRouter)
app.use("/api/admin" , adminRouter)
app.use(errorMiddleware)

const PORT = 5000

connectDB()
.then(() => {
    app.listen(PORT || "/" , () => {
      res.send(`server is running at PORT: ${PORT}`);
        
    })
})

