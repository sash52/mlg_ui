angular.module('AUTH',[]).config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('httpInterceptor');
}])
.factory('httpInterceptor',['$q','$window','$cookies',function($q,$window,$cookies){
  return {
    responseError: function(resError){
    	if(resError.status === 401){    		
    		$window.location.href='/';
    	}
    	if(resError.status === 0){
    	}
      return $q.reject(resError);
    },
    request: function(config) {
 
    config.headers['token'] = 'abhishek';
 
  return config;
}
  }
}])
.factory('Auth',['$http','$route','$cookies','$window','urlParams','$location','$cookieStore', function($http,$route,$cookies,$window,urlParams,$location,$cookieStore){
	
	var accessLevels = routingConfig.accessLevels
		, userRoles  = routingConfig.userRoles;
	
	var currentUser={userName:'',role:userRoles.public};
    var cookieString=$cookieStore.get("userObj")
	//var cookieString=$cookies['userObj'];
	
	console.log('Cookie String Read:'+cookieString);
	
//	delete $cookies['info'];
	
	if(cookieString){
		var userInfo=parseUser(cookieString);
		
		console.log('User Info Object Obtained '+ JSON.stringify(userInfo));
		
        currentUser={
				userName:userInfo.userName,
                email:userInfo.email,
				role:userRoles[userInfo.role]
		}
        
        console.log('Current User Object Obtained '+ JSON.stringify(currentUser));
	}
	
	function parseUser(cookie){
		var keyVals=cookie.split(',');
		var obj={};
		angular.forEach(keyVals,function(value,key){
			var vals=value.split('=');
			obj[vals[0]]=vals[1];
		});
		return obj;
	}

     console.log('currentUser role:'+JSON.stringify(currentUser.role));

      function changeUser(user) {
    	  angular.extend(currentUser, user);
      }

      return {
    	  
    	  authorize : function(accessLevel, role) {
    		  			if(role === undefined) {
    		  				role = currentUser.role;
    		  			}
    		  			return accessLevel.bitMask & role.bitMask;
    	  			 },
		
    	  isLoggedIn: function(user) {
    		  			if(user === undefined) {
    		  				user = currentUser;
    		  			}
    		  			return user.role.title !== userRoles.public.title ;
    	  			 },
		
    	  register  : function(user, success, error) {
    		  			$http.post('/register', user).success(function(res) {
    		  			changeUser(res);
    		  			success();
    		  		  }).error(error);
    	  			 },
		
    	  	login   : function(user, success, error) {
    	  				$http.post('/login', user).success(function(user){
    	  				changeUser(user);
    	  				success(user);
    	  			 }).error(error);
    	  	},
    	  	APIEndpoint: function () {
    	  		var strPort='';
    	  		if($location.port()!==''){
    	  			strPort=':'+$location.port();
    	  		}
                var endpoint = $location.protocol()+'://'+$location.host()+strPort+'/api';
                return endpoint;
            },

			logout: function(success, error) {
						delete $cookies['info'];
						$window.location.href='/logout';
				},
			
			accessLevels: accessLevels,
			userRoles: userRoles,
			user: currentUser
			
      };
}]).directive('accessLevel', ['Auth', function(Auth) {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            var prevDisp = element.css('display')
                , userRole
                , accessLevel;

            $scope.user = Auth.user;
            $scope.accessLevels=Auth.accessLevels;
            
            $scope.$watch('user.role', function(role) {
               // console.log(role)
                if(role)
                    userRole = role;
                updateCSS();
            });

            attrs.$observe('accessLevel', function(al) {
                if(al) accessLevel = $scope.$eval(al);
                updateCSS();
            });

            function updateCSS() {
                if(userRole && accessLevel) {
                    if(!Auth.authorize(accessLevel, userRole))
                        element.css('display', 'none');
                    else
                        element.css('display', prevDisp);
                }
            }
        }
    };
}]);




