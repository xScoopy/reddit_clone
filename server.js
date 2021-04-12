// Library requirements
const express = require('express');
const exphbs = require('express-handlebars');

//app setup
const app = express()
const port = 3000

//Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})


//Server start
app.listen(port, () => {
    console.log(`Example app listening at port ${port}`)
})