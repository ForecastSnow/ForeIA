import { Schema, model } from "mongoose";


const ChatSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, ref: 'User', },
    index: { type: String },
    status: { type: String, enum: ["disabled", "active"] }, content: String,
    messages: [
        {
            message: { type: String },
            sender: { type: String, enum: ["user", "ia"] }, content: String,
            timestamp: { type: Date, default: Date.now },
        },
    ],
    messageCheckpoint: {
        checkpoint: { type: String },
        timestamp: { type: Date, default: Date.now },
    },



});


export const chatModel = model("chat", ChatSchema);