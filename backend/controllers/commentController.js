import commentModel from "../models/commentModel.js"
import userModel from "../models/userModel.js";


export const getComments = async (req, res) => {
    const comments = await commentModel.find({post: req.params.postId}).populate('user').sort({createdAt: -1});
    res.json(comments);
}

export const addComment = async (req, res) => {

    const clerkId = req.auth.userId;
    if(!clerkId) {
        return res.status(401).json("user not authenticated");
    }

    const user = await userModel.findOne({clerkID: clerkId});
    const post = req.params.postId;

    const createdPost = await commentModel.create({
        content: req.body.content,
        user: user._id,
        post,
    })

    console.log(createdPost);
    res.status(200).send("Comment created successfully");

}
export const deleteComment = async (req, res) => {

    const clerkId = req.auth.userId;
    if(!clerkId) {
        return res.status(401).json("user not authenticated");
    }

    const user = await userModel.findOne({clerkID: clerkId});

    const deletedComment = await commentModel.findOneAndDelete({_id: req.params.id, user: user._id});

    if(!deletedComment){
        return res.status(403).send("You can delete only your posts");
    }

    res.status(201).send("Comment deleted successfully");
}