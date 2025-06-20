import postModel from "../models/postModel.js"
import userModel from "../models/userModel.js";

export const getPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    const query = {};

    const cat = req.query.cat;
    const searchQuery = req.query.search;
    const author = req.query.author;
    const sortQuery = req.query.sort;
    const featured = req.query.featured;

    if(cat){
        query.category = cat;
    }

    if(searchQuery){
        query.title = { $regex: searchQuery, $options: "i"};
    }

    if(author){
        const user = await userModel.findOne({username: author}).select("_id");
        if(!user){
            return res.status(404).json("No post found");
        }

        query.user = user._id;
    }

    let sortObj = {createdAt: -1};
    if(sortQuery){
        switch (sortQuery) {
            case "newest":
                sortObj = {createdAt: -1};
                break;
            case "oldest":
                sortObj = {createdAt: 1};
                break;
            case "popular":
                sortObj = {visit: -1};
                break;
            case "trending":
                sortObj = {visit: -1};
                query.createdAt = {
                    $gte: new Date(new Date().getTime() - 7*24*60*60*1000)
                }
                break;
        
            default:
                break;
        }
    }

    if(featured){
        query.isFeatured = featured==="true" || featured === true;
    }

    const posts = await postModel.find(query).sort(sortObj).limit(limit).skip((page-1)*limit).populate('user');
    const totalPosts = await postModel.countDocuments();
    const hasMore = page*limit < totalPosts;

    const postsWithImg = posts.map(post => {
        const postObj = post.toObject();
        if (postObj.img) {
            postObj.imageBase64 = `data:image/png;base64,${postObj.img.toString('base64')}`;
        }
        return postObj;
    });

    res.status(200).json({posts: postsWithImg, hasMore});

}

export const getPost = async (req, res) => {
    const post = await postModel.findOne({slug: req.params.slug}).populate("user");
    if (!post) return res.status(404).json({ error: "Post not found" });

    const postObj = post.toObject();
    if (postObj.img) {
        postObj.imageBase64 = `data:image/png;base64,${postObj.img.toString('base64')}`;
    }

    res.status(200).json(postObj);
}

export const createPost = async (req, res) => {
    try {
        const clerkId = req.auth.userId;

        if (!clerkId) {
            return res.status(401).json("not authenticated");
        }
        const user = await userModel.findOne({ clerkID: clerkId });
        if (!user) {
            return res.status(404).json("User not found");
        }

        let slugBase = req.body.title.replace(/ /g, "-").toLowerCase();
        let slug = slugBase;
        let existingPost = await postModel.findOne({ slug });
        let counter = 2;
        while (existingPost) {
            slug = `${slugBase}-${counter}`;
            existingPost = await postModel.findOne({ slug });
            counter++;
        }

        let { title, category, content, desc } = req.body;
        const img = req.file.buffer;
        const post = await postModel.create({
            user: user._id,
            title,
            desc,
            content,
            slug,
            category,
            img
        });

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
} 

export const deletePost = async (req, res) => {

    const clerkId = req.auth.userId;
    if(!clerkId){
        return res.status(401).json("not authenticated");
    }
    const user = await userModel.findOne({clerkID: clerkId});

    const deletedPost = await postModel.findOneAndDelete({_id: req.params.id, user: user._id});
    if(!deletedPost) return res.status(403).json("You can delete only your posts");
    res.status(200).json("Post has been deleted");
}

export const featurePost = async (req, res) => {

    const post = await postModel.findOne({_id: req.body.postId});
    post.isFeatured = !post.isFeatured;
    await post.save();

    return res.status(200).json("post featured successfully");
}