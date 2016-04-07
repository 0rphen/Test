angular.module("RubAngProj", ["LocalStorageModule"])
    .controller ('toDoController', ["$scope", "$http", "localStorageService", function ($scope, $http, localStorageService) {
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
    }]);
