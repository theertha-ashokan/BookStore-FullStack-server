const users = require('../models/userModel')
const jwt =require('jsonwebtoken')

// register
exports.registerController = async (req,res)=>{
    console.log("Inside Register API");
    // console.log(req.body);
    const {username,email,password} = req.body
    // console.log(username,email,password);
    try{
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        
        if(existingUser){
            res.status(409).json("User already exist!!! Please Login")
        }else{
            const newUser =  new users({
                username,
                email,
                password
            })
            
            await newUser.save()
                        console.log(newUser);

            res.status(200).json(newUser)
        }

    }catch{
          res.status(500).json(err)
    }
    
}


// login
exports.loginController = async (req,res)=>{
    console.log("Inside Login Api");

    const {email,password} = req.body
    console.log(email,password);
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            if(existingUser.password == password){
                // token
                const token =jwt.sign({userMail:existingUser.email},process.env.JWTSECRET)
                res.status(200).json({user:existingUser,token})
            }else{
                res.status(200).json("invalid email /password...")
            }
            res.status(200).json({user:existingUser})
        }else{
           
            res.status(404).json("Account doesnot exist...")
        }

    }catch{
          res.status(500).json(err)
    }
    
    
}