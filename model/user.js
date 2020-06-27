const crypto = require('crypto');
const sql = require('../config/db');


// function to create secured hashed passeord 
let createSecurePassword = (password , salt ) =>{
    if(!password) return "";
    try{
    return crypto.createHmac('sha256',salt).
                  update(password).
                  digest("hex");
    }catch(error){
        return "";
    }
}



module.exports = {
    createSecurePassword : createSecurePassword
};
