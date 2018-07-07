const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
   name: {
      type: String,
      required: true,
   },
   data: {
      type: Date,
      default: Date.now(),
   }
});

module.exports = mongoose.model('Item', Item);