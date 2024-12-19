const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth,async(req,res) => {
    try{
        const loggedInUser = req.user;
        const requestsReceived = await connectionRequest.find({
            toUserId: loggedInUser._id,
        }).populate("fromUserId","firstName lastName"); //to populate data we need to add reference with the respected Schema.
        // }).populate("fromUserId",["firstName","lastName"]);// we also write in the above method . or we can also write in array like this .

        res.json({
            message: "Data fetched successfully",
            requestsReceived
        });
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
});

userRouter.get("/user/connections",userAuth,async(req,res) => {
    try{
        const loggedInUser = req.user;
        const connections = await connectionRequest.find({
            $or: [
                {fromUserId:loggedInUser._id,status:"accepted"},
                {toUserId:loggedInUser._id,status:"accepted"},
            ]
        }).populate("fromUserId","firstName lastName").populate("toUserId","firstName lastName");
        const data = connections.map((key) => {
            if(key.fromUserId._id.toString() === loggedInUser._id.toString()){
                return key.toUserId;
            }
            return key.fromUserId;
        })
        res.json({
            data
        });
    }catch(err) {
        res.status(400).send("Error: "+ err.message);
    }
});

module.exports = userRouter; 