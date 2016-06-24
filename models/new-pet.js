var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// creating your petSchema with the properties you want, letting MongoDB create unique _id for each pet
var petSchema = new Schema ({
  name: String,
  animalType: String,
  age: Number,
  imageURL: String
}); // end petSchema

var Pet = mongoose.model('pets', petSchema); // Pet is model name, pets is collection of docs in petdb. .model() method creates copy of petSchema and stores in var Pet as a new model of petSchema
