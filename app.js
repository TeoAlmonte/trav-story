/* ********************
 * Modules
 * ******************** */
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const keys = require('./config/keys');
const path = require('path');

const auth = require('./routes/auth');
const index = require('./routes/index');
const stories = require('./routes/stories');

/* ********************
 * Middleware
 * ******************** */
// Initiate App
const app = express();

// Public Folder
app.use(express.static(path.join(__dirname, 'public')))

// View Engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

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

// Static Path
app.use(express.static(path.join(__dirname, 'public')))

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
app.use('/', index)
app.use('/auth', auth)
app.use('/stories', stories)

/* ********************
 * Run Server
 * ******************** */
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on ${port}`)
})