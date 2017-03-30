'use strict';
angular.module('mlg', [ 'ngAnimate', 'ngCookies', 'ngRoute', 'ui.bootstrap',])
.value('urlParams', {
	users : '/users',
	login: '/users/login',
	logout: '/users/logout',
	siteRoot : '/mlg_ui/app/',
	registerUser:'/users/registerUser',
	parentPreference:'/users/setUserPreference',
	baseURL : 'http://localhost/mlg',
	gradeList : '/users/getGradeList',
	setUserStatus : '/users/setUserStatus',
	getTermsAndConditions : '/users/getStaticContents',
	getPaymentBrief : '/users/getPaymentBrief',
	isUserLogin : '/users/isUserLoggedin',
	saveCardToPaypal : '/users/saveCardToPaypal',
	packageList : '/users/getPackageList',
	planList : '/users/getPlanList',
	getCourseByGrade :'/courses/getCourseListForLevel',
	setChildrenCount :'/users/setCountOfChildrenOfParent',
	getChildrenCount :'/users/getCountOfChildrenOfParent',
	getAddedChildren :'/users/getChildrenListOfParent',	
	priceCalcOnSeclectedCourse :'/users/priceCalOnCourse',
	getChildrenDetails :'/users/getChildrenDetails',
	addChildRecord : '/users/addChildrenRecord',
	addChild : '/users/addChildren',
	offerRecords: '/users/getOffers',
	getStepNum 	   :'/users/getStepNum', 
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
	$routeProvider.when('/', {
		templateUrl : 'views/landing.html',
		controller : 'loginCtrl',		
	}).when('/signin', {
		templateUrl : 'views/user-selection.html',
		controller : 'loginCtrl',		
	}).when('/parent_login', {
		templateUrl : 'views/parent_login.html',
		controller : 'loginCtrl',		
	}).when('/teacher/login', {
		templateUrl : 'views/login-teacher.html',
		controller : 'loginCtrl',	
	}).when('/teacher/signup',{
		templateUrl : 'views/teacher_signup.html',
		controller : 'teacherLoginCtrl',
	}).when('/parent_signup', {
		templateUrl : 'views/parent_signup.html',
		controller : 'loginCtrl',
	}).when('/email/confirmation/:id',{
		templateUrl : 'views/parent_confirmation.html',
		controller : 'emailConfirmationCtrl',
	}).when('/parent_dashboard', {
		templateUrl : 'views/parent_dashboard.html',
		controller : 'parentDashboardCtrl',
	}).when('/select_children', {
		templateUrl : 'views/number_children.html',
		controller : 'addChild',		
	}).when('/add_child_account', {
		templateUrl : 'views/child_account_creation.html',
		controller : 'addChild',		
	}).when('/parent_preferences', {
		templateUrl : 'views/account_preferenceces.html',
		controller : 'parentDashboardCtrl',
	}).when('/terms_and_conditions', {
		templateUrl : 'views/term_condition.html',
		controller : 'termsAndConditionsCtrl',
	}).when('/parent/dashboard', {
		templateUrl : 'views/dashboard/parent-dashboard.html',
		controller : 'parentDashboardCtrl',
	}).when('/payment_page', {
		templateUrl : 'views/payment_page.html',
		controller : 'paymentPageCtrl',
	}).when('/test', {
		templateUrl : 'views/test.html',
		controller : 'addChild',
	}).when('/parent/dashboard/offers', {
		templateUrl : 'views/dashboard/parent-offers.html',
		controller : 'parentOffers',
	}).when('/parent/dashboard/redeem',{
		templateUrl : 'views/dashboard/parent-redeem.html',
		controller : 'parentDashboardCtrl',
	}).when('/teacher/create_account',{
		templateUrl : 'views/account-teacher.html',
		controller : 'parentDashboardCtrl',
	}).otherwise({
		redirectTo : '/',
	});

	$locationProvider.html5Mode({
		enabled : true,
		requireBase : false
	});

} ]).run([ '$rootScope','$templateCache', '$location','loginHttpService', 'urlParams', '$http', '$cookies', '$cookieStore', function($rootScope,$templateCache,$location, loginHttpService, urlParams, $http, $cookies, $cookieStore) {

    urlParams.baseURL=$location.protocol()+'://'+$location.host()+'/mlg';
    loginHttpService.isUserlogin().success(function(response) {
         if (response.status=='false') {
           $rootScope.logged_user = '';
         } else {
           $rootScope.logged_user = response.user_info;
         }
	   }).error(function(error) {
		  $rootScope.logged_user = '';
	   });
		
		/*$rootScope.$on("$routeChangeSuccess", function(event, next, current) {
			$scope.atHome = ($location.path() === "parent/dashboard/offers");
		});*/
		/*$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		  $rootScope.atHome = (toState.name == '/parent/dashboard');
		});*/
		  
		
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
