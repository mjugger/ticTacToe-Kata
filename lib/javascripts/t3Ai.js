var t3Ai = angular.module('t3AiModule',[]);

t3Ai.service('t3_ai',['gameState',function(gameState){
var AIapi = {};
var boardData;
	AIapi.callAI = function(params){
		boardData = params;
		var ai_data = minimax(4,boardData.gameState.cpu);
		ai_data.cpu = boardData.gameState.cpu;
		return ai_data;
	}

	/**
	 * [minimax algorithm used for zero-sum games (fn is recursive)]
	 * @param  {[int]}    depth  [number of turns to look ahead]
	 * @param  {[string]} player [the active player]
	 * @return {[array]}         [returns both the best score and best move the cpu should make]
	 */
	function minimax(depth,player){
	    var openMoves = boardData.gameState.availableMoves();
	    var bestScore = (player === boardData.gameState.cpu) ? -100 : 100;
	    var bestMove = -1;
	    var currentScore;
	    
	    if(boardData.gameState.finalGameState() > 0 || depth === 0){
	        bestScore = evaluateBoard();
	    }else{
	        for(var i = 0,len = openMoves.length; i< len;i++){
	            //try move
	            boardData.gameBoard.board[openMoves[i]] = player;
	            if(player === boardData.gameState.cpu){
	                currentScore = minimax(depth - 1,boardData.gameState.human).bestScore;
	                if(currentScore > bestScore){
	                    bestScore = currentScore;
	                    bestMove = openMoves[i];
	                }
	            }else{
	                currentScore = minimax(depth - 1,boardData.gameState.cpu).bestScore;
	                if(currentScore < bestScore){
	                    bestScore = currentScore;
	                    bestMove = openMoves[i];
	                }
	            }
	            boardData.gameBoard.board[openMoves[i]] = undefined;
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
	    for(var line in boardData.gameState.winningMoves){
	    	score += evaluateLine( boardData.gameState.winningMoves[line] );
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
	    if(boardData.gameBoard.board[ coordinates[0] ] === boardData.gameState.cpu){
	        score = 1;
	    }else if(boardData.gameBoard.board[ coordinates[0] ] === boardData.gameState.human){
	        score = -1;
	    }
	    
	    if(boardData.gameBoard.board[ coordinates[1] ] === boardData.gameState.cpu){
	        if(score === 1){
	            score = 10;
	        }else if(score === -1){
	            return 0;
	        }else{
	            score = 1;
	        }
	    }else if(boardData.gameBoard.board[ coordinates[1] ] === boardData.gameState.human){
	        if(score === -1){
	            score = -10;
	        }else if(score === 1){
	            return 0;
	        }else{
	            score = -1;
	        }
	    }
	    
	    if(boardData.gameBoard.board[ coordinates[2] ] === boardData.gameState.cpu){
	        if(score > 0){
	            score *= 10;
	        }else if(score < 0){
	            return 0;
	        }else{
	            score = 1;
	        }
	    }else if(boardData.gameBoard.board[ coordinates[2] ] === boardData.gameState.human){
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