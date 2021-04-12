const Post = require('../models/post');

module.exports = app => {
    app.post("/posts/new", (req, res) => {
        console.log(req.body);
    })
}