const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId;

const ordertSchema= new mongoose.Schema({
    
    user: {
        type: ObjectId,
        ref: "User",
        required:true,
    },
    cart: {
        type: ObjectId,
        ref: "Cart",
        require: true
    },
    process:{
        type:String,
        required:true
    },// 0: tien mat 1: chuyen khoan
    status: {
        type: String,
        enum: ["00", "10", "01", "11","111"],
        default: "00"
    }, // 00 - chờ xử lý || 10 -> đã huỷ || 01 - admin huỷ || 11 - admin xác nhận -> chờ nhận hàng
    reason: {
        type: String
    }
},{
    timestamps:true
})

module.exports= mongoose.model("Order",ordertSchema)
