const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const {signupValidation} = require("../utils/validation");
const bcrypt = require("bcrypt");

// signUp Api
authRouter.post("/signup", async (req,res) => {
    //Always use try&catch for database related operations and also for async operations.
    try{
        signupValidation(req);
        const {firstName,lastName,emailId,password}  = req.body;
        const passwordHash = await bcrypt.hash(password,10);
        //Creating a new instance of the User model
        const user = new User ({firstName,lastName,emailId,password: passwordHash});
        await user.save();
        res.send("User Added successfully!!!");
    }catch(err) {
        res.status(400).send("Error : " + err.message);
    }
});

// login Api
authRouter.post("/login",async(req,res) =>{
    const {emailId,password} = req.body;
    try{
        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid emailId or password");
        }
        const isPasswordValid = await user.validatePassword(password);
        if(!isPasswordValid) {
            throw new Error("Invalid emailId or password");
        }
        const token  = await user.getJWT();
        // Add the token to the cookie and send back to the client
        res.cookie("token",token,{ expires: new Date(Date.now() + 900000)});
        res.send("Logged in Successfully");
        
    }catch(err) {
        res.status(400).send("Error: " + err.message);
    }
});


module.exports = authRouter;