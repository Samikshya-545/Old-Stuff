const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // phone:{type:Number, required:true},
  // isSeller: { type: Boolean },
  sales: { type: Array, default: [] },
  message: { type: Array, default: [] },
});

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;