const router = require("express").Router();
const { User, Post } = require("../models");
const { signToken } = require('../utils/auth');


router.post("/", async ({ body }, res) => {
    const user = await User.create(body);
    const token = signToken(user);
    res.json({ token, user });
});

router.post("/login", async ({ body }, res) => {
    const user = await User.findOne({ email: body.email });
    if (!user) return res.status(401).json('No user found with this email address');

    const correctPw = await user.isCorrectPassword(body.password);
    if (!correctPw) return res.status(401).json('Incorrect credentials');

    const token = signToken(user);
    res.json({ token, user });
});

router.post("/post", async ({ body }, res) => {

    const post = await Post.create(body);
    // addPost to user
    const user = await User.findOneAndUpdate({ _id: body.user_id }, { $addToSet: { posts: post } });
    if (!user) return res.status(401).json('No user found with this email address');

    if (!post) return res.status(500).json('oops')
    res.json('ok')
})

module.exports = router;