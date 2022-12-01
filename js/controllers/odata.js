// odata controller created here.

var odataCntrl =  function($scope, empService, $log){

    // $scope.url = "https://services.odata.org/V3/(S(qzuttktpdu4t4ahxu22biwzo))/OData/OData.svc/Products?$format=json";
    $scope.url = "https://services.odata.org/OData/OData.svc/Products?$format=json";
  
    $scope.products = [];
    $scope.showGetData= false;
    $scope.showDeleteId = false;
    $scope.addNewData = false;
    $scope.selectId = '';
  
    // Methods created here for post, delete, put and get.With in Tryit function.
    $scope.select = function(){
       console.log($scope.selectMethod)
       if($scope.selectMethod == "DELETE"){
        $scope.showDeleteId = true;   
       }else if($scope.selectMethod == "POST"){
        $scope.addNewData = true;
       }

    }

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
           
           console.log($scope.selectId)
            empService.deleteOdata($scope.selectId).then((response)=>{
                  console.log(response);
                 }).catch((error)=>{ })    
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
        
      }
    }

    
    // Filters starts here.........

    // filter gives total number of products.
    $scope.getCount = function(){
        empService.getCount().then((res)=>{
            console.log(res);
            $scope.count = res
        }).catch((err)=>{
      
        })
      }
      
      // filter give the product based on rating provided.
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
      
      // filtre uses here sort the product in decending order by price.
      $scope.orderByPrice = function(){
        empService.orderByPrice().then((response)=>{
             $scope.products = response.value
        }).catch((error)=>{
      
        })
      }
};
