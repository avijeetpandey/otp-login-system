require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 3000;

const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const validateOTP =require('./routes/otp');

// middlewares
app.use(bodyParser.json());
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.render('register');
})
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use('/otp',validateOTP);
app.listen(PORT, () => {
  console.log(`Server is up and running on PORT : ${PORT}`);
});
