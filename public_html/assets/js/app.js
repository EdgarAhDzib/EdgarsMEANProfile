var app = angular.module("portfolio", []);

app.controller("ctrl", function($scope, $http) {
	$http({method: "GET", url: "/index"})
	.then(function(success){
		console.log(success.data[0].contents[0]);
		$scope.blurb = success.data[0].contents[0];
	}, function(error){
		console.log("Error:", error);
	});
});