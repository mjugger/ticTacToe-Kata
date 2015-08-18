var t3Ai = angular.module('t3AiModule',['gameBoardModule']);

t3Ai.service('t3_ai',['gameState','theGameBoard',function(gameState,theGameBoard){
var AIapi = {};
var boardData;
	AIapi.callAI = function(){
		var ai_data = minimax(4,gameState.cpu);
		return ai_data;
	}

	/**
	 * [minimax algorithm used for zero-sum games (fn is recursive)]
	 * @param  {[int]}    depth  [number of turns to look ahead]
	 * @param  {[string]} player [the active player]
	 * @return {[array]}         [returns both the best score and best move the cpu should make]
	 */
	function minimax(depth,player){
	    var openMoves = gameState.availableMoves();
	    var bestScore = (player === gameState.cpu) ? -100 : 100;
	    var bestMove = -1;
	    var currentScore;
	    
	    if(gameState.finalGameState() > 0 || depth === 0){
	        bestScore = evaluateBoard();
	    }else{
	        for(var i = 0,len = openMoves.length; i< len;i++){
	            //try move
	            theGameBoard.board[openMoves[i]] = player;
	            if(player === gameState.cpu){
	                currentScore = minimax(depth - 1,gameState.human).bestScore;
	                if(currentScore > bestScore){
	                    bestScore = currentScore;
	                    bestMove = openMoves[i];
	                }
	            }else{
	                currentScore = minimax(depth - 1,gameState.cpu).bestScore;
	                if(currentScore < bestScore){
	                    bestScore = currentScore;
	                    bestMove = openMoves[i];
	                }
	            }
	            theGameBoard.board[openMoves[i]] = undefined;
	        };
	    }
	    return {
	    	bestMove:bestMove,
	    	bestScore:bestScore
	    };
	}

	/**
	 * [evaluates the t3Board and scores all current moves and gives the level of advantage]
	 * @return {[type]} [the board's current score]
	 */
	function evaluateBoard(){
	    var score = 0;
	    for(var line in gameState.winningMoves){
	    	score += evaluateLine( gameState.winningMoves[line] );
	    }
	    return score;
	}

	/**
	 * [evaluates the board line by line]
	 * @param  {[array]} coordinates [coordinates of all 8 lines]
	 * @return {[type]}             [score for each line]
	 */
	function evaluateLine(coordinates){
	    var score = 0;
	    if(theGameBoard.board[ coordinates[0] ] === gameState.cpu){
	        score = 1;
	    }else if(theGameBoard.board[ coordinates[0] ] === gameState.human){
	        score = -1;
	    }
	    
	    if(theGameBoard.board[ coordinates[1] ] === gameState.cpu){
	        if(score === 1){
	            score = 10;
	        }else if(score === -1){
	            return 0;
	        }else{
	            score = 1;
	        }
	    }else if(theGameBoard.board[ coordinates[1] ] === gameState.human){
	        if(score === -1){
	            score = -10;
	        }else if(score === 1){
	            return 0;
	        }else{
	            score = -1;
	        }
	    }
	    
	    if(theGameBoard.board[ coordinates[2] ] === gameState.cpu){
	        if(score > 0){
	            score *= 10;
	        }else if(score < 0){
	            return 0;
	        }else{
	            score = 1;
	        }
	    }else if(theGameBoard.board[ coordinates[2] ] === gameState.human){
	        if(score < 0){
	            score *= 10;
	        }else if(score > 1){
	            return 0;
	        }else{
	            score = -1;
	        }
	    }
	    return score;
	}

	return AIapi;
}]);