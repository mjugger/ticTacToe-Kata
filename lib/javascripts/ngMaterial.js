var ngMaterialEls = angular.module('material-elements',['ngMaterial']);
ngMaterialEls.factory('mElements', [function(){
	var serviceObj = {};
	serviceObj.isGameOver = false;

	serviceObj.resetBtnVisibility = function(){
		if(serviceObj.isGameOver){
			console.log('yep! isGameOver');
			return 'reset-btn-show';
		}
	}

	return serviceObj;
}])