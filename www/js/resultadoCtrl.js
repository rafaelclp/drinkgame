'use strict';

angular.module('starter')
  .controller('ResultadoController', function ($scope, $location) {
    $scope.jogadores = JSON.parse(localStorage.getItem("jogadores"));

    $scope.finalizar = function() {
      localStorage.removeItem("url");
      $location.path("/");
    }

    function ordenaJogadores(jogador1, jogador2) {
      console.log(jogador1)
      return jogador2.pontos - jogador1.pontos;
    }

    (function main() {
      $scope.jogadores.sort(ordenaJogadores);
    })();
  })
  .config(function($routeProvider) {
		$routeProvider.when('/resultado', {
			templateUrl : 'html/resultado.html',
			controller : 'ResultadoController'
		})
	});
