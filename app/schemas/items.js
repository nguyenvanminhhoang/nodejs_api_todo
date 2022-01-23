const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
   name: String,
   status: String
});

module.exports = mongoose.model('item', itemSchema);
