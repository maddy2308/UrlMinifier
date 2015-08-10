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
      formData.CreatedOn = new Date();
      return $http.post(baseUrl + '/addUrl', formData).then(
          function(response){
            if(response.data == "ERR:1001"){
              swal("Oops...", "Someone has already used that URL. Try another", "error");
              return getAllMinifiedUrls();
            }
            return response.data;
          }, function(err) {
            return err;
          }
      );
    }

    function removeMinifiedUrl(url) {
      var id = url._id;
      return $http.delete(baseUrl + "/removeUrl/" + id).success(function(response){
        return response;
      }).error(function(err) {
        return err;
      });
    }
  }

})();