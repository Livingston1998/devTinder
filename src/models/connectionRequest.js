const mongoose = require("mongoose");


const connectionRequestSchema = mongoose.Schema({
    fromUserId: {
        type : mongoose.Schema.Types.ObjectId,
        required: true, 
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "intrested","accpeted","rejected"],
            message : `{VALUE} is incorrect status type`,
        }
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("ConnectionRequest",connectionRequestSchema);