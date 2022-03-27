const mongoose = require("mongoose");

const contactFormSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  // phone:{type:Number, required:true},
  // isSeller: { type: Boolean },
  message: { type: String, },
});

const contactFormModel = mongoose.model("contactFormModel", contactFormSchema);

module.exports = contactFormModel;