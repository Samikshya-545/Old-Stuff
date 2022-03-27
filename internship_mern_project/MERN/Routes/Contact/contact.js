const router = require("express").Router();
const productModel = require("../../Model/AllProduct");
const contactFormModel = require("../../Model/ContactForm");

router.post("/api/contact", async (request, response) => {
    console.log("route");
    var newContactForm = new contactFormModel({
        "name": request.body.contact_form_name,
        "email": request.body.contact_form_email,
        "phone": request.body.contact_form_phone,
        "message": request.body.contact_form_message
    });
    // newContactForm["name"] = request.body.name;
    // newContactForm["email"] = request.body.email;
    // newContactForm["phone"] = request.body.phone;
    // newContactForm["message"] = request.body.message;
    // console.log(request.body)

    try {
        await newContactForm.save();
        return response.status(200).json("Form Saved Successfully. You will be in our contact soon...")
    } catch (error) {
        return response.status(500).json(error);
    }
//   await contactFormModel
//     .find()
//     .exec()
//     .then(res => {
//       return response.status(200).json(res);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
});

module.exports = router;
