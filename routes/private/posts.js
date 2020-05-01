var postRouter = require("express").Router();
var user = require('../../models/users');
var jwt = require('jsonwebtoken')
const auth = require('./Auth');

postRouter.post('/posts', auth, (req, res, next) => {
    var postString = req.body.posts;
    token = req.header('auth-token');
    var id = jwt.decode(token)._id
    user.findById(id, (err, docs) => {
        if (err) {
            res.status(401).send('there was a problem parsing')
        } else {
            user.findByIdAndUpdate(id, {
                posts: postString
            }, (err, result) => res.send(result));
        }
    });

})
module.exports = postRouter;