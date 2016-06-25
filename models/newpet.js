var mongoose = require('mongoose');
var Schema = mongoose.Schema; // enable use of schema property

// create petSchema with chosen fields and data type, let MongoDB handle generating _id for each instance
var petSchema = new Schema ({
  name: {type: String, required: true},
  animal_type: {type: String, required: true},
  age: {type: Number, required: true},
  image_url: {type: String, required: true} // or should it be image_url: {data: Buffer, contentType: String, required: true} ????
}); // end petSchema

var Pet = mongoose.model('pets', petSchema); // creates model from petSchema called Pet, and stores in pets 'collection' of docs within petsdb

module.exports = Pet;
