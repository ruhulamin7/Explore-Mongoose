const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 1,
      maxLength: 20,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            value
          );
        },
      },
    },
    age: { type: Number, trim: true },
    birthDate: { type: Date, trim: true },
    gender: { type: String, trim: true, enum: ['male', 'female'] },
    hobbies: [String],
  },
  { timestamps: true }
);

// ================== custom methods ====================
// instance methods
userSchema.methods = {
  getAll: function (n) {
    return mongoose.model('User').find({}).limit(n);
  },
};
// statics methods
userSchema.statics = {
  getAll: function (n) {
    return mongoose.model('User').find({}).limit(n);
  },
};
// query methods
userSchema.query = {
  searchByName: function (nameString) {
    return this.where({ name: new RegExp(nameString, 'ig') });
  },
};

module.exports = mongoose.model('User', userSchema);
// module.exports = User;
