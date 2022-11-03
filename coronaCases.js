var app = angular.module('app', []);

app.controller("emp",['$scope','empService','$http','$log', function($scope, empService,$http, $log){

    // empService.getCovidDetails().then(function(cd){
    //     $log.log(cd);
    //     $scope.data = cd.data;
    // });

    $scope.showCountryData = false;

    empService.getCovidDetails().then(function(response){
        console.log(response);
        $scope.data = response;
    });

    $scope.doSearch = function(){
        empService.findCountryByName($scope.searchCountry, function(r){
            $scope.confirmed = r.confirmed;
            $scope.recovered = r.recovered;
            $scope.deaths = r.deaths;
            $scope.lastUpdate = r.lastUpdate;
            $scope.showCountryData = true;
        });
    }
      
}]);

app.service('empService',["$http","$log","$q", function($http, $log, $q){

//    this.getCovidDetails = function(cb){
//     $http({
//         url:'https://covid19.mathdro.id/api',
//         method:'GET'
//     }).than(
//         function(response){
//             cb(response.data)
//             $log.log("initial data", response.data)
//         },
//         function(response){
//             $log.log("ERROR occurred")
//         }
//     )
//    } 

this.getCovidDetails = function(){
    var deferred = $q.defer();
    $http({
       method: 'GET',
       url: 'https://covid19.mathdro.id/api',
       cache: true
   }).success(function (data) {
       deferred.resolve(data);
   }).error(function (msg) {
       deferred.reject(msg);
   });

   return deferred.promise;
}


     this.findCountryByName = function(COUNTRY_NAME, cb){
        $http({
            
            url: 'https://covid19.mathdro.id/api/countries/' + COUNTRY_NAME ,
            method: 'GET'

        }).then(
            function(resp){
               cb(resp.data);
               $log.log("data", resp.data);
            },
            function(resp){
            $log.log("ERROR occurred")
            // debugger;
            }
        )
     }
}]);