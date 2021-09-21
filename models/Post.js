const { Schema, Types, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
  text: {
    type: String,
    required: 'You need to leave an post!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  user_id: {
    type: Types.ObjectId,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Post = model('Post', postSchema);

module.exports = Post;
