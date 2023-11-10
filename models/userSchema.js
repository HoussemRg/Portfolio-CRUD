const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName:String,
    phoneNumber:Number,
    email:String,
    message:String

  },{ timestamps: true });

  const User = mongoose.model("User", userSchema);

  module.exports = User