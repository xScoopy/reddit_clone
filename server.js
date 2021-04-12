// Library requirements
const express = require('express');
const exphbs = require('express-handlebars');
require('./controllers/posts.js')(app);

//app setup
const app = express()
const port = 3000

//Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//routes
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/posts/new', (req, res) => {
    res.render('posts-new')
})

//Server start
app.listen(port, () => {
    console.log(`Example app listening at port ${port}`)
})