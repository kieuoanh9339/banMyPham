const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const fileUpload= require('express-fileupload')
const connectDB = require("./database/index")
const route = require('./routes/index')


dotenv.config()
const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded())
app.use(express.json()) 
app.use(fileUpload({
    useTempFiles:true
}))

route(app)

//connect DB

connectDB()
const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
