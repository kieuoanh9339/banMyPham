const Blog = require("../models/BlogModel")


const blogCtrl = {
    getById: async (req,res) => {
        try {
            const blogId = req.params.id;
            let blog = await Blog.findById(blogId)
            
            res.status(200).json({
                status: "success",
                blog: blog,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAll: async (req,res) => {
        try{
            const blogs = await Blog.find()
            res.json({blog:blogs})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    createBlog: async (req,res) => {
        try{
            const {title,content} = req.body
            if(title.trim().length===0){
                return res.status(400).json({msg:"This field is the required field"})
            }
            if(content.trim().length===0){
                return res.status(400).json({msg:"This field is the required field"})
            }
            const newBlog = new Blog({title: title, content:content})
            await newBlog.save()
            return res.status(200).json({msg:"Create successfully", newBlog})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    deleteBlog: async (req,res) => {
        try{
            await Blog.findByIdAndDelete(req.params.id)
            res.status(200).json({msg:"Delete successfully"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    updateBlog: async (req,res) => {
        try{
            const {title,content} = req.body
            if(title.trim().length===0){
                return res.status(400).json({msg:"This field is the required field"})
            }
            if(content.trim().length===0){
                return res.status(400).json({msg:"This field is the required field"})
            }
            const blog=await Blog.findByIdAndUpdate(req.params.id, req.body);
            
            res.status(200).json({ message: "Update successfully", blog });
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    }
}

module.exports=blogCtrl