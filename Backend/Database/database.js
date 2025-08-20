import mongoose from "mongoose";

const connectDb = async () =>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log (`\n Your database is connected db host :${connection.connection.host}`)
    } catch (error) {
        console.log("Database is not connected" ,error)
        process.exit(1)
    }
}
export default connectDb