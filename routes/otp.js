const Router = require('express').Router();
const sql = require('../config/db');


Router.get('/',(req,res)=>{
  res.render('otp')
})

Router.post("/",(req,res)=>{
    let email = req.body.email;
    let otp = req.body.otp;

   let searchQuery = `SELECT * FROM OTP WHERE EMAIL='${email}'`;

   sql.query(searchQuery,(err,result) =>{
     if ( err ) 
      console.log(err);
    else {
      if(result[0].otp==otp){
        res.status(200).render('welcome');
      }else{
        res.status(400).json({
          message : 'bad Request'
        })
      }
    }
   });

});

module.exports = Router;