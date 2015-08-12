var t3Kata = angular.module('t3Kata',['material-elements','gameBoardModule','t3AiModule']);

t3Kata.controller('t3Board',['$scope','mElements','theGameBoard','gameState','t3_ai',function($scope,mElements,theGameBoard,gameState,t3_ai){
	$scope.t3Board = theGameBoard;

	$scope.activeClass = function(player){
		if(player === gameState.cpu){
			return 'cpu-active';
		}else if(player === gameState.human){
			return 'human-active';
		}else{
			return 'btn-blank';
		}
	}

	/**
	 * [updates the t3Board and html table when a table cell is clicked]
	 * @param  {[int]} index [index of the clicked table cell]
	 */
	$scope.humanMove = function(index){
		var myMove = gameState.updateCell(index,gameState.human);
		//human's move was successful
		if(myMove){
			cpuMove();
		}
	    if(gameState.finalGameState() > 0){
	    	gameState.gameOverState();
	    }
	}

	/**
	 * [updates the t3Board array with the cpu move]
	 */
	function cpuMove(){
		var ai_payload = {
			gameState:gameState,
			gameBoard:$scope.t3Board
		};
		var ai_move = t3_ai.callAI(ai_payload);
	    gameState.updateCell(ai_move.bestMove,gameState.cpu);
	    if(gameState.finalGameState() > 0){
	    	gameState.gameOverState();
	    }
	}


}]);

t3Kata.controller('btn', ['$scope','mElements','theGameBoard', function($scope,mElements,theGameBoard){
	$scope.restartGame = mElements.resetBtnVisibility;
	$scope.playAgain = function(){
		mElements.isGameOver = false;
		theGameBoard.clearBoard();
	}
}]);