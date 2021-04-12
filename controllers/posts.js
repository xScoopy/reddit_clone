const Post = require('../models/post');

module.exports = app => {
    app.post("/posts/new", (req, res) => {
        const post = new Post(req.body);
        
        //Save instance of post model to db
        post.save((err, post) => {
            //redirect to root
            return res.redirect('/');
        })
    });
    app.get('/', (req, res) => {
        Post.find({}).lean()
        .then(posts => {
          res.render('posts-index', { posts });
        })
        .catch(err => {
          console.log(err.message);
        })
    })
};
