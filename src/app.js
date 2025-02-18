const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");
const cookieparser = require("cookie-parser");
const PORT = 7777;
app.use(express.json());
// To read the cookies . we need to add a middleware called cookie-parser
app.use(cookieparser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

// Get User by emailId
app.get("/user",async(req,res) => {
    const userEmail = req.body.emailId;
    try{
        const user = await User.find({emailId:userEmail});
        if(!user.length>0) {
            throw new Error("User not found");
        }
        res.send(user);
    }catch(err) {
        res.status(400).send("Error : "+ err.message);
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
app.patch("/user/:userId",async(req,res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const validUpdates = ['age','gender'];
        const isUpdateAllowed = Object.keys(data).every((key) => validUpdates.includes(key));
        if(!isUpdateAllowed) {
            throw new Error("Update not Allowed");
        }
        const user = await User.findByIdAndUpdate(userId,data, {returnDocument:"after",runValidators:true});
        res.send(`${user} updated successfully!`);
    } catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

connectDB().then(() => {
        console.log("Database Connection Established Successfully.......");
        app.listen(PORT,() => {
            console.log(`Server is sucessfully listening on port ${PORT}....`);
        });
    }).catch((err) =>{
        console.error("Database cannot be connected" + err.message);
    });






