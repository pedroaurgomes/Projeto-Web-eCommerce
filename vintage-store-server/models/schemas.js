const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  brand: String,
  price: Number,
  description: String,
  colors: [String],
  defaultColor: Number,
  imgSrc: String,
  imgB64: String,
  longDescription: String,
  nSold: Number,
  nInStock: Number,
});

module.exports.Product = mongoose.model("Product", productSchema);

const userSchema = new mongoose.Schema({
  id: String,
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
