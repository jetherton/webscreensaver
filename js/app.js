function MenuCtrl($scope) {
    
  $scope.webPages = [
      {url:'http://npr.org'},
      {url:'http://cnn.com'}
  ];
 
  $scope.addWebPage = function() {
      $scope.webPages.push({url:$scope.webPageUrl});
      $scope.webPageUrl = '';
  };
 

  $scope.deleteWebPage = function() {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function(todo) {
          if (!todo.done) $scope.todos.push(todo);
      });
    };
}