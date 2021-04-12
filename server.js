// Library requirements
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
app.set('view engine', 'handlebars');

require('./controllers/posts.js')(app);
// Set db
require('./data/reddit-db')

app.get('/posts/new', (req, res) => {
    res.render('posts-new')
})

//Server start
app.listen(port, () => {
    console.log(`Example app listening at port ${port}`)
})