import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import mongoose from "mongoose"

let isConnected = false

export const connectToDB = async () => {
    if (isConnected) return

    try{
        const mongoURI = process.env.MONGODB_URI
        if (!mongoURI) {
            throw new Error('❌ MONGODB_URI not defined in .env.local')
          }
        await mongoose.connect(mongoURI!, {
            dbName: 'baked_goods',
          })
        isConnected = true
        console.log("✅ MongoDB connected")
    } catch(err) {
        console.error("❌ MongoDB connection failed:", err)
    }
}
