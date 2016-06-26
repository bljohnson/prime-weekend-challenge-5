console.log( 'script.js sourced in' );

// create AngularJS module
var petApp = angular.module('petApp',['ui.bootstrap']);

// create a controller to define petApp's behavior
petApp.controller('PetController', ['$scope', '$http', function($scope, $http) {
  // code that gets executed when this controller is called
  $scope.addPet = function () { // define function that will create object from user input and send to petsdb
    event.preventDefault();
    // get the user input and store in an object to send to server, property names we assign, object put on body of req
    var objectToSendToDb = {
      name: $scope.nameIn,
      species: $scope.speciesIn,
      age: $scope.ageIn,
      image: $scope.imageIn
    };
    // make a call to server with object to be stored in db
    $http({
      method: 'POST',
      url: '/postPet',
      data: objectToSendToDb
    });
    // clear input fields on DOM
    $scope.nameIn ='';
    $scope.speciesIn ='';
    $scope.ageIn ='';
    $scope.imageIn ='';
  }; // end addPet function

  $scope.getPets = function () { // define function that will get pets currently in petsdb via HTTP call
     $http({
       method: 'GET',
       url: '/getPets'
     }).then(function(response){
       $scope.allPets = response.data; // .data is the data in the reponse; allPets is the array of objects in petsdb
       console.log($scope.allPets);
     }), function myError(response){
       console.log(response.statusText);
     }; // end myError function
   }; // end getPets function
}]); // end PetController

petApp.controller('TabsController', function ($scope, $window) {
  $scope.tabs = [
    { title:'Add Pet', content: 'partials/addPet.html'},
    { title:'View Pets', content: 'partials/viewPets.html' }
  ];
});
