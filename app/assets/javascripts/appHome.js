var home = angular.module("RubAngProj", ['LocalStorageModule',
					 'templates',
					 'ngRoute'])
    .controller ('toDoController', ["$scope","$http","localStorageService","$routeParams","$location",function ($scope,$http,localStorageService,$routeParams,$location) {
	if (localStorageService.get ("miClave")) {
	    $scope.toDo = localStorageService.get ("miClave");
	} else {
	    $scope.toDo = [];
	    $http.get ("http://jsonplaceholder.typicode.com/posts")
		.success (function (data) {
		    $scope.toDo = data;
		})
		.error (function (e) {
		    console.log(e);
		});
	}
	$scope.$watchCollection("toDo",function() {
	    localStorageService.set("miClave",$scope.toDo);
	});
	$scope.addAct = function () {
	    $scope.toDo.push($scope.newAct);
	    $scope.newAct = {};
	};
	$scope.delItem = function () {
	    $scope.toDo.shift();
	};
	$scope.search = function (comentario) {
	    if ($scope.keywords == undefined)
		return true;
	    return comentario.title.toLowerCase().indexOf($scope.keywords.toLowerCase()) !== -1;
	};
    }])
    .config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	    .when('/', {
		templateUrl: 'index.html',
		controller: 'toDoController'
	    });
    }]);
