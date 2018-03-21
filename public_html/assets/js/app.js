var app = angular.module("portfolio", ['ngSanitize']);

app.controller("ctrl", function($scope, $http) {
	/*
	$http({method: "GET", url: "/test"})
	.then(function(success){
		// console.log(success.data[0].contents);
		$scope.blurb = success.data[0].contents;
	}, function(error){
		console.log("Error:", error);
	});
	*/

	$http({method: "GET", url: "/article/2"})
	.then(function(success){
		// console.log(success.data[0]);
		var content = success.data[0].contents;
		$scope.title = success.data[0].title;
		$scope.article = content;
	}, function(error){
		console.log("Error:", error);
	});

});