'use strict';
angular.module('mlg_student', [ 'ngAnimate', 'ngCookies', 'ngRoute', 'ui.bootstrap',])
.value('urlParams', {
	users : '/users',
	login: '/users/login',
	logout: '/users/logout',
	siteRoot : '/mlg_ui/app/',
	baseURL : 'http://localhost/mlg',
	registerUser:'/users/registerUser',
	getCourseByGrade :'/courses/getCourseListForLevel',
	getStudentCourses :'/students/getStudentCourses', 



}).value('REGEX', {
	LAT : '/-?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,6}/',
	PINCODE : '/^([0-9]{6})$/',
	MOBILE : '/^(\\d{10})$/',
	AMOUNT : '/^(?:[1-9]\\d*|0)?(?:\\.\\d+)?$/',
	LANDLINE : '/^[0-9]*$/',
	DATE : '/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/',
	DATEFORMAT : '/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/'
}).value('user_roles', {
	admin:1,
	parent : 2,
	teacher : 3,
	student : 4,
}).value('card_months', {
	1  : '1',
	2  : '2',
	3  : '3',
	4  : '4',
	5  : '5',
	6  : '6',
	7  : '7',
	8  : '8',
	9  : '9',
	10 : '10',
	11 : '11',
	12 : '12',
}).value('card_years', {
	2018  : '2018',
	2019  : '2019',
	2020  : '2020',
	2021  : '2021',
	2022  : '2022',
}).config([ '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	//var access = routingConfig.accessLevels;
	$routeProvider
	.when('/journey', {
		templateUrl : 'views/my_journey.html',
		controller : 'journeyCtrl',		
	}).when('/profile', {
		templateUrl : 'views/my_profile.html',
		controller : 'journeyCtrl',		
	}).when('/help', {
		templateUrl : 'views/help.html',
		controller : 'helpCtrl',		

	}).when('/challenges', {
		templateUrl : 'views/challenges.html',
		controller : 'journeyCtrl',		
	}).when('/demo_video', {
		templateUrl : 'views/demo_video.html',
		controller : 'quizCtrl',		
	}).when('/quiz', {
		templateUrl : 'views/quiz.html',
		controller : 'quizCtrl',		
	})

	.otherwise({
		redirectTo : '/journey',
	});

	$locationProvider.html5Mode({
		enabled : true,
		requireBase : false
	});

} ]).run([ '$rootScope','$templateCache', '$location','loginHttpService', 'urlParams', '$http', '$cookies', '$cookieStore', function($rootScope,$templateCache,$location, loginHttpService, urlParams, $http, $cookies, $cookieStore) {

    urlParams.baseURL=$location.protocol()+'://'+$location.host()+'/mlg';
    	  
		
	   $rootScope.logout=function(){
		   	loginHttpService.logout().success(function(response) {
		   		$rootScope.logged_user = '';
	         window.location.href='/mlg_ui/app';
		   }).error(function(error) {
			  $rootScope.logged_user = '';
		   });
		}



	$rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });



} ])
.controller("TopController", function($rootScope, $scope, $location) {
  $rootScope.$on("$routeChangeSuccess", function(event, next, current) {
    //$scope.atHome = ($location.path() === "/");
	$scope.this_route = function(){
         return $location.path().replace('/', '');
    };
  });
});


/*app.controller('PageCtrl', function () {
	
});*/