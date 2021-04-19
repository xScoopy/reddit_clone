// Library requirements
require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

//app setup
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(expressValidator());


//Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view sengine', 'handlebars');

require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
// Set db
require('./data/reddit-db')



//Server start
app.listen(port, () => {
    console.log(`Example app listening at port ${port}`)
})

module.exports = app;