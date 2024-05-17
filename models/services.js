  // category.js

  const mongoose = require('mongoose');
  const { v4: uuidv4 } = require('uuid');

const categorySchema = new mongoose.Schema({
    id: { type: String ,  default: uuidv4},
    title: {
      type: String,
      required: true
    },
    shortdescription: {
      type: String,
      required: true
    },
      slug:{
      type:String,
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }, { collection: 'category' }); // Specify the collection name as 'category'

  module.exports = mongoose.model('services', categorySchema); // Export the model as 'Category'
