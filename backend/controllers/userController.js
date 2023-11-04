const User= require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const UserCtrl={
    register:async (req,res) => {
        try{
            const {email,password,fullname, phonenumber, address}=req.body
            const a= email.trim()
            const b= password.trim()
            const checkMail = await User.findOne({email:a})
            // console.log(checkMail)
            const message1={}
            let check= 1
            const regex= /^[A-Za-z0-9]+@[A-Za-z0-9]+(\.[A-Za-z0-9]+)$/

            //check validate email
            if(a.length === 0){
                check= 0
                message1.email="The email field is the required field"
                // return res.status(400).json({msg:"The email field is the required field"})
            }else if(!regex.test(a)){
                check= 0
                message1.email="Please enter the correct email format"
                // return res.status(400).json({msg:"Please enter the correct email format"})
            } 
            //check password
            if( b.length===0){
                check= 0
                message1.password="The password field is the required field"
                // return res.status(400).json({msg:"The password field is the required field"})
            }else if(b.length < 6){
                check= 0
                message1.password="Password should be atleast 6 characters"
                // return res.status(400).json({msg:"Password should be atleast 6 characters"})
            }

            if (fullname.trim().length === 0) {
                message1.fullname = "The fullname field is required"
            }

            if (phonenumber.trim().length === 0) {
                message1.phoneNumber = "The phone number field is required"
            }

            if (address.trim().length === 0) {
                message1.address = "The address field is required"
            }
            
            //hien thi ma loi validate
            if(check==0){
                return res.status(400).json(message1)
            }
            
            if(checkMail){
                return res.status(400).json({"email":"The email field already exists"})
                
            }


            // hash password
            const hashedPassword = await bcrypt.hash(b, 10);
            const newUser = new User({
                email: a,
                password: hashedPassword,
                fullname: fullname || "",
                phonenumber: phonenumber || "",
                address: address || ""
              });
            // save db
            await newUser.save();
            const accessToken = createAccessToken({id: newUser._id})
            const refreshtoken= createRefreshToken({id: newUser._id})
            res.cookie('refreshtoken',refreshtoken,{
                httpOnly:true,
                path:'api/user/refresh_token'
            })
            return res.status(200).json(accessToken)
            
            

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },

    login: async (req,res) => {
        try{
            const {email, password}= req.body
            const a= email.trim()
            const b= password.trim()
            
            const message1={}
            let check= 1
            const regex= /^[A-Za-z0-9]+@[A-Za-z0-9]+(\.[A-Za-z0-9]+)$/

            //check validate email, pw
            if(a.length === 0){
                check= 0
                message1.email="The email field is the required field"
                // return res.status(400).json({msg:"The email field is the required field"})
            }else if(!regex.test(a)){
                check= 0
                message1.email="Please enter the correct email format"
                // return res.status(400).json({msg:"Please enter the correct email format"})
            }

            //check password
            if( b.length===0){
                check= 0
                message1.password="The password field is the required field"
                // return res.status(400).json({msg:"The password field is the required field"})
            }else if(b.length < 6){
                check= 0
                message1.password="Password should be atleast 6 characters"
                // return res.status(400).json({msg:"Password should be atleast 6 characters"})
            }
            if(check==0){
                return res.status(400).json(message1)
            }
            //check login
            const user = await User.findOne({email:a})
            if(!user){
                return res.status(400).json({"email":"Email is not registered"})
            }
            const checkPw= await bcrypt.compare(b, user.password)
            if(!checkPw){
                return res.status(400).json({"password":"Incorrect password"})
            }
            const accessToken = createAccessToken({id: user._id})
            const refreshtoken= createRefreshToken({id: user._id})
            // res.cookie('refreshtoken',refreshtoken,{
            //     httpOnly:true,
            //     path:'api/user/refresh_token'
            // })
            return res.json({accessToken,refreshtoken})
            //return res.json({msg:"Login successfully"})S
            
            
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    logout: async (req,res) => {
        try{
            res.clearCookie('refreshtoken',{
                path: 'api/user/refresh_token'
            })

            res.json({msg:"Logged out"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    getUser: async(req,res) => {
        try{
           const user= await User.findById(req.user.id).select('-password')
           if(!user) return res.status(400).json({msg:"User does not exist"})

           return res.json(user)

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    updateUser: async (req, res) => {
        try {
          const user = await User.findByIdAndUpdate(req.user.id, req.body);
          res.status(200).json({ message: "Update user successfully"});
        } catch (e) {
          res.status(500).json({msg:err.message});
        }
    },
    updatePassword: async (req, res) => {
        try {
          const { email, password } = req.body;
          const hashed = await bcrypt.hash(password, 10);
    
          const user = await User.findOne({ email: email });
          await user.updateOne({ password: hashed });
          res.status(200).json("Update password successful!");
        } catch (e) {
          console.log(e);
        }
    },
    refreshToken: async (req, res) => {
        try{
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg:"Please login or register"})

            jwt.verify(rf_token,process.env.REFRESH_TOKEN,(err,user) => {
                if(err) return res.status(400).json({msg:"Login or register now"})
                const accesstoken= createRefreshToken({id: user._id})
                res.json(accesstoken)
            })

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    }

}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'2d'})
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN, {expiresIn:'2d'})
}

module.exports=UserCtrl