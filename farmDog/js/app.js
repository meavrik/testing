var app = angular.module('App', ['ngMaterial']);

app.controller('AppCtrl', function ($scope, $http,$timeout, $mdSidenav) {

  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');

  $scope.regions = [
    {display:"All" ,value:"all"},
    {display:"Africa" ,value:"africa"},
    {display:"Americas" ,value:"americas"},
    {display:"Asia" ,value:"asia"},
    {display:"Europe" ,value:"europe"}
  ]

  let regionValues = [];
  let _currentRegion;
  for (var region in $scope.regions) {
    regionValues.push(region.value);
  }

  $scope.selectedItemChanged = function(){

    if (regionValues.indexOf($scope.selectedItem) && _currentRegion!=$scope.selectedItem)
    {
        console.log("selectedItemChanged "+$scope.selectedItem);
        getCountriesBy($scope.selectedItem);
    }
   }

  $scope.selectedItem= "americas";
  getCountriesBy("americas");

  $scope.getMatches = function (text) {
      var results = text ? $scope.regions.filter( createFilterFor(text) ) : $scope.regions,
          deferred;

      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(state) {
          return (state.value.indexOf(lowercaseQuery) === 0);
        };
    }

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    }
  }

 function getCountriesBy(searchBy)
 {
   _currentRegion = searchBy;
   let url = searchBy=="all"?"https://restcountries.eu/rest/v1/all":`https://restcountries.eu/rest/v1/region/${searchBy}`;
   $http.get(url)
       .then(function(response) {
          $scope.weathers=[];
           $scope.countries = response.data;
           let item;
           for (var i = 0; i < $scope.countries.length; i++) {

             item=$scope.countries[i];
             item.code = item.topLevelDomain[0].substring(1);

             $http.get(`http://api.openweathermap.org/data/2.5/weather?q=${item.capital}&appid=3e76134065cc713f10e963f409875381`)
                 .then(function(response) {
                    $scope.weathers[response.data.name] = response.data.weather[0].description
                 })
           }

       }, function errorCallback(response) {
          console.log(response)
    })
 }
});
