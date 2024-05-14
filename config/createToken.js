const jwt = require("jsonwebtoken");

const CreateToken = id => jwt.sign({ _id: id }, process.env.JWT_SECRET);

module.exports = { CreateToken };