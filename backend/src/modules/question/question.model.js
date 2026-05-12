import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 500
    },
    poll: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll',
        required: true
    }
})

export default mongoose.model('Question',questionSchema)