/* ********************
 * Modules
 * ******************** */
const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/auth');

/* ********************
 * Middleware
 * ******************** */
// Run Mongoose

// Initiate App
const app = express();

/* ********************
 * Routes
 * ******************** */
app.get('/', (req, res) => {
  res.send('Running')
});


/* ********************
 * Run Server
 * ******************** */
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on ${port}`)
})