/* ********************
 * Modules
 * ******************** */
const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/auth');
const passport = require('passport')
const keys = require('./config/keys')
const cookieParser = require('cookie-parser')
const session = require('express-session')

/* ********************
 * Middleware
 * ******************** */
// Initiate App
const app = express();

// Run Mongoose
mongoose.connect(keys.mongoURI)
  .then(() => console.log('running on mongo'))
  .catch(err => console.log(err))

// User Model
require('./models/User')

// Cookies
app.use(cookieParser())

// Sessions
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))

// Passport
require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.user = req.user || null
  next()
})

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