var gameBoard = angular.module('gameBoardModule',['material-elements']);
gameBoard.service('gameState',['theGameBoard','mElements',function(gameBoard,mElements){
	var t3 = {};
	//symbol for the human player
	t3.human = "O";
	//symbol for the cpu player
	t3.cpu   = "X";
	//all potential winning moves
	t3.winningMoves = {
		win1:[0,1,2],
		win2:[3,4,5],
		win3:[6,7,8],
		win4:[0,3,6],
		win5:[1,4,7],
		win6:[2,5,8],
		win7:[0,4,8],
		win8:[2,4,6]
	};

	/**
	 * [updateCell: updates the index of the t3Board array]
	 * @param  {[int]}    cell   [index of the cell to update in t3Board array]
	 * @param  {[string]} player [the active player]
	 */
	t3.updateCell = function(cell,player){
		if(gameBoard.board[cell] === undefined && t3.finalGameState() === 0){
			gameBoard.board[cell] = player;
			return true;
		}else{
			return false;
		}
		
	}

	/**
	 * [gets all the open indices in the t3Board array]
	 * @return {[array]} [array of all the available spaces(indices) in t3Board]
	 */
	t3.availableMoves = function(){
	    var openMoves = [];
	    for(var i = 0,len = gameBoard.board.length; i < len;i++){
	        if(gameBoard.board[i] === undefined){
	            openMoves.push(i);
	        }    	
	    }
	    return openMoves;
	}

	/**
	 * [used to detremain if the game is over and the game state]
	 * @return {[int]} [the current state of the game.]
	 */
	t3.finalGameState = function(){
		if(t3.hasWon(t3.cpu)){
			//cpu won
			return 1;
		}else if(t3.hasWon(t3.human)){
			//human won
			return 2;
		}else if(t3.availableMoves().length === 0){
			//draw
			return 3;
		}else{
			//game is still in progress
			return 0;
		}
	}

	t3.gameOverState = function(){
		mElements.isGameOver = true;
		//var theState = finalGameState();
	}



	t3.hasWon = function(player){
	    var hasWon;
	    for(var key in t3.winningMoves){
	        hasWon = 0;
	        for(var i = 0,len = t3.winningMoves[key].length; i < len;i++){
	            if(gameBoard.board[ t3.winningMoves[key][i] ] === player){
	                hasWon+=1;
	            }
	            if(hasWon === 3){
	                return true;
	            }
	        }
	    }
	    return false;
	}
	return t3;
}]);

gameBoard.service('theGameBoard',function(){
	var theGameBoard = {};
	//the two way data bound array
	theGameBoard.board = new Array(9);

	theGameBoard.clearBoard = function(){
		theGameBoard.board = new Array(9);
	}
	return theGameBoard;
});