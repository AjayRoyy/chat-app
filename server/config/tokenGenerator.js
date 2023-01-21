const jwt = require("jsonwebtoken");
require("dotenv").config();

const genearateToken = async (id)=>{
    const token = await jwt.sign({id} , process.env.JWT_SECRET_KEY , {expiresIn:"1day"});
    // console.log(token);
    return token;
}

module.exports = genearateToken;