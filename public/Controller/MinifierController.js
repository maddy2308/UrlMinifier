(function(){

  'use strict';
  angular.module("MinifierApp").controller('MinifierController', MinifierController);
  MinifierController.$inject = ['MinifierService', '$http'];

  function MinifierController(MinifierService, $http) {
    var vm = this;

    vm.getMinifier = getMinifier;
    vm.createMinifier = createMinifier;
    vm.removeMinifier = removeMinifier;

    activate();

    function activate() {
      getMinifier();
      clearFormFields();
    }

    function getMinifier() {
      MinifierService.getAllMinifiedUrl().then(allMinifiedUrls, errorWhileRetrieving);
    }

    function createMinifier() {
      MinifierService.insertMinifiedUrl(vm.data).then(allMinifiedUrls, errorWhileRetrieving);
    }

    function removeMinifier(url) {
      MinifierService.removedMinifiedUrl(url).then(function(response) {
        vm.allMinifiedUrls = response.data;
        clearFormFields();
      }, errorWhileRetrieving);
    }

    function allMinifiedUrls(response) {
      vm.allMinifiedUrls = response;
      clearFormFields();
    }

    function errorWhileRetrieving(error) {
      console.log(error);
    }

    function clearFormFields() {
      vm.data = {};
    }
  }
})();