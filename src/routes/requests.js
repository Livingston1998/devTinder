const express =  require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

//Sending Connection request
requestRouter.post("/sendingConnectionRequest",userAuth, (req,res) => {
    const user = req.user;
    res.send(user.firstName +"sent request!!!!!");
})

module.exports = requestRouter;