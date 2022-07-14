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

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  extra: String,
  password: String,
  type: String,
});

module.exports.User = mongoose.model("User", userSchema);