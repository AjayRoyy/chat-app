const mongoose = require("mongoose");
const {Schema} = mongoose;


const userSchema = new Schema({
    username : {
        type : String,
        required : [true , "Please provide a valid username"],
    },
    email : {
        type : String,
        required : [true , "Please provide a valid email address"],
        unique : true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please Provide a valid email",
          ],
    },
    phone : {
        type : String,
        required : [true , "Please enter a valid Mobile Number"],
        unique : [true , "Entered phone number already exists"],
        minLength : [10 , "Please Enter a 10 digit phone number"],
        maxlength : [10 , "Please Enter a 10 digit phone number"],
    },
    password : {
        type : String,
        required : [true , "Please enter your password"],
        minLength : [6 , "Please enter password more than 6 characters"],

    },
    profilePicture : {
        type : String,
        default : "https://imgs.search.brave.com/NKyBc0Q7EK9jUZdj6AKP3Kl-K3Le8alevgp1C0njEys/rs:fit:800:800:1/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdGh1bWJz/LmRyZWFtc3RpbWUu/Y29tL2IvZGVmYXVs/dC1hdmF0YXItcHJv/ZmlsZS1pY29uLXNv/Y2lhbC1tZWRpYS11/c2VyLXZlY3Rvci1p/bWFnZS1pY29uLWRl/ZmF1bHQtYXZhdGFy/LXByb2ZpbGUtaWNv/bi1zb2NpYWwtbWVk/aWEtdXNlci12ZWN0/b3ItaW1hZ2UtMjA5/MTYyODQwLmpwZw"
    }
} , {
    timestamps : true
})

const user = mongoose.model("userModel" , userSchema);

module.exports = user;