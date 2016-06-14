'use strict';

angular.module('starter')
  .controller('NewGameController', function ($ionicPlatform, $rootScope, $scope, $location) {
  	$scope.jogadores = JOGADORES_INICIAL;
  	$scope.rodadas = RODADAS_INICIAL;

  	$scope.baralhoSelecionado = localStorage.getItem("baralhoSelecionado");
  	$scope.baralho = {cartas: []};

  	$scope.somaRodada = function(valor) {
  		if($scope.rodadas + valor >= RODADAS_MIN && $scope.rodadas + valor <= RODADAS_MAX) {
  			$scope.rodadas += valor;
  		}
  	}

  	$scope.podeAdicionarJogador = function() {
  		return $scope.jogadores.length < JOGADORES_MAX;
  	}

  	$scope.podeRemoverJogador = function() {
  		return $scope.jogadores.length > JOGADORES_MIN;
  	}

  	$scope.adicionarJogador = function() {
  		$scope.jogadores.push({nome: "Jogador " + ($scope.jogadores.length+1), pontos: PONTOS_INICIAL});
  	}

  	$scope.removerJogador = function(i) {
  		$scope.jogadores.splice(i, 1);
  	}

  	$scope.voltar = function() {
  		$location.path("/");
  	}

  	$scope.iniciarJogo = function() {
      preparaBaralho();
      salvaInformacoes();
  		$location.path("/rodada");
  	}

    function preparaBaralho() {
      while($scope.baralho.cartas.length < $scope.rodadas * $scope.jogadores.length) {
        var cartas = randomizaBaralho(gerarBaralho());
        $scope.baralho.cartas = $scope.baralho.cartas.concat(cartas);
      }      
    }

    function salvaInformacoes() {
      localStorage.setItem("rodadas", $scope.rodadas);
      localStorage.setItem("rodada", 1);
      localStorage.setItem("jogadores", JSON.stringify($scope.jogadores));
      localStorage.setItem("baralho", JSON.stringify($scope.baralho));
      localStorage.setItem("url", "/rodada");
    }

  	function gerarBaralho() {
  		var baralho = baralhos[$scope.baralhoSelecionado];
      var cartas = [];
  		$scope.baralho.diretorioImagens = baralho.diretorioImagens;
  		for(var key in baralho.cartas) {
  			var carta = baralho.cartas[key];
  			cartas = cartas.concat(Array(carta.quantidade).fill(carta.imagem));
  		}
      return cartas;
  	}

  	function randomizaBaralho(cartas) {
  		for(var i=0; i<cartas.length*4; i++) {
        var pos1 = Math.floor(Math.random()*cartas.length);
        var pos2 = Math.floor(Math.random()*cartas.length);

        var temp = cartas[pos1];
        cartas[pos1] = cartas[pos2];
        cartas[pos2] = temp;
      }
      return cartas;
  	}

  	(function main() {
      ativarVoltarNoBotao($ionicPlatform, $rootScope, $scope, $scope.voltar);
  	})();
  })
  .config(function($routeProvider) {
		$routeProvider.when('/newGame', {
			templateUrl : 'html/newGame.html',
			controller : 'NewGameController'
		})
	});
