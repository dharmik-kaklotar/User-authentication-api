const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const authUser = async(req, res, next) => {
    const tokenReceived = req.headers.authorization;
    if (!tokenReceived) {
        res.status(404).json({ message: "Token Not Provided!", success: false });
    } else {
        try {
            if (tokenReceived.startsWith("Bearer")) {
                const token = tokenReceived.split(" ")[1];
                const varifiedToken = await jwt.verify(token, process.env.JWT_SECRET);
                if (varifiedToken) {
                    req.user = await User.findOne({ _id: varifiedToken._id }).select("-password");

                    next();
                } else {
                    res.status(404).json({ message: "Token Expired!", success: false });
                }
            } else {
                res.status(404).json({ message: "Provide A Bearer Token!", success: false });
            }
        } catch (error) {
            res.status(404).json({ message: "Something Went Wrong On Token Varification!", success: false });
        }
    }
}

module.exports = { authUser };