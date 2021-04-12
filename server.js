// Library requirements
const express = require('express')

//app setup
const app = express()
const port = 3000

//Middleware



//routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})


//Server start
app.listen(port, () => {
    console.log(`Example app listening at port ${port}`)
})