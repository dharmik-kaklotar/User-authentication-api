const mongoose = require("mongoose");

const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb Connect Successfully ! ");
    } catch (error) {
        console.log(`MongoDb Not Connect ! ${error}`);
    }

}

module.exports = { connect }