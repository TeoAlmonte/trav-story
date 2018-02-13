/* ********************
 * Modules
 * ******************** */
const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/auth');
const passport = require('passport')

/* ********************
 * Middleware
 * ******************** */
// Run Mongoose

// Passport
require('./config/passport')(passport)

// Initiate App
const app = express();

/* ********************
 * Routes
 * ******************** */
app.get('/', (req, res) => {
  res.send('Running')
});

app.use('/auth', auth)

/* ********************
 * Run Server
 * ******************** */
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on ${port}`)
})