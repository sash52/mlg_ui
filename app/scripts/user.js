angular.module('mlg')
.factory('loginHttpService',['$http','urlParams',function($http,urlParams){
	
	var loginHttpResponse={};	
	
	
	loginHttpResponse.login=function(data){
		return $http({
			method:'POST',
			data  : data,
			url   : urlParams.baseURL+urlParams.login
		});
	}

	loginHttpResponse.register=function(data){
		return $http({
			method:'POST',
			data  : data,
			url   : urlParams.baseURL+urlParams.registerUser
		});
	}
	loginHttpResponse.setPassword=function(data){
		return $http({
			method:'POST',
			data  : data,
			url   : urlParams.baseURL+urlParams.password
		});
	}
	loginHttpResponse.forgotPassword=function(data){
		return $http({
			method:'POST',
			data  : data,
			url   : urlParams.baseURL+urlParams.forgotPassword
		});
	}
	return loginHttpResponse;
	
}])
.controller('loginCtrl',['$rootScope','$scope','loginHttpService','$location',function($rootScope,$scope, loginHttpService,$location) {
    $scope.form={};	
    $scope.msg='';
    $scope.range = function(n) {
        return new Array(n);
    }; 
    function setCookie(key, value) {
		var expires = new Date();
		expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
		document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
	}
	 $scope.login = function(data){
	 		
			loginHttpService.login(data).success(function(response) {
					
					//window.location.href='/dashboard';
			}).error(function(error) {				
					$scope.msg="Invalid Username Password";
				
			});
	};

	$scope.gohome=function(){
		window.location.href='/';
	}


	 $scope.register = function(data){
	 		
			loginHttpService.register(data).success(function(response) {
				if(!response.data.response){
					$scope.msg=response.message;
				}else{
					$("#emailConfirmation").modal();					
				}
			
					//alert('registered succefully');
			}).error(function(error) {
				alert('registration fail');
			});
	};
	
}])
.controller('passwordCtrl',['$scope','loginHttpService','$location','$timeout',function($scope, loginHttpService,$location,$timeout) {
    $scope.form={};	
    $scope.msg='';
    var token= $location.search().code;
    $scope.form.token= token;
    $scope.range = function(n) {
        return new Array(n);
    }; 
    
    $scope.getUserByToken = function(token) {
  	  loginHttpService.getUserByToken(token).success(function(response) {
  		  $scope.email = response.email;  
  	  });
    }
    $scope.getUserByToken(token);
    
	  $scope.setPassword = function(data){
	  		if($scope.frmPassword.$invalid){
	 	    			//alert("Please fill all mandatory fields.");
	 	    			//return false;
	 	    		}
	  		$scope.spinner=true;
			loginHttpService.setPassword(data).success(function(response) {
				$scope.msg="Please Login with the password you have set. <br>Click <a href='/'>here</a> to login. <br>The Page will redirect to login  in 5 sec."	
				//$location.search('');
					$scope.spinner=false;
					$timeout(function() {
						$location.search('');
	  					 $location.path('/')
					}, 5000);	
					
					
			}).error(function(error) {					
				$scope.msg=error;
				$scope.spinner=false;
				 
			});	
	};

	 $scope.forgotPassword = function(data){
	 	if($scope.frmPassword.$invalid){
	 	    			//alert("Please fill all mandatory fields.");
	 	    			//return false;
	 	    		}
	  	$scope.spinner=true;
			loginHttpService.forgotPassword(data).success(function(response) {
					$scope.msg="A mail has been sent to your emailid."
					$scope.spinner=false;
					$scope.form={};
					$scope.frmPassword.$setPristine();
			}).error(function(error) {	
				$scope.msg=error;
				$scope.spinner=false;
			});	
	};	
}]);
