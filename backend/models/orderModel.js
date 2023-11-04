const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId;

const ordertSchema= new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required:true,
    },
    status: {
        type: String,
        enum: ["00", "10", "01", "11"],
        default: "00"
    }, // 00 - chờ xử lý || 10 -> đã huỷ || 01 - admin huỷ || 11 - admin xác nhận -> chờ nhận hàng
    cart: {
        type: ObjectId,
        ref: "Cart",
        require: true
    }
},{
    timestamps:true
})

module.exports= mongoose.model("Order",ordertSchema)
