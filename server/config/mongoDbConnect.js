const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`connected to Mongodb`)
        
    } catch (error) {
        console.log({error : error.message})
    }

}

module.exports = connectToDb;