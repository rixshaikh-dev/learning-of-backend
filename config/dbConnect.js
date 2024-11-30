import mongoose from "mongoose";

const dbConnect = async (URL) =>{
  try {
    await mongoose.connect(URL);
    console.log("Database Connected Succes")
  } catch (error) {
    console.log("error: ", error)
  }
}

export default dbConnect;