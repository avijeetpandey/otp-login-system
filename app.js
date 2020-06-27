require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app  = express();

const PORT = process.env.PORT || 3000 ; 

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');


// middlewares 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use('/register',registerRoute);
app.use('/login',loginRoute);

app.listen(PORT,()=>{
    console.log(`Server is up and running on PORT : ${PORT}`)
});


