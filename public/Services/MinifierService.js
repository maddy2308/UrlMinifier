(function(){

  angular.module("MinifierApp").factory('MinifierService', MinifierService);
  MinifierService.$inject = ['$http'];

  function MinifierService ($http){
    var service = {
      getAllMinifiedUrl : getAllMinifiedUrls,
      insertMinifiedUrl : insertMinifiedUrl,
      removedMinifiedUrl : removeMinifiedUrl
    };
    var baseUrl = "http://localhost:3000";

    return service;

    function getAllMinifiedUrls () {
      return $http.get(baseUrl).then(
          function(response){
            return response.data;
          },
          function (err){
             return err.data;
          }
      );
    }

    function insertMinifiedUrl (formData) {
      return $http.post(baseUrl + '/addUrl', formData).then(
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
      var id = url._id;
      return $http.delete(baseUrl + "/removeUrl/" + id).success(function(response){
        console.log(response);
        return response;
      }).error(function(err) {
        console.log(err);
        return err;
      });
    }
  }

})();