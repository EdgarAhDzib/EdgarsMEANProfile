var app = angular.module("portfolio", ['ngSanitize', 'ngAnimate']);

app.controller("ctrl", function($scope, $http) {

	// Modal and dropdown settings off by default
	$scope.isOpen = false;
	$scope.galleryOpen = false;
	$scope.emailFormEl = false;
	$scope.emailSent = false;
	$scope.openNavbar = false;

	// Initialize navbar title and 'active' values, change after selection
	$scope.navbarTitle = "Main Menu";
	$scope.active = "main";

	// Initialize routes and links for drop-down navbar in mobile view, change state to allow "entry"
	$scope.navBarRoutes = [];
	$scope.navBarLinks = [];

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

	$scope.toggleGallery = function(file) {
		$scope.isOpen = true;
		$scope.galleryOpen = true;
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

	$scope.closeModal = function() {
		$scope.isOpen = false;
		$scope.galleryOpen = false;
		$scope.emailFormEl = false;
		$scope.emailSent = false;
	}

	$scope.openEmail = function() {
		$scope.isOpen = true;
		$scope.emailFormEl = true;
	}

	$scope.formSubmit = function() {
		var name = $scope.email.name;
		var address = $scope.email.address;
		var subject = typeof $scope.email.subject === "undefined" ? "" : $scope.email.subject;
		var message = $scope.email.message;
		var body = {
			name: name,
			address: address,
			subject: subject,
			message: message
		};
		$http({method: "POST", url: "/mailer", data: body})
		.then(function(success){
			// Reset form only if email delivery succeeded and $scope.emailForm is not false
			if (success.status == 200 && $scope.emailForm) {
				// Send message into alert
				$scope.emailResult = success.data.response;
				$scope.emailSent = true;
				// Close modal and reset form if email was sent
				if (success.data.reset) {
					$scope.emailForm.$setPristine();
					$scope.emailForm.$setUntouched();
					// Reset the fields by email model property
					var props = ["name", "address", "subject", "message"];
					for (i = 0; i < props.length; i++) {
						$scope.email[props[i]] = "";
					}
					$scope.emailFormEl = false;
				}
			}
		});
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
		if (index < 0 || index >= $scope.gallery.length || !Number.isInteger(index)) {
			return;
		}
		$scope.toggleGallery($scope.gallery[index].path);
	}

	$http({method: "GET", url: "/wallpapers"})
	.then(function(success){
		$scope.videoBkgd = false;
		var randIndex = Math.floor(Math.random() * success.data.length);
		var randBackGd = success.data[randIndex];
		var videoType = /(\.mp4)$/i;
		if (videoType.test(randBackGd)) {
			// Set up video background
			$scope.videoBkgd = true;
			$scope.videoSrc = randBackGd;
		} else {
			randBackGd = "url(/assets/images/wallpapers/" + randBackGd + ")";
			$('body').css("background-image", randBackGd);
		}
		// $scope.gallery = [];
	}, function(error){
		console.log("Error:", error);
	});

	$scope.navToggle = function(open) {
		$scope.openNavbar = !$scope.openNavbar;
		$scope.navBarRoutes = [
			{
				click: "artRoute",
				arg: 0,
				display: "Home"
			},
			{
				click: "listSelect",
				arg: "app",
				display: "Web Apps"
			},
			{
				click: "menuSelect",
				arg: "anec",
				display: "Anecdotes"
			},
			{
				click: "menuSelect",
				arg: "story",
				display: "Stories"
			},
			{
				click: "menuSelect",
				arg: "essay",
				display: "Essays"
			},
			{
				click: "listSelect", // 'link'
				arg: "link",
				display: "Links"
			},
			{
				click: "artRoute",
				arg: 16,
				display: "About"
			}
		];

		$scope.navBarLinks = [
			{
				click: "https://github.com/EdgarAhDzib/",
				display: "github64.png"
			},
			{
				click: "https://www.linkedin.com/in/edgar-martin-del-campo-7ba775125/",
				display: "linkedin64.png"
			},
			{
				click: "https://www.facebook.com/ShamansCross/",
				display: "fb-likebutton-online-72.png"
			},
			{
				click: "https://www.youtube.com/channel/UCju74A_kAhFnnyPjq3JXRBQ",
				display: "YouTube-logo-full_color.png"
			},
			{
				click: "https://twitter.com/EdgarTlamatini",
				display: "Twitter_logo_blue.png"
			}
		];
	}

	$scope.menuRoute = function(func, arg, title, pass=false) {
		// Call the function and pass its argument
		$scope[func](arg);
		$scope.navbarTitle = title;
		$scope.active = arg;
		if (!pass) {
			$scope.navToggle();
		}
	}

	$scope.returnToPage = function(active) {
		if (active == "main") {
			$scope.navToggle();
		} else {
			var object = $scope.navBarRoutes.filter(function( obj ) {
				return obj.arg == active;
			});
			$scope.menuRoute(object[0].click, object[0].arg, object[0].display, true);
		}
	}
});