import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const DBConnect=async()=>{

  try {
    const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    console.log("mongo db connected || ",connectionInstance.connection.host)
  } catch (error) {
    console.log("Error at connection db:",error)
    process.exit(1)
  }
}

export default DBConnect;