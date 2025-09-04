import express from "express"
import connectDb from "./Database/database.js"
import myContribRoutes from "./Routes/MyContribution.js";
import dotenv from "dotenv"
import cors from "cors"

// express app 
const app = express()

//config env
dotenv.config()

// config cors 
const allowedOrigins = [
  'http://localhost:5173',
  // live server url
  // 'https://clickurl-r72u.onrender.com'
]; 

app.use(cors({
    origin:function(origin,callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null,true)
        } else{
            callback(new Error("Not allowed by cors "))
        }
    },
    credentials:true
}))

//ports
const port = process.env.PORT || 8001

// CONNECTING DB
connectDb().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on ${port}`)
    });
}).catch(error=>{
    console.error("Failed to connect db",error)
})

// middleware 
app.use(express.json({limit:"200kb"}))
app.use("/api/my-contributions", myContribRoutes);
app.use(express.urlencoded({extended:true,limit:"200kb"}))

//routes



// //api version
// app.use("/api/user")
// app.use("/api/news")
// app.use("/api/admin")
// app.use("/api/article")


