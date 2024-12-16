const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");
const {signupValidation} = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req,res) => {
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
})

// login Api
app.post("/login",async(req,res) =>{
    const {emailId,password} = req.body;
    try{
        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid emailId or password");
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid) {
            throw new Error("Invalid emailId or password");
        }
        res.send("Logged in Successfully");
        
    }catch(err) {
        res.status(400).send("Error: " + err.message);
    }
})

// Get User by emailId
app.get("/user",async(req,res) => {
    const userEmail = req.body.emailId;
    try{
        console.log(userEmail)
        const user = await User.find({emailId:userEmail});
        res.send(user);
    }catch(err) {
        res.status(400).send("User not found");
    }
    
});

//Feed API - GET /feed - get all the users from the database
app.get("/feed", async(req,res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }catch(err) {
        res.status(400).send("Something went wrong");
    }
    
});

//Delete API - Delete /user - delete user by Id
app.delete("/user",async(req,res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send(`${user} deleted successfully!`);
    }catch(err) {
        res.status(400).send("Something went wrong");
    }
});

//Update API - PATCH /user - update a user field by Id
app.patch("/user",async(req,res) => {
    const userId = req.body.userId;
    const data = req.body;
    try{
        const user = await User.findByIdAndUpdate(userId,data, {returnDocument:"after",runValidators:true});
        res.send(`${user} updated successfully!`);
    } catch(err) {
        res.status(400).send("Something went wrong" + err.message);
    }
});

connectDB().then(() => {
        console.log("Database Connection Established Successfully.......");
        app.listen(3000,() => {
            console.log("Server is sucessfully listening on port 3000....");
        });
    }).catch((err) =>{
        console.error("Database cannot be connected" + err.message);
    });






