const Router = require('express').Router();
const users = require('../model/user');
const {createSecurePassword } = require('../model/user');
const sql = require('../config/db');


require('dotenv').config();


Router.post("/",(req,res)=>{
     let hashedPassword  = createSecurePassword(password ,"1100");
     let email = req.body.email;

     let q = `INSERT INTO USERS VALUES( '${username}' , '${email}' , '${hashedPassword}' , '${phone}' )`;

     sql.query(q,(err,result)=>{
          if (err) {
               console.log('User Already Exists');
               res.status(400).json({
                    message : "User already Exists"
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