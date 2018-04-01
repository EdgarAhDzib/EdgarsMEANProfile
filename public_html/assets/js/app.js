var app = angular.module("portfolio", ['ngSanitize', 'ngAnimate']);

app.controller("ctrl", function($scope, $http) {

	$http({method: "GET", url: "/index"})
	.then(function(success){
		var content = success.data[0].contents;
		var title = success.data[0].title;
		var artImages = success.data[0].images;
		// Animations work in ng-repeat elements
		$scope.contents = [{article:content, title: title, artImages: artImages}];
		$scope.list = [];
		$scope.results = [];
	}, function(error){
		console.log("Error:", error);
	});

	$scope.artRoute = function(id){
		$http({method: "GET", url: "/article/"+id})
		.then(function(success){
			// Clear any 'active' tabs and assign the current
			$(".menuTab").removeClass("active");
			switch (id) {
				case 0 : $(".index").addClass("active");
				break;
				case 16 : $(".about").addClass("active");
				break;
				default :
				break;
			}

			var content = success.data[0].contents;
			var title = success.data[0].title;
			var artImages = success.data[0].images;
			$scope.contents = [{article:content, title: title, artImages: artImages}];
			$scope.list = [];
			$scope.results = [];
		}, function(error){
			console.log("Error:", error);
		});
	};

	$scope.listSelect = function(categ) {
		$http({method: "GET", url: "/lists/" + categ})
		.then(function(success){
			$(".menuTab").removeClass("active");
			$("." + categ).addClass("active");

			$scope.title = "";
			$scope.article = "";
			$scope.artImages = [];
			$scope.contents = [];
			$scope.results = [];
			$scope.list = success.data;
		}, function(error){
			console.log("Error:", error);
		});
	}

	$scope.menuSelect = function(categ) {
		$http({method: "GET", url: "/menu/" + categ})
		.then(function(success){
			$(".menuTab").removeClass("active");
			$("." + categ).addClass("active");

			$scope.title = "";
			$scope.article = "";
			$scope.artImages = [];
			$scope.contents = [];
			$scope.list = [];
			$scope.results = success.data;
		}, function(error){
			console.log("Error:", error);
		});
	}

});