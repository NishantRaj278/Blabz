import userModel from "../models/userModel.js";

export const getSavedPosts = async (req, res) => {
    const clerkId = req.auth.userId;
    if(!clerkId){
        return res.status(401).json("not authenticated");
    }

    const user = await userModel.findOne({clerkID : clerkId});

    res.status(200).json(user.savedPosts);
}

export const savedPost = async (req, res) => {
    const clerkId = req.auth.userId;
    const postId = req.body.postId;
    if(!clerkId){
        return res.status(401).json("not authenticated");
    }

    const user = await userModel.findOne({clerkID : clerkId});

    const isSaved = user.savedPosts.some((p) => (p===postId));
    if(!isSaved){
        user.savedPosts.push(postId);
        await user.save();
    }
    else{
        user.savedPosts.pull(postId);
        await user.save();
    }

    return res.json(isSaved ? "Post unsaved successfully" : "Post saved Sucessfully");
}