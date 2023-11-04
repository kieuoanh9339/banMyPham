const Category = require("../models/categoryModel")


const categorCtrl = {
    getCategories: async (req,res) => {
        try{
            const categories = await Category.find()
            res.json(categories)
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    createCategory: async (req,res) => {
        try{
            const {name} = req.body
            const category = await Category.findOne({name})
            if(name.trim().length===0){
                return res.status(400).json({msg:"This field is the required field"})
            }
            if(category){
                return res.status(400).json({msg:"This category already exist"})
            }
            const newCate = new Category({name})
            await newCate.save()
            return res.status(200).json({msg:"Create successfully"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    deleteCategory: async (req,res) => {
        try{
            await Category.findByIdAndDelete(req.params.id)
            res.status(200).json({msg:"Delete successfully"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    updateCategory: async (req,res) => {
        try{
            const {name} = req.body
            await Category.findOneAndUpdate({_id:req.params.id},{name})
            res.status(200).json({msg:"Update successfully"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    }
}

module.exports=categorCtrl