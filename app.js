/* ********************
 * Modules
 * ******************** */
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const keys = require('./config/keys');

// Load Models
require('./models/User')
require('./models/Story')

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

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Handlebars Helper
const {
  truncate,
  stripTags,
  formatDate
} = require('./helpers/hbs');

// View Engine
app.engine('handlebars', exphbs({
  helpers: {
    truncate: truncate,
    stripTags: stripTags,
    formatDate, formatDate
  },
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Run Mongoose
mongoose.connect(keys.mongoURI)
  .then(() => console.log('running on mongo'))
  .catch(err => console.log(err))

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