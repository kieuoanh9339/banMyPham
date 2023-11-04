const router = require('express').Router()
const cloudinary = require('cloudinary')
const fs= require('fs')
const auth = require('../middlewares/auth')
const authAdmin= require('../middlewares/authAdmin')

cloudinary.config({
    cloud_name: 'dfnai0rjd',
    api_key: '986975194445715',
    api_secret: 'q0iCcpZgKDC61acg6J61hiTviLc'
})


router.post('/upload',auth,authAdmin, (req,res) => {
    try{
        const file1= req.files.file
        if(!req.files || Object.keys(req.files).length===0){
            return res.status(400).json({msg:"No files were uploaded"})
        }
        
        //check size 1mb
        if(file1.size>1024*1024){
            removeTemp(file1.tempFilePath)
            return res.status(400).json({msg:"Size is too large"})
        }
        
        if(file1.mimetype!=='image/jpg' && file1.mimetype !== 'image/png'){
            removeTemp(file1.tempFilePath)
            return res.status(400).json({msg:"File format is incorrect"})
        }
        cloudinary.v2.uploader.upload(file1.tempFilePath, {folder:"test"}, async(err,result) => {
            if(err) throw err
            removeTemp(file1.tempFilePath)
            res.json({public_id: result.public_id, url: result.secure_url})
        })
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
})

router.post('/destroy',auth, authAdmin ,(req,res) => {
    try{
        const {product_id} = req.body
        if(!product_id){
            return res.status(400).json({msg:"No image selected"})
        }

        cloudinary.v2.uploader.destroy(product_id,async(err,result) => {
            if(err) throw err

            res.json({msg:"Delete image successfully"})
        })
                

    }catch(err){
        return res.status(500).json({msg:err.message})
    }
})

const removeTemp = (path) => {
    fs.unlink(path,err => {
        if(err) throw err

    })
}

module.exports= router