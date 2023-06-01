const express = require("express");
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config();

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const passport = require("passport");
require('./passport');

const app = express();

app.use(cors());

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(express.static("build"));

const auth = require('./routes/auth');
app.use('/login', auth);

const favicon = require("./routes/favicon")
app.use('/favicon.ico', favicon);

const readForm = require("./routes/readForm")
app.use('/readForm', passport.authenticate('jwt', { session: false }), readForm);

const saveForm = require("./routes/saveForm")
app.use('/saveForm', passport.authenticate('jwt', { session: false }), saveForm);

const submitForm = require("./routes/submitForm")
app.use('/submitForm', passport.authenticate('jwt', { session: false }), submitForm);

const logout = require("./routes/logout")
app.use('/logout', logout);

const addUser = require("./routes/addUser")
app.use('/addUser', addUser);

const test = require("./routes/test")
app.use('/test', test);

const user = require("./routes/user")
app.use('/user', user);

const general = require("./routes/general")
app.use('*', general);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
