import { Schema, model } from "mongoose";


const UserSchema = new Schema({

    username: { type: String, required: true },
    email: { type: String, requiered: true },
    hashPassword: { type: String, requiered: true }

});


export const userModel = model("user", UserSchema);