const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const genearateToken = require("../config/tokenGenerator");


const registerController = async (req, res)=>{

    try {
        const {username , email , password , phone  , profilePicture} = req.body;
        const checkUser =await userModel.findOne({email});
        if(!checkUser)
        {
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(password , salt);
            
            const createUser = await userModel.create({
                username , email , password : hashpassword , phone  , profilePicture
            })
            const token = await genearateToken(createUser._id);
            res.send({createUser , token})
        }else
        {
            res.status(400).json({
                message : "User already exit"

            })
        }
        
    } catch (error) {
        res.status(404).json({
            error : error.message
        })
    }
    

}

module.exports = {registerController}