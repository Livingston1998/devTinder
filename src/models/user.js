const mongoose  = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt  = require("bcrypt");

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

userSchema.methods.getJWT = async function () {
    const user = this; //here this is refers to userschema. even this will refer to user schema in DB as well.
     //creating a JWT token
     const token = await jwt.sign({_id: user._id},"Think@21",{ expiresIn: '1h' });

     return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHashed = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHashed);
    return isPasswordValid;
}

module.exports = mongoose.model('User', userSchema);