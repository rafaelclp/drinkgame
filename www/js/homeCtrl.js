'use strict';

angular.module('starter')

.controller('HomeController', function ($scope, $location) {
  $scope.selecionarBaralho = function(id) {
    id = id % baralhos.length;
    $scope.baralhoSelecionado = baralhos[id];
    localStorage.setItem('baralhoSelecionado', id);
  };

  function recuperaJogoFechado() {
    if (localStorage.getItem('url')) {
      $location.path(localStorage.getItem('url'));
    }
  }

  (function() {
    recuperaJogoFechado();
    $scope.baralhos = baralhos;
    $scope.selecionarBaralho(0);
  })();
})

.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl : 'html/home.html',
    controller : 'HomeController'
  })
});
