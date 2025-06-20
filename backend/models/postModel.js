import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    user:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    img:{
        type: Buffer,
    },
    title:{
        type:String,
        required: true,
    },
    slug:{
        type:String,
        required: true,
        unique: true,
    },
    content:{
        type:String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        default: "general",
    },
    isFeatured:{
        type: Boolean,
        default: false,
    },
    visit:{
        type: Number,
        default: 0,
    }
}, {timestamps: true})

export default mongoose.model('post', postSchema);