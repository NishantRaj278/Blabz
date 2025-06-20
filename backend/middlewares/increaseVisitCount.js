import postModel from "../models/postModel.js";

const increaseVisit = async (req, res, next) => {
    const slug = req.params.slug;
    await postModel.findOneAndUpdate({slug}, {$inc : {visit: 1}});
    next();
}

export default increaseVisit;