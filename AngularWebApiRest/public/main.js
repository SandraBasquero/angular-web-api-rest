angular.module('angularTodo', []);  

function mainController($scope, $http) {
    $scope.formData = {};

    // Cuando se cargue la página, pide del API todos los TODOs
    $http.get('/api/todos')
        .success(function(data) {
            $scope.tareas = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Cuando se añade un nuevo TODO, manda el texto a la API
    $scope.createTodo = function(){
        $scope.formData.saveDate = Date(); //set date data

        console.log("----------- ");
        console.log($scope.formData.saveDate);
        //Envio del dato a la bbdd a través de la API, utilizando las rutas, que para eso están.
        $http.post('/api/todos', $scope.formData)
        	//si se añade con éxito, pintar el json creado en la pantalla
            .success(function(data) {
                $scope.formData = {}; //limpiar formData una vez añadido a la bd
                $scope.tareas = data;
            })
            //si da error, imprimir por consola un mensaje
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    // Borra un TODO despues de checkearlo como acabado
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.tareas = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
}






