angular.module('events.services', [])

.factory('EventosService', function($http) {
  // Might use a resource here that returns a JSON array

  var apiUrl = "http://localhost:8000/events/api/eventos/";
  
  return {
    all: function() {
      return $http.get(apiUrl);
    },
    remove: function(eventoId) {
      return $http.delete(apiUrl + eventoId + "/");
    },
    create: function(evento) {
      return $http.post(apiUrl, evento);
    },
    get: function(eventoId) {
      return $http.get(apiUrl + eventoId);
    }
  };
});





