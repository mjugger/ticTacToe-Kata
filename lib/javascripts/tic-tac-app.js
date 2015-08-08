var t3Kata = angular.module('t3Kata',['material-elements']);

t3Kata.service('theGameBoard',function(){
	var theGameBoard = {};
	//the two way data bound array
	theGameBoard.board = new Array(9);

	theGameBoard.clearBoard = function(){
		theGameBoard.board = new Array(9);
	}
	return theGameBoard;
});

t3Kata.controller('t3Board',['$scope','mElements','theGameBoard',function($scope,mElements,theGameBoard){
	//symbol for the human player
	$scope.human = "O";
	//symbol for the cpu player
	$scope.cpu   = "X";
	//all potential winning moves
	$scope.winningMoves = {
	    win1:[0,1,2],
	    win2:[3,4,5],
	    win3:[6,7,8],
	    win4:[0,3,6],
	    win5:[1,4,7],
	    win6:[2,5,8],
	    win7:[0,4,8],
	    win8:[2,4,6]
	};

	$scope.t3Board = theGameBoard;

	$scope.activeClass = function(player){
		if(player === this.cpu){
			return 'cpu-active';
		}else if(player === this.human){
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
		var myMove = updateCell(index,this.human);
		//human's move was successful
		if(myMove){
			cpuMove();
		}
	    if(finalGameState()){
	    	gameOverState();
	    }
	}

	/**
	 * [updates the t3Board array with the cpu move]
	 */
	function cpuMove(){
	    var nextMove = minimax(4,$scope.cpu);
	    updateCell(nextMove[1],$scope.cpu);
	    if(finalGameState()){
	    	gameOverState();
	    }
	}

	/**
	 * [updateCell: updates the index of the t3Board array]
	 * @param  {[int]}    cell   [index of the cell to update in t3Board array]
	 * @param  {[string]} player [the active player]
	 */
	function updateCell(cell,player){
		if($scope.t3Board.board[cell] === undefined){
			$scope.t3Board.board[cell] = player;
			return true;
		}else{
			return false;
		}
		
	}

	/**
	 * [gets all the open indices in the t3Board array]
	 * @return {[array]} [array of all the available spaces(indices) in t3Board]
	 */
	function availableMoves(){
	    var openMoves = [];
	    // if(hasWon($scope.cpu) || hasWon($scope.human)){
	    //     return openMoves;
	    // }
	    for(var i = 0,len = $scope.t3Board.board.length; i < len;i++){
	        if($scope.t3Board.board[i] === undefined){
	            openMoves.push(i);
	        }    	
	    }
	    return openMoves;
	}

	function finalGameState(){
		if(hasWon($scope.cpu)){
			//cpu won
			return 1;
		}else if(hasWon($scope.human)){
			//human won
			return 2;
		}else if(availableMoves().length === 0){
			//draw
			return 3;
		}else{
			//game is still going
			return false;
		}
	}

	function gameOverState(){
		mElements.isGameOver = true;
		//var theState = finalGameState();
	}

	/**
	 * [minimax algorithm used for zero-sum games (fn is recursive)]
	 * @param  {[int]}    depth  [number of turns to look ahead]
	 * @param  {[string]} player [the active player]
	 * @return {[array]}         [returns both the best score and best move the cpu should make]
	 */
	function minimax(depth,player){
	    var openMoves = availableMoves();
	    var bestScore = (player === $scope.cpu) ? -100 : 100;
	    var bestMove = -1;
	    var currentScore;
	    
	    if(finalGameState() > 0 || depth === 0){
	        bestScore = evaluateBoard();
	    }else{
	        for(var i = 0,len = openMoves.length; i< len;i++){
	            //try move
	            $scope.t3Board.board[openMoves[i]] = player;
	            if(player === $scope.cpu){
	                currentScore = minimax(depth - 1,$scope.human)[0];
	                if(currentScore > bestScore){
	                    bestScore = currentScore;
	                    bestMove = openMoves[i];
	                }
	            }else{
	                currentScore = minimax(depth - 1,$scope.cpu)[0];
	                if(currentScore < bestScore){
	                    bestScore = currentScore;
	                    bestMove = openMoves[i];
	                }
	            }
	            $scope.t3Board.board[openMoves[i]] = undefined;
	        };
	    }
	    return [bestScore,bestMove];
	}

	/**
	 * [evaluates the t3Board and scores all current moves and gives the level of advantage]
	 * @return {[type]} [the board's current score]
	 */
	function evaluateBoard(){
	    var score = 0;
	    for(var line in $scope.winningMoves){
	    	score += evaluateLine( $scope.winningMoves[line] );
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
	    if($scope.t3Board.board[ coordinates[0] ] === $scope.cpu){
	        score = 1;
	    }else if($scope.t3Board.board[ coordinates[0] ] === $scope.human){
	        score = -1;
	    }
	    
	    if($scope.t3Board.board[ coordinates[1] ] === $scope.cpu){
	        if(score === 1){
	            score = 10;
	        }else if(score === -1){
	            return 0;
	        }else{
	            score = 1;
	        }
	    }else if($scope.t3Board.board[ coordinates[1] ] === $scope.human){
	        if(score === -1){
	            score = -10;
	        }else if(score === 1){
	            return 0;
	        }else{
	            score = -1;
	        }
	    }
	    
	    if($scope.t3Board.board[ coordinates[2] ] === $scope.cpu){
	        if(score > 0){
	            score *= 10;
	        }else if(score < 0){
	            return 0;
	        }else{
	            score = 1;
	        }
	    }else if($scope.t3Board.board[ coordinates[2] ] === $scope.human){
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

	function hasWon(player){
	    var hasWon;
	    for(var key in $scope.winningMoves){
	        hasWon = 0;
	        for(var i = 0,len = $scope.winningMoves[key].length; i < len;i++){
	            if($scope.t3Board.board[ $scope.winningMoves[key][i] ] === player){
	                hasWon+=1;
	            }
	            if(hasWon === 3){
	                return true;
	            }
	        }
	    }
	    return false;
	}

}]);

t3Kata.controller('btn', ['$scope','mElements','theGameBoard', function($scope,mElements,theGameBoard){
	$scope.restartGame = mElements.resetBtnVisibility;
	$scope.playAgain = function(){
		mElements.isGameOver = false;
		theGameBoard.clearBoard();
	}
}]);