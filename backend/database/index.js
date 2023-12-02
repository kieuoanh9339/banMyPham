
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URL, 
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        console.log(`Connected ${process.env.MONGO_URL}}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;