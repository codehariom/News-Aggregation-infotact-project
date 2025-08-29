import mongoose from "mongoose";
// import {db_name} from "../Constant.js";


const connectDb = async() =>{
    try{
        const connection = await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log(`\nYour Database is connected! db host : ${connection.connection.host}`);
    } catch (err){;
        console.log("database not connetced" ,err);
        process.exit(1);
    }
}

export default connectDb; 