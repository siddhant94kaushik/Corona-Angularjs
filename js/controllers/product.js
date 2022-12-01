// product controller created here.

var prodCntrl =  function($scope, empService, $log){

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

};