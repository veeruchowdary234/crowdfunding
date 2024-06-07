import { errorHandler } from "../utils/error.js"
import Post from "../model/Postmodel.js"
export const createpost = async (req, res,next) => {
    if(!req.body.title||!req.body.content)
    {
        return next(errorHandler(400,'title and description are required'))
    }
    const slug=req.body.title.split('').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'');
    const newpost=new Post({
        title:req.body.title,
        content:req.body.content,
        category:req.body.category,
        slug,
        userid:req.user.id
    });

    try {
        const post=await newpost.save();
        return res.status(201).json({
            success:true,
            post
        })
    } catch (error) {
        return next(error)
    }
}

export const getposts = async (req, res, next) => {
    try {
        const startindex = req.query.startindex ? parseInt(req.query.startindex) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : 9;
        const sortdirection = req.query.order == 'asc' ? 1 : -1;
        const queryFilters = [
            req.query.userid && { userid: req.query.userid },
            req.query.category && { category: req.query.category },
            req.query.slug && { slug: req.query.slug },
            req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } }
                ]
            }
        ].filter(Boolean); // Filter out undefined/null values
        
        const posts = await Post.find(...queryFilters)
            .sort({ createdAt: sortdirection })
            .skip(startindex)
            .limit(limit);

        const totalposts = await Post.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
        const lastMonthPosts = await Post.countDocuments({ createdAt: { $gte: oneMonthAgo } });

        return res.status(200).json({
            success: true,
            posts,
            totalposts,
            lastMonthPosts
        });

    } catch (error) {
        return next(error);
    }
};
export const deletepost=async (req,res,next)=>
{
    if(!req.user.isAdmin||req.user.id!==req.params.userId)
    {
        return next(errorHandler(403,'you are not authorized to delete post'))
    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
        return res.status(200).json({
            success:true,
            message:'post deleted successfully'
        })
    } catch (error) {
        return next(error)
    }
}
export const updatepost=async (req,res,next)=>
{
    if(!req.user.isAdmin||req.user.id!==req.params.userId)
    {
        return next(errorHandler(403,'you are not authorized to update post'))
    }
    try {
        const post=await Post.findByIdAndUpdate(req.params.postId,req.body,{new:true});
        return res.status(200).json({
            success:true,
            post
        })
    } catch (error) {
        return next(error)
    }
}
export const approvepost=async (req,res,next)=>
{
    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,'you are not authorized to approve post'))
    }
    try {
        const post=await Post.findByIdAndUpdate(req.params.postId,{approved:true},{new:true});
        return res.status(200).json({
            success:true,
            post
        })
    } catch (error) {
        return next(error)
    }
}