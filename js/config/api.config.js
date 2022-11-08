angular.module("myApp").service("ApiConfig", [

    function(){
      this.productsUrl    = "https://fakestoreapi.com/products"    
      this.addProductUrl  = "https://fakestoreapi.com/products" 
      this.updateProductUrl = function(id){
              return "https://fakestoreapi.com/products/"+ id
      } 
      this.deleteProductUrl = function(id){
        return "https://fakestoreapi.com/products/"+ id
      }
    }
  
]);
