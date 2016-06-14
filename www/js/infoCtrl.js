'use strict';

angular.module('starter')
  .controller('InfoController', function ($ionicPlatform, $rootScope, $scope, $location) {
    $scope.voltar = function() {
      $location.path("/");
    };
    ativarVoltarNoBotao($ionicPlatform, $rootScope, $scope, $scope.voltar);
  })
  .config(function($routeProvider) {
		$routeProvider.when('/como-jogar', {
			templateUrl : 'html/como-jogar.html',
			controller : 'InfoController'
		})
  })
  .config(function($routeProvider) {
    $routeProvider.when('/sobre', {
      templateUrl : 'html/sobre.html',
      controller : 'InfoController'
    })
	});
