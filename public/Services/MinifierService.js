(function(){

  angular.module("MinifierApp").factory('MinifierService', MinifierService);
  MinifierService.$inject = ['$http'];

  function MinifierService ($http){
    var service = {
      getAllMinifiedUrl : getAllMinifiedUrls,
      insertMinifiedUrl : insertMinifiedUrl,
      removedMinifiedUrl : removeMinifiedUrl
    };
    return service;

    function getAllMinifiedUrls () {
      return $http.get("http://localhost:3000").then(
          function(response){
            return response.data;
          },
          function (err){
             return err;
          }
      );
    }

    function insertMinifiedUrl () {

    }

    function removeMinifiedUrl() {

    }
  }

})();