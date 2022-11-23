var app = angular.module('myApp',['ngRoute']);

app.config(['$routeProvider',function($routeProvider){
   $routeProvider
   .when('/products',{
       templateUrl:'pages/products.html',
       controller:'product',
       caseInsensitiveMatch: true
   })
  //  .......................................................
   .when('/Odata', {
    templateUrl: 'pages/Odata.html',
    controller: 'odata', 
   })
  //  .when('/second-msg', {
    // redirectTo: "/products"
    // redirectTo: function(){
        // alert("sorry not implemented yet..");
        // return '/products';
  // }
  //  })
  //  .when('/', {
  //   template: '<strong>U are in defult page</strong>'
  //  })
  // ......................................................
  //  .otherwise({
    // template: '<strong>No content available here......</strong>'
  //  })
  //  above is a rout route(or default).And 
}]);

app.controller("product",['$scope','empService','$log', function($scope, empService, $log){

    $scope.products = [];
    $scope.addProductModal = function(){
        $scope.product ={
          "title":"",
          "description":"",
          "price":"",
          "category":"",
          "image":""
        }
    }

    $scope.addEditModal = function(prod){
        console.log(prod);
        $scope.productId = prod.id;
        $scope.product ={
            "title":prod.title,
            "description":prod.description,
            "price":prod.price,
            "category":prod.category,
            "image":prod.image
        }
      }

      $scope.deleteProductModal = function(prodId){
        $scope.productId = prodId;
      }

    $scope.updateProduct = function(){
          
        console.log($scope.product);
        empService.updateProduct($scope.product, $scope.productId).then(function(response){
            console.log(response);
            $scope.products.splice($scope.products.findIndex(prod => prod.id === response.id) , 1)
            $scope.products.unshift(response);
          }).catch(function(err){

         })
      }

      $scope.addProduct = function(){
        empService.addProduct($scope.product).then(function(response){
              $scope.products.unshift(response);
        }).catch(function(err){
        })
      }

      $scope.deleteProduct = function(){
        empService.deleteProduct($scope.productId)
        .then(function(response){
           $scope.products.splice($scope.products.findIndex(prod => prod.id === response.id) , 1)    
        }).catch(function(err){

        })
     }

    empService.getProducts(function(cd){
        $log.log(empService.getProducts())
        $scope.products = cd;
    });

}]);


app.controller("odata",['$scope','empService','$log', function($scope, empService, $log){

  // $scope.url = "https://services.odata.org/V3/(S(qzuttktpdu4t4ahxu22biwzo))/OData/OData.svc/Products?$format=json";
  $scope.url = "https://services.odata.org/OData/OData.svc/Products?$format=json";

  $scope.products = [];
  $scope.showGetData= false;
  $scope.showDeleteId = false;
  $scope.addNewData = false;

  $scope.Tryit = function(){
    console.log($scope.selectMethod)
    $scope.selectMethod;
    

    if($scope.selectMethod == "GET"){
      $scope.showGetData= true;
      empService.getOdata()
      .then(function (response) {
        console.log(response);
        $scope.products = response.value;
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else if($scope.selectMethod == "DELETE"){
      $scope.showDeleteId = true;
      empService.deleteOdata(id)
      .then(function (response) {
        console.log(response);
        $scope.products = response.value;
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else if($scope.selectMethod == "POST"){
      $scope.product = [];
      $scope.addNewData = true;
      $scope.addProducts = function(){
        console.log({...$scope.addOdata,"odata.type":"ODataDemo.Product"});
         empService.postOdata($scope.addOdata).then((response)=>{
            console.log(response);
         }).catch((error)=>{
            console.log(error);
         })
      }
      
      

      // $scope.addCategory = function(){
      //   console.log({...$scope.cat,"odata.type":"ODataDemo.Category"});
      //   ApiService.addCategory($scope.cat).then((response)=>{
      //       console.log(response);
      //   }).catch((error)=>{
  
      //   })
  
      // }

    }
 } 

 $scope.getCount = function(){

  empService.getCount().then((res)=>{
      console.log(res);
      $scope.count = res
  }).catch((err)=>{

  })
}

 $scope.selectRating = function (rating) {
  console.log(rating);
  if (rating == 0) {
    empService.getODataProducts()
      .then(function (response) {
        console.log(response);
        $scope.products = response.value;
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    empService.getFilterRatings(rating)
      .then(function (response) {
        console.log(response);
        $scope.products = response.value;
      })
      .catch(function (error) {});
  }
};

$scope.orderByPrice = function(){
  empService.orderByPrice().then((response)=>{
       $scope.products = response.value
  }).catch((error)=>{

  })
}



}]);