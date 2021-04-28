// Library requirements
require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

//app setup
let cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express()
const port = 3000
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(expressValidator());

var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
      req.user = null;
    } else {
      var token = req.cookies.nToken;
      var decodedToken = jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
    }
    console.log(req.user)
    next();
  };
app.use(checkAuth);

//Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/replies.js')(app);
// Set db
require('./data/reddit-db')



//Server start
app.listen(port, () => {
    console.log(`Example app listening at port ${port}`)
})

module.exports = app;