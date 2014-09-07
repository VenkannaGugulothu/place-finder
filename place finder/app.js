var app = angular.module('myApp',[]);

var type,address,latitude,longitude;

app.controller("mainController", function($scope){

  $scope.go = function(){              
      address = $scope.area;
      type = $scope.types;
      //console.log(address);
      geocoder = new google.maps.Geocoder();
      geocoder.geocode({
      'address': address
      }, function(results, status) {      
          latitude=results[0].geometry.location.lat();    
          longitude=results[0].geometry.location.lng();
          if(latitude!='' && longitude!=''){
            initialize();
          }
      });
  };

});