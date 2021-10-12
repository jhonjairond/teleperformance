
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
myConnection = require('express-myconnection');
require('dotenv').config()

const app = express();

// connection to MySQL database
app.use(myConnection(mysql, {
  host: process.env.MySQL_HOST,
  user: process.env.MySQL_USER,
  password: process.env.MySQL_PASSWORD,
  port: process.env.MySQL_PORT,
  database: process.env.MySQL_DATABASE
}, 'single'));


// connection to mongodb
mongoose.connect(process.env.MONGODB_HOST, {
})
  .then(db => console.log('mongoDb conected'))
  .catch(err => console.log('err'));


// importing routes for mongodb
const indexRoutes = require('./routes/index');
// importing routes for mysql
const mysqlRoutes = require('./routes/msqlIndex');


// settings
app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))

// routes for mongodb
app.use('/', indexRoutes);
//route for mysql
app.use('/', mysqlRoutes);


app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});




