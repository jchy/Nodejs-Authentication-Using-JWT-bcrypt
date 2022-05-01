const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
            if(err){
                return reject(err);
            }
            return resolve(payload);
        });
    });
};

const protect = async (req, res, next) => {
    const bearer = req.headers.authorization;
    if(!bearer || !bearer.startsWith("Bearer ")){
        return res.status(401).json({ 
            status : "failed", message : "Email or password you enterred is not valid"
        });
    }

    const token = bearer.split("Bearer ")[1].trim();
    console.log(token);

    let payload;

    try{
        payload = await verifyToken(token);
    }
    catch(err){
        return res.status(401).json({ 
            status : "failed", message :"Email or password you enterred is not valid"
        });
    }
    try {
        let user = User.findById(payload.id).lean().exec();
        if(!user){
            return res.status(401).json({
                status: 'failed',
                message: 'Your email or password is incorrect try again'
            })
        }
        req.user = user;
        next();
    } 
    catch (error) {
        return res.status(500).json({status : "failed", message:"something went wrong"});
    }
}

module.exports = protect;