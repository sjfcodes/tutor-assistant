const db = require('../config/connection');
const { User, Post } = require('../models');
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');

db.once('open', async () => {
  try {
    await Post.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < postSeeds.length; i++) {
      const user = await User.find({ username: postSeeds[i].username })
      const post = {
        user_id: user[0]._id,
        username: user[0].username,
        text: postSeeds[i].text
      }
      const { _id } = await Post.create(post);

      await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { posts: _id } }
      );
    }
    const allUsers = await User.find({})
    console.log(allUsers)

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
