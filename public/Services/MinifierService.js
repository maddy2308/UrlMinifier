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
      //return [{
      //  OriginalUrl: 'www.google.com',
      //  MinifiedUrl: 'gogl',
      //  CreatedBy: "Madhur Mehta",
      //  CreatedOn: new Date()
      //}];
      return $http.get("http://localhost:3000").then(
          function(response){
            return response.data;
          },
          function (err){
             return err.data;
          }
      );
    }

    function insertMinifiedUrl () {

    }

    function removeMinifiedUrl() {

    }
  }

})();