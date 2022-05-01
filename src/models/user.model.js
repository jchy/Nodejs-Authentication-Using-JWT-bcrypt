const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        username : {type : String},
        email : {type : String, required:true},
        password : {type : String, required:true}
    },
    {
        timestamps : true
    }
);


UserSchema.pre("save", function(next){
    if(!this.isModified("password")){
        return next();
    }
    bcrypt.hash(this.password, 8, (err, hashedPassword)=>{
        if(err){
            return next(err);
        }
        this.password = hashedPassword;
        next();
    })
})


UserSchema.methods.checkPassword = function(password){
    const hashedPassword = this.password;
    return new Promise((resolve, reject) =>{
        bcrypt.compare(password, hashedPassword, (err, same)=>{
            if(err){
                return reject(err);
            }
            resolve(same);
        })
    })
}

const User = mongoose.model('User',UserSchema);
module.exports = User;