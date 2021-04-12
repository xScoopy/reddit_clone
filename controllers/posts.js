module.exports = app => {
    app.post("/posts/new", (req, res) => {
        console.log(req.body);
    })
}