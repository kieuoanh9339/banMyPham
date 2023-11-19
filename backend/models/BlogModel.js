
const mongoose= require("mongoose")

const blogSchema = new mongoose.Schema({
    
    title:{
        type: String,
        require: true
    },
    content:{
        type: String,
        require: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
 },{
    timestamps:true
})
const Blog = mongoose.model("Blog", blogSchema);
module.exports=Blog
