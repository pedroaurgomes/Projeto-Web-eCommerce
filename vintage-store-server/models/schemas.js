const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  brand: String,
  price: Number,
  description: String,
  colors: [String],
  defaultColor: Number,
  imgSrc: String,
  longDescription: String,
  nSold: Number,
  nInStock: Number,
});

module.exports.Product = mongoose.model("Product", productSchema);