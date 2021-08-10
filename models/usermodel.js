const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User must have a email"],
    },
    email: {
        type: String,
        required: [true, "User must have a email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email!"],
    },
    photo: String,
    password: {
        type: String,
        required: [true, "Please enter a password!"],
        minLenght: [8, "Password lenght must be 8!"],
        select: false,
    },
    confirmPassowrd: {
        type: String,
        required: [true, "Please confirm password!"],
        validate: {
            //this only work on CREATE/SAVE!!
            validator: function (el) {
                return el === this.password;
            },
            message: "Passowrds do not match!",
        },
    },
});

userSchema.pre("save", async function (next) {
    //only runs if pass is modified

    if (!this.isModified("password")) return next();

    //hash the pass with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    //delete passwordConfirm
    this.confirmPassowrd = undefined;

    next();
});

userSchema.methods.correctPassowrd = async function (
    candidatePassword,
    userPasswor
) {
    return await bcrypt.compare(candidatePassword, userPasswor);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
