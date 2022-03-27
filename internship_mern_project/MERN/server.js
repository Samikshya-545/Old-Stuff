const express = require ("express");
const cors = require ("cors");
const mongoose = require ("mongoose");
require("dotenv").config();
const app = express();


//========================================================MIDDLEWARE=======================================//
app.use(cors()); 

//===================================MONGODB CONFIGS AND CONNECTION==================================//
const mongoURI  = process.env.mongoURI;
const mongoEssentials = {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true };
 mongoose.connect(mongoURI,mongoEssentials, (error) => {
     if(error){
         return  console.log(error);
         }
     return console.log("Connection to Mongodb is successfull");     
 });

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//===============================================ROUTES ENTRY POINT==============================================//
app.use(require("./Routes/Auth/Auth"));
app.use(require("./Routes/Upload/Upload"));
app.use(require("./Routes/Fetch/Fetch"));
app.use(require("./Routes/Contact/contact"));

//============================================SERVER CONFIGS AND CONNECTION========================================//
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})