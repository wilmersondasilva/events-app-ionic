angular.module('events.controllers', [])

.controller('EventosCtrl', function($scope, EventosService, $ionicLoading) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.$on('$ionicView.beforeEnter', function(e) {
    getEventos();
    console.log("Entrou");
  });

  $scope.$on('$ionicView.beforeLeave', function(e) {
    $scope.eventos = [];
    console.log("Saiu");
  });
  
  
  function getEventos () {
    $ionicLoading.show({
      template: 'Carregando...'
    });

    EventosService.all()
      .success(function(response) {
        $scope.eventos = response;
      })
      .error(function(response) {
        alert(response);
      })
      .finally(function() {
        $ionicLoading.hide();
      });
  }
  

  $scope.remove = function(evento) {
    EventosService.remove(evento.id)
      .success(function(response) {
        getEventos();
      })
      .error(function(response) {
        alert(response);
      });
  };
})

.controller('EventoDetailCtrl', function($scope, $stateParams, EventosService) {
  EventosService.get($stateParams.eventoId)
    .success(function(response) {
      $scope.evento = response;
    })
    .error(function(response) {
      alert(response);
    });
  
})

.controller('CadastroEventoCtrl', function($scope, EventosService, $state) {
  
  $scope.salvar = function(evento) {
    EventosService.create(evento)
    .success(function(response) {
      $state.go('tab.eventos');    
    })
    .error(function(response) {
      alert(response);
    });
  };
});
