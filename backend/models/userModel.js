const { default: mongoose } = require('mongoose')
const mongoDb= require('mongoose')

const UserSchema= new mongoose.Schema(
    {
    email:{
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
    },
    fullname: String,
    phonenumber: String,
    address: String,
    role: {
        type: String,
        default:0
    },

    },{
        timestamps: true 
    }
)
const User = mongoose.model("User", UserSchema);

module.exports = User;
