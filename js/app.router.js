// Initializing the module.
var app = angular.module('myApp',['ngRoute']);

// Routing configuration created routing page to products and odata.
app.config(['$routeProvider',function($routeProvider){
   $routeProvider
   .when('/products',{
       templateUrl:'pages/products.html',
       controller:'product',
       caseInsensitiveMatch: true
   }).when('/Odata', {
    templateUrl: 'pages/Odata.html',
    controller: 'odata', 
   })

  }]);

  // controller created for products and will be found in Controller folder.
  app.controller('product', prodCntrl);

  // controller created for odata and will be found in Controller folder.
  app.controller('odata', odataCntrl);



  // Extra written for understanding.......

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