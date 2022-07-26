const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    body: { type: String, trim: true },
    like: Number,
    profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
