const mongoose = require("mongoose");


const connectionRequestSchema = mongoose.Schema({
    fromUserId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",// to populate data we need to add reference with the respected Schema.
        required: true, 
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",//to populate data we need to add reference with the respected Schema.
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "intrested","accepted","rejected"],
            message : `{VALUE} is incorrect status type`,
        }
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("ConnectionRequest",connectionRequestSchema);