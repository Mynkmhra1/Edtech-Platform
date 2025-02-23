const express=require("express")
const app=express()

const courseRoutes=require("./router/course")
const paymentsRoutes=require("./router/payments")
const profileRoutes=require("./router/profile")
const userRoutes=require("./router/user")
const contactRoutes=require("./router/contact")

const database=require("./config/dbconnect")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const {cloudinaryConnect}=require("./config/cloudinary")
const fileupload=require("express-fileupload")

require("dotenv").config()

const PORT=process.env.PORT || 4000;

//database connect
database.dbconnect()

//middleware
app.use (express.json());
app.use (cookieParser())
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true
    })
)

app.use(fileupload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

//cloudinaryConnect
cloudinaryConnect();

//routes
app.use("/app/v1/auth",userRoutes)
app.use("/app/v1/profile",profileRoutes)
app.use("/app/v1/course",courseRoutes)
app.use("/app/v1/payments",paymentsRoutes)
app.use("/app/v1/contact",contactRoutes)

//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"your server is up and running"
    })
})

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
})