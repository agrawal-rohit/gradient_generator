const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var gradientSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: "The gradient needs to have a name!"
  },
  creator_name: {
    type: String
  },
  color1: {
    type: String
  },
  color2: {
    type: String
  },
  upvotes: {
    type: Number
  },
  upvotedBy: [String]
});

module.exports = mongoose.model('gradient', gradientSchema);
