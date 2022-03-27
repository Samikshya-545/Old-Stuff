const userModel = require("../../Model/User");
const Bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const express  = require("express");
const Formidable = require("formidable");

const router = express.Router();


//======================================================USER AUTH==========================================//
router.post("/api/user-register", (request, response) => {
  const form = new Formidable.IncomingForm();
  form.parse(request, async (error, fields, files) => {
    const { email, password, name, verifiedPassword} = fields;

    try {
      if (!email || !password || !name || !verifiedPassword ) {
        
        return response
          .status(400)
          .json({ msg: "All fields have to be entered" });
      }

      if (password.length < 5) {
        return response
          .status(400)
          .json({ msg: "password has to be at least 5 character long" });
      }

      if (password !== verifiedPassword) {
        return response.status(400).json({ msg: "Password have to match" });
      }

      const user = await userModel.findOne({ email: email });
      if (user) {
        return response
          .status(400)
          .json({ msg: "User with this email already exits" });
      }

      const salt = await Bcrypt.genSalt(15);
      const hashedPassword = await Bcrypt.hash(password, salt);

      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        // phone,
        // isSeller,
      });

      const savedUser = await newUser.save();

      const token = JWT.sign({ id: savedUser._id }, process.env.jwt_secret);
      return response.status(201).json({
        msg: "Account successfully created",
        token: token,
        name: savedUser.name,
        email: savedUser.email,
      });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ msg: "Server is currently down please try again later" });
    }
  });
});




router.post("/api/user-login", async (request, response) => {
  var email = request.body.email;
  var password = request.body.password;
  try {
    if (!email || !password) {
      return response
        .status(400)
        .json({ msg: "All fields have to be entered" });
    }

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return response
        .status(400)
        .json({ msg: "User with this Email does not exists" });
    }
     
    const isPasswordMatch = await Bcrypt.compare(password, user.password);
    console.log(isPasswordMatch);

    if(!isPasswordMatch){
        return response.status(400).json({msg:'Invalid Creentials'})
    }

    const token = JWT.sign({id:user._id}, process.env.jwt_secret)
    return response.status(200).json({
      msg: "Logging You In...",
      token: token,
      name: user.name,
      email: user.email,
      sales: user.sales,
      message: user.message
    });


  } catch (error) {
    return response
      .status(500)
      .json({ msg: "Server is currently down please try again later" });
  }
  // const form = new Formidable.IncomingForm();
  // form.parse(request, async (error, fields, files) => {
  //   const { email, password } = fields;

    
  // });
});



module.exports = router;