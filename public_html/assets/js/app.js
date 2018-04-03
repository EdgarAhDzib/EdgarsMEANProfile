var app = angular.module("portfolio", ['ngSanitize', 'ngAnimate']);

app.controller("ctrl", function($scope, $http) {

	// Modal is off by default
	$scope.isOpen = false;

	$http({method: "GET", url: "/index"})
	.then(function(success){
		var content = success.data[0].contents;
		var title = success.data[0].title;
		var artImages = success.data[0].images;
		// Animations work in ng-repeat elements
		$scope.contents = [{article:content, title: title, artImages: artImages}];
		$scope.gallery = [];
		$scope.list = [];
		$scope.results = [];
	}, function(error){
		console.log("Error:", error);
	});

	$scope.artRoute = function(id, page){
		var url = "/article/" + id;
		if (page) {
			url = "/page/" + id + "/" + page;
		}
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
		$http({method: "GET", url: url})
		.then(function(success){

			var id = success.data[0].id;
			var content = success.data[0].contents;
			var title = success.data[0].title;
			var artImages = success.data[0].images;
			var pageNo = success.data[0].pageNo;
			var otherPage = false;
			var pageLink = "";
			if (success.data[0].hasOwnProperty("otherPage")) {
				if (success.data[0].pageNo == 1) {
					pageLink = "Continue to Page 2 >>";
					otherPage = 2;
				}
				if (success.data[0].pageNo == 2) {
					pageLink = "<< Return to Page 1";
					otherPage = 1;
				}
			}
			$scope.contents = [{id: id, article: content, title: title, artImages: artImages, pageNo: pageNo, otherPage: otherPage, pageLink: pageLink}];
			var imgGallery = [];
			for (i = 0; i < artImages.length; i++) {
				imgGallery.push({path:artImages[i], selected: false, index: i});
			}
			$scope.gallery = imgGallery;
			$scope.list = [];
			$scope.results = [];
			// If a menu is selected, keep its tab highlighted
			$("." + success.data[0].categ).addClass("active");
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
			$scope.contents = [];
			$scope.gallery = [];
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
			$scope.contents = [];
			$scope.gallery = [];
			$scope.list = [];
			$scope.results = success.data;
		}, function(error){
			console.log("Error:", error);
		});
	}

	$scope.toggleModal = function(isOpen, file) {
		$scope.isOpen = isOpen;
		if (file) {
			if ($scope.gallery.length < 2) {
				$scope.showLArrow = false;
				$scope.showRArrow = false;
			} else {
				$scope.showLArrow = true;
				$scope.showRArrow = true;
			}
			for (i = 0; i < $scope.gallery.length; i++) {
				if ($scope.gallery[i].path == file) {
					$scope.gallery[i].selected = true;
					$scope.showLArrow = i == 0 ? false : true;
					$scope.showRArrow = i == $scope.gallery.length - 1 ? false : true;
				} else {
					$scope.gallery[i].selected = false;
				}
			}
		}
	}


	$scope.galleryScroll = function(index, dir) {
		switch (dir) {
			case "prev" : index -= 1;
			break;
			case "next" : index += 1;
			break;
			default: return;
		}
		// Math validation on impossible numbers
		$scope.toggleModal(true, $scope.gallery[index].path);
	}

});