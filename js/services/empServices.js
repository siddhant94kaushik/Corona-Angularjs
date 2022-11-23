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

// ..........................................................................

      this.getOdata = function(){
        var deferred = $q.defer();
        $http({
          method: "GET",
          url: ApiConfig.OdataUrl,
          cache: true,
        })
          .success(function (data) {
            deferred.resolve(data);
          })
          .error(function (msg) {
            deferred.reject(msg);
          });
        return deferred.promise;
  
      }

      this.postOdata = function(addOdata){
        var deferred = $q.defer();
        console.log({...addOdata,"odata.type":"ODataDemo.Product"})
        $http({
          method: "POST",
          url: "https://services.odata.org/V3/(S(qzuttktpdu4t4ahxu22biwzo))/OData/OData.svc/Products",
          data: {...addOdata,"odata.type":"ODataDemo.Product"}
        })
          .success(function (data) {
            deferred.resolve(data);
          })
          .error(function (msg) {
            deferred.reject(msg);
          });
        return deferred.promise;
  
      }

// ...............
      this.putOdata = function(){
        var deferred = $q.defer();
        $http({
          method: "PUT",
          url: ApiConfig.OdataUrl,
          cache: true,
        })
          .success(function (data) {
            deferred.resolve(data);
          })
          .error(function (msg) {
            deferred.reject(msg);
          });
        return deferred.promise;
  
      }

      this.deleteOdata = function(id){
        console.log("Odata ---- "+ id);
        var deferred = $q.defer();
        $http({
          method: "DELETE",
          url: "https://services.odata.org/V3/(S(qzuttktpdu4t4ahxu22biwzo))/OData/OData.svc/Products("+id+")?$format=json",
          // url: ApiConfig.deleteOdataUrl(id),
          
        })
          .success(function (data) {
            deferred.resolve(data);
          })
          .error(function (msg) {
            deferred.reject(msg);
          });
        return deferred.promise;
  
      }


// filters......

this.getFilterRatings = function(rating){
    
  var deferred = $q.defer();
  $http({
    method: "GET",
    url: "https://services.odata.org/OData/OData.svc/Products?$filter=Rating eq "+rating+"&$format=json",
    cache: true,
  })
    .success(function (data) {
      deferred.resolve(data);
    })
    .error(function (msg) {
      deferred.reject(msg);
    });
  return deferred.promise;

}

this.orderByPrice = function(){
  var deferred = $q.defer();
  $http({
    method: "GET",
    url: "https://services.odata.org/OData/OData.svc/Products?$orderby=Price desc&$format=json",
    cache: true,
  })
    .success(function (data) {
      deferred.resolve(data);
    })
    .error(function (msg) {
      deferred.reject(msg);
    });
  return deferred.promise;
}

this.getCount = function(){
  var deferred = $q.defer();
  $http({
    method: "GET",
    url: "https://services.odata.org/OData/OData.svc/Products/$count",
    cache: true,
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