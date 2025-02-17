const validator = require("validator");

const signupValidation = (req) => {
    const {firstName,lastName,emailId,password} = req.body;

    if(!firstName || !lastName) {
        throw new Error("Please Enter firstName and lastName");
    } else if(!validator.isEmail(emailId)){
        throw new Error("Please enter valid emailId");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter strong password. Password should contain minLength: 8, atleast 1 Lowercase, atleast 1 Uppercase, atleast 1 Numbers, atleast 1 Symbols")
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = ["age","gender","about","photoUrl","skills"];
    const isEditAllowed = Object.keys(req.body).every((key) => allowedEditFields.includes(key));
    return isEditAllowed;
}


module.exports = {signupValidation,validateEditProfileData}

