import mongoose from "mongoose";


export const connectDataBase = async function connectDataBase() {

    try {

        await mongoose.connect(process.env.MONGO_URI).then(() => console.log("database connected!"))

    } catch (error) {

        console.error("Error connection to database:", error)

    }

}
