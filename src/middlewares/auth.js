const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth  = async (req,res,next) => {
    try{
        const { token } = req.cookies;
        console.log(req.cookies);
        if(!token) {
            throw new Error("Token is not valid");
        }
        const decodedObj = jwt.verify(token,"Think@21");
        const {_id} =  decodedObj;
        const user = await User.findById(_id);
        if(!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch(err) {
        res.status(400).send("Error: "+ err.message);
    }
    
}

module.exports = {userAuth};