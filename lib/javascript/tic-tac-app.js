var t3Kata = angular.module('t3Kata',[]);

t3Kata.controller('t3Board',['$scope',function($scope){
	$scope.human = "O";
	$scope.cpu   = "X";
	$scope.humanMove = function(e){
		console.log(e);
	}
}]);