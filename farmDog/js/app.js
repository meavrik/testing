var app = angular.module('App', ['ngMaterial']);

app.controller('AppCtrl', function ($scope, $http,$mdSidenav) {

  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');

  $scope.regions = [
    {display:"Americas" ,value:"americas"},
    {display:"Africa" ,value:"africa"},
    {display:"Asia" ,value:"asia"},
    {display:"Europe" ,value:"europe"},
    {display:"All" ,value:"all"}
  ]

  let _searchArr=[],
      _currentRegion=$scope.regions[0].value,
      _countries;

  $scope.selectedItem= _currentRegion;
  $scope.searchItemChanged = function(text){
    console.log("searchItemChanged "+text);
    if (!text)
    {
      $scope.resultListArr=_countries;
    }
  }

  $scope.selectedItemChanged = function(){
    if (_currentRegion!=$scope.selectedItem)
    {
        console.log("selectedItemChanged "+$scope.selectedItem);
        getCountriesIn($scope.selectedItem);
    }
   }

  $scope.getMatches = function (text) {
      let results = text ? _searchArr.filter( createFilterFor(text) ) : _searchArr;

      let newArr = [];
      let check = [];
      let newResults = [];
      for (countryItem of results) {
        if (countryItem.hasOwnProperty("source")) {
            newArr.push(countryItem.source);
        }

        if (check.indexOf(countryItem.display)===-1)
        {
            check.push(countryItem.display);
            newResults.push(countryItem);
        }
      }

      $scope.resultListArr=newArr;
      return newResults;
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

 function getCountriesIn(region)
 {
   _currentRegion = region;
   let url = region=="all"?"https://restcountries.eu/rest/v1/all":`https://restcountries.eu/rest/v1/region/${region}`;
   $http.get(url)
       .then(function(response) {
          _searchArr =[];
          _countries = response.data;
          $scope.resultListArr=[];

          for (countryItem of _countries) {

             countryItem.code = countryItem.topLevelDomain[0].substring(1);

             addToResultListArr(countryItem);
             addToSearchArr(countryItem,"name");

             if (countryItem.capital)
             {
               addToSearchArr(countryItem,"capital");
               getWeatherByCity(countryItem.capital);
             }
           }

       }, function errorCallback(response) {
          console.log(response)
    })
 }

 function getWeatherByCity(name)
 {
   $http.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=3e76134065cc713f10e963f409875381`)
     .then(function(response) {
        if (response && response.data && response.data.weather && response.data.weather.length>0)
        {
          let countryItem = getCountryItemByCapitel(response.data.name);
          if (countryItem) {
            countryItem.weather=response.data.weather[0].description;
            addToSearchArr(countryItem,"weather");
          }
        } else
        {
          console.log(`no weather data for ${response}`);
        }
     }, function errorCallback(response) {
        console.log(`can't find whether data ${response}`);
    })
}

 function getCountryItemByCapitel(capitalName)
 {
     for (countryItem of _countries) {
       if (countryItem.capital === capitalName) return countryItem;
     }
     return null;
 }

 function addToResultListArr(countryItem) {
   if (!countryItem) return;
    countryItem.display=countryItem.name;
    countryItem.value=angular.lowercase(countryItem.name);
    $scope.resultListArr.push(countryItem);
 }

 function addToSearchArr(countryItem,filterBy) {

   if (!countryItem) return;

   if (countryItem.hasOwnProperty(filterBy))
   {
      var obj = {display:countryItem[filterBy],value:angular.lowercase(countryItem[filterBy]),source:countryItem };
      _searchArr.push(obj);
    }
 }

 getCountriesIn(_currentRegion);
});
