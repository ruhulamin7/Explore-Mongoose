const express = require('express');
const Post = require('../models/Post');
const Profile = require('../models/Profile');
const User = require('../models/User');
const userRouter = express.Router();
const ObjectId = require('mongodb').ObjectId;

// data relationships
// create user
userRouter.post('/add-user', async (req, res) => {
  try {
    console.log(req.body);
    const user = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      hobbies: req.body.hobbies,
    });
    const result = await user.save();
    res.send(result);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

// update user
userRouter.post('/profile/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const profile = new Profile({
      socialLink: req.body.socialLink,
      post: [],
      user: userId,
    });
    const result = await profile.save();
    const r = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { profile: result._id } },
      { new: true }
    );
    res.send(r);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

// add post
userRouter.post('/add-post/:profileId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const post = new Post({
      title: req.body.title,
      body: req.body.body,
      like: 23,
      profile: profileId,
    });
    const result = await post.save();
    const r = await Profile.findByIdAndUpdate(
      { _id: ObjectId(profileId) },
      { $push: { posts: result._id } },
      { new: true }
    );
    res.send(r);
  } catch (error) {
    res.send(error.message);
  }
});

// query helpers method
userRouter.get('/all-users', async (req, res) => {
  const users = await User.find({}).select('name -_id '); // only name provided and id not provided
  res.send(users);
});

// populate own nested properties
userRouter.get('/all-users-populate-own', async (req, res) => {
  const users = await User.find({}).select('location.address.state -_id');
  res.send(users);
});

// data populate to another schema
userRouter.get('/all-users-populate-profile', async (req, res) => {
  const users = await User.find({}).populate('profile');
  res.send(users);
});
// data populate to more selective way
userRouter.get('/all-users-populate', async (req, res) => {
  const users = await User.find({}).populate({
    path: 'profile',
    select: '-_id socialLink',
  });
  res.send(users);
});
// data populate to more selective way
userRouter.get('/all-users-populate-path', async (req, res) => {
  const users = await User.find({}).populate({ path: 'profile' });
  res.send(users);
});
// nested object populate to more selective way
userRouter.get('/all-users-populate-path-posts', async (req, res) => {
  const users = await User.find({}).populate({ path: 'profile' });
  // await Profile.populate(users[0].profile, {
  //   path: 'posts',
  // });
  for (let doc of users) {
    await Profile.populate(doc.profile, { path: 'posts' });
  }
  res.send(users);
});

userRouter.get('/', async (req, res) => {
  res.send('Hello User');
});
module.exports = userRouter;
