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
             return err.data;
          }
      );
    }

    function insertMinifiedUrl (formData) {
      return $http.post('http://localhost:3000/addUrl', formData).then(
          function(response){
            console.log(response);
            return response.data;
          }, function(err) {
            console.log(err);
            return err;
          }
      );
    }

    function removeMinifiedUrl(url) {
      console.log(url);
    }
  }

})();