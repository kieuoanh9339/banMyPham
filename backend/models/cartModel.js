const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema= new mongoose.Schema({
    totalPrice: {
        type: Number,
        default: 0
    },
    userId:{
        type: ObjectId,
        required:true,
    },
    status: {
        type: String,
        enum: ["checkouted", "active"]
    },
    items: [
        {
            product: {
                type: ObjectId,
                ref: "Product"
            },
            amount: {
                type: Number,
                default: 1
            },
            boughtProductPrice: {
                type: Number,
                default: null
            }
        }
    ]
},{
    timeseries:true
})

module.exports= mongoose.model("Cart",cartSchema)
