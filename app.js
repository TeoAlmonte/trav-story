/* ********************
 * Modules
 * ******************** */
const express = require('express')
const mongoose = require('mongoose')

/* ********************
 * Middleware
 * ******************** */
// Run Mongoose
mongoose.connect('mongodb://admin:pass@ds233218.mlab.com:33218/storybook');
// Initiate App
const app = express();

/* ********************
 * Routes
 * ******************** */
app.get('/', (req, res) => {
  res.send('Running')
})

/* ********************
 * Run Server
 * ******************** */
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on ${port}`)
})