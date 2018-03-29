var app = angular.module('myApp', []);

/*myctrl start*/
app.controller('myCtrl', function($scope, $http, socketFactory) {
   /*emit on socket factory */
    socketFactory.emit("factoryEmitCheck", "test");
   

   /*on method response from socket factory*/
    socketFactory.on("factoryEmitChecks", function(eventName, data) {
        alert(eventName + data);
    })
});
/*myctrl start ends*/


app.factory('socketFactory', function($rootScope) {
    /*socket url */
    var socket = io.connect("http://localhost:8080");
    /*socket url */

    return {
        on: function(eventName, callback) {

            socket.on(eventName, function() {

                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                console.log("emit done");
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        },
        removeAllListeners: function(eventName, callback) {
            socket.removeAllListeners(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        }
    };
});