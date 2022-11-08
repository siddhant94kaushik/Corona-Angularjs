angular.module("myApp").service('empService',["$http","$log","$q","ApiConfig", function($http, $log,$q,ApiConfig){
    
    this.getProducts = function(cb){
        $http({
          method: "GET",
          url: ApiConfig.productsUrl,
        })
        .then(
            function(response){
                cb(response.data)
                $log.log("initial data", response.data)
            },
            function(response){
                $log.log("ERROR occurred")
            }
        )
      }

      this.addProduct = function(newProduct){
        var deferred = $q.defer();
        $http({
          url: ApiConfig.addProductUrl,
          method: "POST",
          data: newProduct
        })
          .success(function (data) {
            deferred.resolve(data);
          })
          .error(function (msg) {
            deferred.reject(msg);
          });
        return deferred.promise;
      }

      this.updateProduct = function(product,id){
        var deferred = $q.defer();
        $http({
          url: ApiConfig.updateProductUrl(id),
          method: "PUT",
          data: product
        })
          .success(function (data) {
            deferred.resolve(data);
          })
          .error(function (msg) {
            deferred.reject(msg);
          });
        return deferred.promise;
      }

      this.deleteProduct = function(id){
        console.log("Service ---- "+ id);
        var deferred = $q.defer();
        $http({
          url: ApiConfig.deleteProductUrl(id),
          method: "DELETE",
        })
          .success(function (data) {
            deferred.resolve(data);
          })
          .error(function (msg) {
            deferred.reject(msg);
          });
        return deferred.promise;
      }


}]);