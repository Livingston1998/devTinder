const express =  require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

//Sending Connection request
requestRouter.post("/request/send/:status/:toUserId",userAuth,async (req,res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const allowedStatus = ["intrested","ignored"];
        if(!allowedStatus.includes(status)){
            throw new Error("invalid Status request");
        }
        if(fromUserId == toUserId) {
            throw new Error("Connection cannot be sent to the self user");
        }

        const toUser = await User.findById(toUserId);
        if(!toUser) {
            throw new Error("Please send request to valid user");
        }
        const isExistingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        });
        if(isExistingConnectionRequest) {
            throw new Error("Connection Request already Sent");
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,toUserId,status
        });
        const data = await connectionRequest.save();
        res.json({
            message: "Connection Request sent successfully",
            data
        });
    }catch(err) {
        res.status(400).send("Error :"+ err.message);
    }
})

module.exports = requestRouter;