
import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
    title:{
        type: String,
        required:[true,"Poll title is required"]

    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"User is required"]

    },
    expiresAt:{
        type: Date,
        required:[true,"Expiration time is required"]

    }

},{timestamps: true})

export default mongoose.model('Poll',pollSchema)