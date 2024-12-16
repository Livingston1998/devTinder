const mongoose  = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 40
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        immutable: true ,
        validate(value) {
           if(!validator.isEmail(value)){
            throw new Error("Please enter valid emailId");
           }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("Please enter strong password");
            }
        }
    },
    age: {
        type: Number,
        min:[18, 'Must be at least 18, got {VALUE}']
    },
    gender: {
        type: String,
        lowercase: true,
        enum: ["male", "female","others"],
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);