import mongoose from "mongoose";

//functon for mongoose database connection 
export const connectDb = async ()=>{
    try{
await mongoose.connect(process.env.MONGO_URL);
console.log(`connected to database${mongoose.connection.host}`);
    } catch(error){
        console.log("db error: ",error);
    }
};

export default connectDb;