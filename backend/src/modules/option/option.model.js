import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Option text is required"],
        trim: true,
        maxlength: [200, "Option text must be under 200 characters"]
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true 
    },
    voteCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

export default mongoose.model('Option', optionSchema)