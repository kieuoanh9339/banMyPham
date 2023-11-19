
const mongoose= require("mongoose")

const productSchema = new mongoose.Schema({
    
    product_name:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    desc:{
        type: String,
        require: true
    },
    images:{
        type: Object,
        require: true
    },
    category:{
        type: String,
        require: true
    },
    checked:{
        type: Boolean,
        default: false
    },
    inventory:{
        type: Number,
        default: 0,
        require: true
    },
    sold:{
        type: Number,
        default: 0,
    },
    skinType:{
        type: String,
        default: "",
    },
    deletedAt: {
        type: Date,
        default: null
    }
 },{
    timestamps:true
})
const Product = mongoose.model("Product", productSchema);
module.exports=Product
