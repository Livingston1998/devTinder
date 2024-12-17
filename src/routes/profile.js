const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation");


//GET user Profile - /profile/view
profileRouter.get("/profile/view",userAuth,async(req,res) => {
    try{
        const user = req.user;
        res.send(user);
    } catch(err) {
        res.status(400).send("Error: " + err.message);
    }
    
});

//PATCH edit user profile - /profile/edit
profileRouter.patch("/profile/edit",userAuth, async(req,res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request")
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
        await loggedInUser.save();
        res.send(`${loggedInUser.firstName}, Your Profile Updated Successfully`);
    }catch(err) {
        res.status(400).send("Error: " + err.message);
    }
});

//PATCH edit user password - /profile/password
profileRouter.patch("/profile/password", userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const isOldPasswordValid = await loggedInUser.validatePassword(req.body.password);
        if(!isOldPasswordValid) {
            throw new Error("Invalid Edit Request");
        }
        loggedInUser.password = await loggedInUser.hashPassword(req.body.newPassword);
        await loggedInUser.save();
        res.send(`${loggedInUser.firstName}, Your Password Updated Successfully`);
    }
    catch(err) {
        res.status(400).send("Error: " + err.message);
    }
});


module.exports = profileRouter;
