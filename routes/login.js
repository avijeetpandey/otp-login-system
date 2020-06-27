const Router = require('express').Router();
const users = require('../model/user');
const {createSecurePassword } = require('../model/user');
const {sendEmail} = require('../config/mail');
const sql = require('../config/db');


require('dotenv').config();

const generateOTP = ( ) => {
    //always generate 6 digit otp
    return Math.floor(100000 + Math.random() * 900000) ;
}

Router.post("/",(req,res)=>{
     let email = req.body.email;
     let otp = generateOTP();

     let emailQuery = `SELECT EMAIL FROM USERS WHERE email='${email}'`;

     sql.query(emailQuery,(err,result)=>{
            if ( err ){
                console.log(err);
                res.status(400).json({
                    message : "User not Found , Bad Request"
                })
            }
            else {
                console.log(result);
               sendEmail(email,otp);
               res.status(200).json({
                message : "OTP sent "
            })
            }

            
     });

});



module.exports = Router; 