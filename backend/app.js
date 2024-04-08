import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import adminRouter from "./routes/admin.routes.js"
const app=express()







app.use(cors({
    origin:["http://localhost:5173","http://localhost:5174","192.168.29.227:5173","http://192.168.29.227:5173/"]
}))




app.use(express.json(
    {
        limit:"16kb"
    }
))

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(cookieParser())


app.use("/api/v1/users",userRouter)
app.use("/api/v1/admin",adminRouter)

export {app}