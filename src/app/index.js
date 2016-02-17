(function(){
	'use strict';

	angular.module('sf_blog',[
		'ui.router',
		'ngTouch',
		'sf_blog.resources',
		'sf_blog.service'
	])
	.config(function ($logProvider,$stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, IsDebug) {
	  $locationProvider.html5Mode(true);
	  $httpProvider.defaults.timeout = 500000;
	  $httpProvider.defaults.withCredentials = true;
	  $httpProvider.interceptors.push('AuthInterceptor');
	  // Enable log
	  $logProvider.debugEnabled(IsDebug);
	  $urlRouterProvider.otherwise('/');
	})
})();