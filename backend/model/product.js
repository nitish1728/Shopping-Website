const mongoose = require('mongoose');
const Schema=mongoose.Schema
const productSchema = new Schema(
{
  id:{
    type: String
  },
  title:{
    type: String
  },
  price:{
    type: Number
  },
  description:{
    type: String
  },
  category:{
    type: String
  },
  stock:{
    type:Number
  },
  sold:{
    type:Number,
    default:0
  },
  image:{
    type: String,
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