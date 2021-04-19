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
  });
  app.get('/posts/new', (req, res) => {
    res.render('posts-new')
  });
  app.get("/posts/:id", function (req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id).lean().populate('comments').then((post) => {
      res.render('posts-show', { post })
    }).catch((err) => {
      console.log(err.message)
    })
  });
  app.get("/n/:subreddit", function (req, res) {
    Post.find({ subreddit: req.params.subreddit }).lean()
      .then(posts => {
        res.render("posts-index", { posts });
      })
      .catch(err => {
        console.log(err)
      });
  });

};
