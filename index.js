const express = require('express');
const dbConnect = require('./db');
const User = require('./models/User');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const PORT = 3030;

app.use(express.json());

// get all data from users collection
app.get('/get-all', async (req, res) => {
  const result = await User.find({});
  res.send(result);
});

// statics methods
app.get('/statics', async (req, res) => {
  const result = await User.getAll(1);
  res.send(result);
});

// query methods
app.get('/query', async (req, res) => {
  const result = await User.find().searchByName('m');
  res.send(result);
});

// callback function for getting results
app.post('/users-cb', async (req, res) => {
  const users = new userSchema(req.body);
  await users.save((err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});
// async function for getting the results
app.post('/users-async', async (req, res) => {
  try {
    const users = new userSchema(req.body);
    const result = await users.save();
    res.status(200).send(result);
  } catch (error) {
    res.send(error);
  }
});

// initial screen message
app.get('/', (req, res) => {
  res.send(`<h1>Welcome!</h1>`);
});
// server listener
app.listen(PORT, () => {
  dbConnect().catch((err) => console.dir(err.message));
  console.log(`Server listening at http://localhost:${PORT}`);
});
