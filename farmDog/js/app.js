var app = angular.module('App', ['ngMaterial']);

app.controller('AppCtrl', function ($scope, $http,$timeout, $mdSidenav) {

  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');

  $scope.regions = [
    {name:"Africa" ,value:"africa"},
    {name:"Americas" ,value:"americas"},
    {name:"Asia" ,value:"asia"},
    {name:"Europe" ,value:"europe"}
  ]

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    }
  }

  $scope.selectedItemChanged = function(){
    $http.get(`https://restcountries.eu/rest/v1/region/${$scope.selectedItem}`)
        .then(function(response) {
           console.log($scope.selectedItem);
           $scope.weathers=[];
            $scope.countries = response.data;
            let item;
            for (var i = 0; i < $scope.countries.length; i++) {
              //console.log(response.data[i].name);
              item=$scope.countries[i];
              item.code = item.topLevelDomain[0].substring(1);

              $http.get(`http://api.openweathermap.org/data/2.5/weather?q=${item.capital}&appid=3e76134065cc713f10e963f409875381`)
                  .then(function(response) {

                     $scope.weathers[response.data.name] = response.data.weather[0].description

                     //console.log($scope.weathers[response.name]);
                  })
            }

        })
   }
  $scope.selectedItem= "americas";

});
