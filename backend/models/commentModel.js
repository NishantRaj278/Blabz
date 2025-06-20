import mongoose, { Schema } from "mongoose";

const commentSchema = mongoose.Schema({
    content:{
        type:String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required: true,
    }
}, {timestamps: true})

export default mongoose.model('comment', commentSchema);