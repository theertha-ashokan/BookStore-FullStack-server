const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

// ======================================user=============================================================

// register
exports.registerController = async (req,res)=>{
    console.log("Inside Register API");
    // console.log(req.body);
    const {username,email,password} = req.body
    console.log(username,email,password);
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(409).json("User already exist!!! Please Login")
        }else{
            const newUser =  new users({
                username,
                email,
                password
            })
            await newUser.save()
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
            const token = jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.JWTSECRET)
            res.status(200).json({user:existingUser,token})
            
        }else{
           
            res.status(401).json("Invalid Email/Password")
        }
        }else{
            res.status(404).json('Account doenot exist')
        }
        

    }catch(err){
          res.status(500).json(err)
    }
    
    
}

// google login
exports.googleLoginController = async (req,res)=>{
    console.log("Inside Google Login Api");

    const {email,password,username,profile} = req.body
    console.log(email,password,username,profile);
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
              const token = jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.JWTSECRET)
            res.status(200).json({user:existingUser,token})

        }else{
            const newUser = new users({
                username,
            email,
            password,profile
            })
            await newUser.save()
            const token = jwt.sign({userMail:newUser.email},process.env.JWTSECRET)
            res.status(200).json({user:newUser,token})

        }
        

    }catch(err){
          res.status(500).json(err)
    }
    
    
}

// profile edit user
exports.userProfileEditController = async (req,res)=>{
    console.log("Iside userProfileEditController");
    
    // get data to upload - from req,payload ,file
    const {username,password,bio,role,profile} = req.body
    const email = req.payload
    const uploadprofile = req.file?req.file.filename:profile

    try{

        const updateUser = await users.findOneAndUpdate({email},{username,email,password,profile:uploadprofile,bio,role},{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    }catch(err){
     res.status(500).json(err)
    }
}

// ======================================Admin=============================================================

exports.getAllUserController = async(req,res)=>{
    console.log("Inside getAllUserController");
    const email = req.payload
    try{
        const allUsers = await users.find({email:{$ne:email}})
        res.status(200).json(allUsers)
    }catch(err){
        res.status(500).json(err)
    }  
}

// update & reset admin profile
exports.adminProfileEditController = async(req,res)=>{
    console.log("Inside adminProfileEditController");
    const {username,password,role,profile} = req.body
    const email = req.payload
    const uploadAdminProfile = req.file?req.file.filename:profile
    try{
        const updateAdmin = await users.findOneAndUpdate({email},{username,email,password,profile:uploadAdminProfile,role},{new:true})
        await updateAdmin.save()
        res.status(200).json(updateAdmin)
    }catch(err){
        res.status(500).json(err)
    }
    
}