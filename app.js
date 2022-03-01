const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv/config')
const cors = require('cors')
const db = "mongodb+srv://we2you:we2you@cluster0.iae9u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//const authjwt = require('./helpers/jwt');
//const errorHandler = require('./helpers/error-handler')

const api = process.env.API_URL;

//app.use(express.json());
app.use(bodyparser.json());
app.use(morgan('dev'));
//app.use(authjwt());
//app.use(errorHandler);

//router
const Productsrouter = require('./routes/products');
const CategoryList = require('./routes/categorys');
const UserLogins = require('./routes/user');
const Order = require('./routes/order');

app.use(`${api}/products`,Productsrouter);
app.use(`${api}/category`,CategoryList);
app.use(`${api}/users`,UserLogins);
app.use(`${api}/order`,Order);


//cors

app.use(cors());
app.options('*', cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//database connection
mongoose.connect(db, err => {
    if(err){
      console.log("fail" +err)
    }
    else{
      console.log(" DB CONNETION  success port" )
    }
    })


    app.get("/", (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*")
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Max-Age", "1800");
      res.setHeader("Access-Control-Allow-Headers", "content-type");
      res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
       });
// app.get('/',(req,res)=>{
//     res.status(200).send('hello i am ')
// })

app.listen(3000,()=>{
    console.log(api)
    console.log('hello i am server')
})