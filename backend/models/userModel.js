import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    clerkID:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    img:{
        type: String,
    },
    savedPosts: {
        type: [String],
        default: []
    }
}, {timestamps: true})

export default mongoose.model('user', userSchema);