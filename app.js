var testApp = angular.module('testApp', ['ngRoute']);

testApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/',{
			templateUrl: 'pages/main-page.html',
			controller: 'mainPageController'
		})
		.when('/task/:taskId', {
			templateUrl: 'pages/task-page.html',
			controller: 'taskPageController'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

testApp.directive('taskElement', function(){
	return {
		templateUrl: 'directives/task.html',
		scope: {
			taskObject: '='
		}
	}
});



testApp.controller('mainPageController', ['$scope', 'tasksService', function($scope, tasksService){

	tasksService.getTasks()
	.then(function(tasks){
		$scope.tasks = tasks;
	}) 

}]);


testApp.controller('taskPageController', ['$scope', '$routeParams', 'tasksService', function($scope, $routeParams, tasksService){

	$scope.taskObject = tasksService.getTaskById($routeParams.taskId)[0]; 

}]);

testApp.service('tasksService', function($http, $q){  
  var _this = this;
  this.tasks = []; 

  this.getTaskById = function(id){
  	return this.tasks.filter(function(el){
  		return el.id == id;
  	});
  };

  this.getTasks = function() {
  	var defferd = $q.defer();

  	$http({
	  	method: 'GET',
	  	url: '/tasks0.json'
	  })
	  .then(function(data){
	  	_this.tasks = data.data;
	  	defferd.resolve(_this.tasks)
	  })

  	return defferd.promise;
  };

});