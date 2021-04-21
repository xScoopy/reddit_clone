const Post = require('../models/post');
const User = require('../models/user');

module.exports = app => {
  //POST REQUESTS
  app.post("/posts/new", (req, res) => {
    if (req.user) {
      const post = new Post(req.body);
      post.author = req.user._id;
      post
        .save()
        .then(post => {
            return User.findById(req.user._id);
        })
        .then(user => {
            user.posts.unshift(post);
            user.save();
            // REDIRECT TO THE NEW POST
            res.redirect(`/posts/${post._id}`);
        })
        .catch(err => {
            console.log(err.message);
        });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });
 
  app.get('/', (req, res) => {
    let currentUser = req.user;
    console.log(req.cookies);
    Post.find({}).lean().populate('author')
      .then(posts => {
        res.render('posts-index', { posts, currentUser});
      })
      .catch(err => {
        console.log(err.message);
      })
  });

  app.get('/posts/new', (req, res) => {
    if (req.user) {
      let currentUser = req.user
      res.render('posts-new', {currentUser})
    } else {
      res.render('login');
    }
  });

  app.get("/posts/:id", function (req, res) {
    // LOOK UP THE POST
    let currentUser = req.user
    Post.findById(req.params.id).lean().populate({path:'comments', populate: {path: 'author'}}).populate('author').then((post) => {
      res.render('posts-show', { post, currentUser })
    }).catch((err) => {
      console.log(err.message)
    })
  });

  app.get("/n/:subreddit", function (req, res) {
    let currentUser = req.user
    Post.find({ subreddit: req.params.subreddit }).lean().populate('author')
      .then(posts => {
        res.render("posts-index", { posts, currentUser});
      })
      .catch(err => {
        console.log(err)
      });
  });

};
