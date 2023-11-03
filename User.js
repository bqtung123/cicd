const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: String },
  email: { type: String },
  interests: { type: String }
});


module.exports = mongoose.model('User', User);