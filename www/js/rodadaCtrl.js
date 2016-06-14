'use strict';

angular.module('starter')
  .controller('RodadaController', function ($scope, $location, $ionicPopup, $timeout) {
    $scope.rodadas = localStorage.getItem("rodadas");
    $scope.rodada = parseInt(localStorage.getItem("rodada"));
    $scope.jogadores = JSON.parse(localStorage.getItem("jogadores"));
    $scope.baralho = JSON.parse(localStorage.getItem("baralho"));

    $scope.encerrar = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Encerrar Partida',
        template: 'Você quer mesmo encerrar a partida?'
      });

      confirmPopup.then(function(res) {
        if(res) {
          localStorage.setItem("url", "/resultado");
          $location.path("/resultado");
        }
      });
    };

    $scope.somarPonto = function(valor) {
      if ($scope.botoesAtivos) {
        $scope.rodada += 1;
        $scope.jogadores[$scope.jogador].pontos += valor;
        localStorage.setItem("jogadores", JSON.stringify($scope.jogadores));
        localStorage.setItem("rodada", $scope.rodada);

        if(Math.ceil($scope.rodada / $scope.jogadores.length) > $scope.rodadas) {
          localStorage.setItem("url", "/resultado");
          $location.path("/resultado");
        }
        else {
          iniciaRodada();
        }
      }
    }

    function ativarBotoes() {
      $scope.botoesAtivos = true;
    }

    function iniciaRodada() {
      $scope.jogador = ($scope.rodada-1) % $scope.jogadores.length;
      $scope.botoesAtivos = false;
      $scope.rodadaAtual = Math.ceil($scope.rodada / $scope.jogadores.length);

      $timeout(ativarBotoes, TEMPO_ATIVAR_BOTOES);
    }

    (function main() {
      iniciaRodada();
    })();
  })
  .config(function($routeProvider) {
		$routeProvider.when('/rodada', {
			templateUrl : 'html/rodada.html',
			controller : 'RodadaController'
		})
	});
