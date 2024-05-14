const asynchandler = require("express-async-handler");
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const { CreateToken } = require("../config/createToken");


//@desc            register The User
//@route           POST /api/users/register
//@access          Public

const registerUser = asynchandler(async(req, res) => {
    try {
        const { name, email, number, password } = req.body;

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            res.status(400).json({ message: `User Email Already Exist`, success: false })
        } else {

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const userData = await new User({ name: name, email: email, number: number, password: hashedPassword }).save();

            res.status(201).json({ message: "User Created Successfully", data: { _id: userData._id, name: userData.name, email: userData.email, number: userData.number, token: CreateToken(userData._id) }, success: true })

        }

    } catch (error) {
        res.status(400).json({ message: `An Error Occured ,Something Went Wrong! ${error}`, success: false })
    }

});


//@desc            register The User
//@route           POST /api/users/login
//@access          Public
const loginUser = asynchandler(async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User Not Found!", success: false });
        } else {
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (user && isValidPassword) {
                res.status(201).json({ message: "User Login Successfully", data: { _id: user._id, name: user.name, email: user.email, number: user.number, token: CreateToken(user._id) }, success: true })
            } else {
                res.status(400).json({ message: "Wrong Password ,Please Try Again!", success: false })
            }
        }

    } catch (error) {
        res.status(400).json({ message: `An Error Occured ,Something Went Wrong! ${error}`, success: false })
    }
});


//@desc            register The User
//@route           get /api/users
//@access          Private
const getAllUsers = asynchandler(async(req, res) => {
    const userId = req.user;
    res.send(userId);
})
module.exports = { registerUser, loginUser, getAllUsers }