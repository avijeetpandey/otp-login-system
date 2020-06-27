const Router = require('express').Router();
const users = require('../model/user');
const {createSecurePassword } = require('../model/user');
const sql = require('../config/db');


require('dotenv').config();


Router.post("/",(req,res)=>{
    
     let username = req.body.username;
     let  password = req.body.password;
     let hashedPassword  = createSecurePassword(password ,"1100");
     let email = req.body.email;
     let phone = req.body.phone;

     let q = `INSERT INTO USERS VALUES( '${username}' , '${email}' , '${hashedPassword}' , '${phone}' )`;

     sql.query(q,(err,result)=>{
          if (err) {
               console.log(err.code + " user alreeady exists please use other credentials");
               res.status(400).json({
                    message : err.code + " user alreeady exists please use other credentials"
               });
          }
          else {
                console.log('User Registered');
                res.status(200).json({
                    message : `User ${username} registered succesfully`,
               });
          }
     });

});




module.exports = Router; 