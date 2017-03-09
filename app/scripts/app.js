'use strict';
angular.module('mlg', [ 'ngAnimate', 'ngCookies', 'ngRoute', 'ui.bootstrap',]).value('urlParams', {
	users : '/users',
	login: '/users/login',
	registerUser:'/users/registerUser',
	baseURL : 'http://localhost/mlg',	
}).value('REGEX', {
	LAT : '/-?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,6}/',
	PINCODE : '/^([0-9]{6})$/',
	MOBILE : '/^(\\d{10})$/',
	AMOUNT : '/^(?:[1-9]\\d*|0)?(?:\\.\\d+)?$/',
	LANDLINE : '/^[0-9]*$/',
	DATE : '/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/',
	DATEFORMAT : '/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/'
}).config([ '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	//var access = routingConfig.accessLevels;
	$routeProvider.when('/', {
		templateUrl : '/views/landing.html',
		controller : 'loginCtrl',		
	}).when('/signin', {
		templateUrl : '/views/user-selection.html',
		controller : 'loginCtrl',		
	}).when('/parent_login', {
		templateUrl : '/views/user-parent.html',
		controller : 'loginCtrl',		
	}).when('/signup/:type', {
		templateUrl : '/views/signup.html',
		controller : 'loginCtrl',		
	}).otherwise({
		redirectTo : '/',
	});;

	$locationProvider.html5Mode({
		enabled : true,
		requireBase : false
	});

} ]).run([ '$rootScope', '$location', 'urlParams', '$http', '$cookies', '$cookieStore', function($rootScope, $location, urlParams, $http, $cookies, $cookieStore) {

	// $rootScope.logout = function() {
	// 	// api call for logout
	// 	$http({
	// 		method : 'GET',
	// 		url : urlParams.baseURL + urlParams.logout
	// 	}).success(function(response) {
	// 		$rootScope.userName = '';

			
	// 		$location.path('/');
	// 	}).error(function(error) {

	// 	});

	// };

} ]);

