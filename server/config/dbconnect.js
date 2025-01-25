const mongoose =require("mongoose");
require("dotenv").config();

exports. dbconnect= ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log("database connected successfully")})
    .catch((err)=>{console.log("database connection failed!!")
        process.exit(1);
    })
} 
