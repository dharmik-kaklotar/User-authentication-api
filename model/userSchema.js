const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, require: [true, "Please Enter UserName"] },
    email: { type: String, required: [true, "Please Enter A Email"], unique: true },
    number: { type: Number, required: [true, "Please Enter A Number"] },
    password: { type: String, required: [true, "Please Enter A Password"] }
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

module.exports = User;