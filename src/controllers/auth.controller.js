const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user.model');

const newToken = (user) => {
    return jwt.sign({id : user.id}, process.env.JWT_SECRET_KEY);
}

const signup = async(req,res) => {
    // try {
        const duplicateUser = await User.findOne({email: req.body.email});
        if(duplicateUser){
            return res.status(400).send("User already exists please sign in to proceed");
        }
        const user = await User.create(req.body);
        return res.status(201).json({data : user});
    // } 
    // catch (error) {
    //     return res.status(500).send("User is not created");
    // }
}

const signin = async(req,res) => {
    let user;
    try {
        user = await User.findOne({email: req.body.email}).exec();
        if(!user){
            return res.status(400).json({staus : "failed" ,message: "User does not exist please Signup first"});
        }
    } 
    catch (error) {
        return res.status(500).send("User is not created");
    }
    try{
        const match = await user.checkPassword(req.body.password);
        if(!match){
            return res.status(401).status.json({status: "failed", message : "Email or password you entered doesn't match"})
        }
    }
    catch(err){
        return res.status(500).json({status: "failed", message:"an error has occured at server"});
    }
    const token = newToken(user);
    return res.status(201).json({data : {token}});
};

module.exports = {
    signin, signup
}
