(function(){

  'use strict';
  angular.module("MinifierApp").controller('MinifierController', MinifierController);
  MinifierController.$inject = ['MinifierService', '$http'];

  function MinifierController(MinifierService, $http) {
    var vm = this;

    vm.getMinifier = getMinifier;
    vm.createMinifier = createMinifier;
    vm.removeMinifier = removeMinifier;
    vm.CreatedOn = new Date();

    activate();

    function activate() {
      getMinifier();
      clearFormFields();
    }

    function getMinifier() {
      return MinifierService.getAllMinifiedUrl().then(allMinifiedUrls, errorWhileRetrieving);
    }

    function createMinifier() {
      return MinifierService.insertMinifiedUrl(vm.data).then(allMinifiedUrls, errorWhileRetrieving);
    }

    function removeMinifier(url) {
      return MinifierService.removedMinifiedUrl(url).then(allMinifiedUrls, errorWhileRetrieving);
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