(function(){

  'use strict';
  angular.module("MinifierApp").controller('MinifierController', MinifierController);
  MinifierController.$inject = ['MinifierService', '$http'];

  function MinifierController(MinifierService, $http) {
    var vm = this;

    vm.getMinifier = getMinifier;
    vm.createMinifier = createMinifier;

    function getMinifier() {
      return MinifierService.getAllMinifiedUrl().then(getAllMinifiedUrls, errorWhileRetrieving);
    }

    function getAllMinifiedUrls(response) {
      return vm.allMinifiedUrls = response;
    }

    function errorWhileRetrieving(error) {
      return console.log(error);
    }

    function createMinifier() {
      $http.post('http://localhost:3000/addUrl', vm.data).then(
          function(response){
            console.log(response);
            vm.allMinifiedUrls = response.data;
          }, function(err) {
            console.log(err);
          }
      );
      }
  }
})();