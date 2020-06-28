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



Router.get('/',(req,res)=>{
    res.render('login');
});

Router.post("/",(req,res,next)=>{
     let email = req.body.email;
     otp = generateOTP();

     let emailQuery = `SELECT EMAIL FROM USERS WHERE email='${email}'`;

     sql.query(emailQuery,(err,result)=>{
            if ( err ){
                console.log(err);
                res.status(400).json({
                    message : "User not Found , Bad Request"
                })
            }
            else {
               sendEmail(email,otp);
               console.log(otp);
               let otpQuery  = `INSERT INTO OTP VALUES  ('${email}' , '${otp}') ON DUPLICATE KEY UPDATE otp = ${otp}`;
               
               sql.query(otpQuery,(err,result)=>{
                    if(err)
                        console.log(err);
               })
               console.log('OTP Sent')
               res.status(200).redirect('/otp');
            }
     });

});



module.exports  = Router;
