var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var connectToDB = mongoose.connect('localhost:/27017/petsdb').connection; // 27017 is default mongo port, followed by chosen db name
var Pet = require('../models/newpet'); // require model file that creates petSchema

// middleware
var urlencodedParser = bodyParser.urlencoded({extended:false}); // required in order to POST (app.post)
app.use(bodyParser.json()); // parse text as JSON to req.body

// test db connection
connectToDB.on('error', function (err) { // when connection errors out
    console.log('mongodb connection error:', err);
});
connectToDB.once('open', function () { // when able to connect to db
  console.log('mongodb connection open!');
});

// spin up server
app.listen(3000, 'localhost', function (req, res) {
  console.log('Now serving 3000');
});

// make public folder static
app.use(express.static('public'));

// base URL; console logs to Atom terminal since coming from server side
app.get('/', function (req, res) {
  console.log('in base URL');
  res.sendFile(path.resolve('views/index.html')); // gets this path and sends to base URL as response
});

// get all pets in petsdb
app.get('/getPets', function(req, res){
  Pet.find() //
  .then(function(data){
    res.send(data);
  });
}); // end '/getPets' app.get

// dummy route - 'hard coded' Calvin to test
// app.get('/calvin', function(req, res) {
//   var calvin = new Pet({
//     name: 'Calvin',
//     animal_type: 'dog',
//     age: 8,
//     image_url:
//   });
//
//   calvin.save(function(err) {
//     if(err){
//       console.log(err);
//       res.sendStatus(500);
//     }else{
//       console.log('Pet saved successfully!');
//       res.sendStatus(200);
//     }
//   });
// }); // end Calvin get route

// create post route to petsdb
app.post('/postPet', function(req, res) {
  console.log('pet posted successfully');
  console.log('req.body = ', req.body);

// creates object to store in petsdb using object received by server, property names need to match those in model schema
  var newPet = new Pet({ // create new Pet to create new instance of Pet model in petsdb, using the following values
    name: req.body.name,
    animal_type: req.body.species,
    age: req.body.age,
    image_url: req.body.image
  });

// saves object to db. .save is a method specific to Mongoose
  newPet.save(function(err) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      console.log('Pet saved successfully!');
      res.sendStatus(200);
    }
  });
});
