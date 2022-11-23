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
      this.OdataUrl ="https://services.odata.org/V3/(S(qzuttktpdu4t4ahxu22biwzo))/OData/OData.svc/Products" 

      // this.postOdataUrl ="https://services.odata.org/V3/(S(qzuttktpdu4t4ahxu22biwzo))/OData/OData.svc/Products" 

      this.deleteOdataUrl = function(id){
        return "https://services.odata.org/V3/(S(qzuttktpdu4t4ahxu22biwzo))/OData/OData.svc/Products("+id+")?$format=json"
      }
  
}]);
