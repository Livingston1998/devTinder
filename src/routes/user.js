const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName about skills photoUrl age gender";
userRouter.get("/user/requests/received", userAuth,async(req,res) => {
    try{
        const loggedInUser = req.user;
        const requestsReceived = await connectionRequest.find({
            toUserId: loggedInUser._id,
        }).populate("fromUserId",USER_SAFE_DATA); //to populate data we need to add reference with the respected Schema.
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

userRouter.get("/user/feed", userAuth,async(req,res) => {
    try{
        const loggedInUser = req.user;
        const page = req.query.page || 1;
        let limit = req.query.limit || 2;
        limit = limit > 3 ? 3: limit;
        const skip = (page-1) * limit; // this formula will work like this page -> 2,limit -> 10, => then skip will be 1* 10 = 10. it will skip first 10 records
        const connectionRequests = await connectionRequest.find({
            $or:[
                {fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id}
            ]
        }).select(["fromUserId", "toUserId"]);

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((key) => {
            hideUsersFromFeed.add(key.fromUserId);
            hideUsersFromFeed.add(key.toUserId);
        });
        const users = await User.find({
            $and: [
                {_id: {$nin: Array.from(hideUsersFromFeed)}},
                {_id:{$ne: loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);//skip and limit are used to set the pagination. 

        res.send(users);
    }catch(err) {
        res.status(400).send("Error: "+ err.message);
    }
});

module.exports = userRouter; 