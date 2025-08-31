const mongoose = require('mongoose');
const Schema=mongoose.Schema
const productSchema = new Schema(
{
  id:{
    type: String,
    required:true,
    unique:true
  },
  title:{
    type: String,
    required:true
  },
  price:{
    type: Number,
    required:true
  },
  description:{
    type: String,
    required:true
  },
  category:{
    type: String,
    required:true
  },
  stock:{
    type:Number,
    required:true
  },
  sold:{
    type:Number,
    default:0
  },
  image:{
    type: String,
    required:true
  },
  imageId:{
    type: String,
  },
  rating: {
    rate: Number,
    count: Number
  },
  isFavourites: { 
    type: Boolean, 
    default: false 
  },
  isInCart: { 
    type: Boolean, 
    default: false 
  }
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;