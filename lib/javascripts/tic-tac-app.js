var t3Kata = angular.module('t3Kata',['ngMaterial']);

t3Kata.controller('t3Board',['$scope',function($scope){
	//symbol for the human player
	$scope.human = "O";
	//symbol for the cpu player
	$scope.cpu   = "X";
	//the two way data bound array
	$scope.t3Board = new Array(9);
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

	function clearBoard(){
		$scope.t3Board = new Array(9);
	}

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
		updateCell(index,this.human);
		cpuMove();
		//console.log('gameOver: ',gameOver());
	}

	/**
	 * [updates the t3Board array with the cpu move]
	 */
	function cpuMove(){
	    var nextMove = minimax(4,$scope.cpu);
	    updateCell(nextMove[1],$scope.cpu);
	    console.log('nextMove: ',nextMove);
	}

	/**
	 * [updateCell: updates the index of the t3Board array]
	 * @param  {[int]}    cell   [index of the cell to update in t3Board array]
	 * @param  {[string]} player [the active player]
	 */
	function updateCell(cell,player){
		if(!gameOver() && $scope.t3Board[cell] === undefined){
			$scope.t3Board[cell] = player;
		}else{
			finalGameState();
		}
		console.log('$scope.t3Board:',$scope.t3Board,' openMoves ',availableMoves());
	}

	/**
	 * [gets all the open indices in the t3Board array]
	 * @return {[array]} [array of all the available spaces(indices) in t3Board]
	 */
	function availableMoves(){
	    var openMoves = [];
	    if(hasWon($scope.cpu) || hasWon($scope.human)){
	        return openMoves;
	    }
	    for(var i = 0,len = $scope.t3Board.length; i < len;i++){
	        if($scope.t3Board[i] === undefined){
	            openMoves.push(i);
	        }    	
	    }
	    return openMoves;
	}

	function gameOver(){
		var gameState = availableMoves();
		console.log(gameState);
		if(gameState.length === 0){
			return true;
		}else{
			return false;
		}
	}

	function finalGameState(){
		if(hasWon($scope.cpu)){
			return 1;
		}else if(hasWon($scope.human)){
			return -1;
		}else{
			//draw
			return 0;
		}
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
	    
	    if(openMoves.length === 0 || depth === 0){
	        bestScore = evaluateBoard();
	    }else{
	        for(var i = 0,len = openMoves.length; i< len;i++){
	            console.log('move ',openMoves[i]);
	            //try move
	            $scope.t3Board[openMoves[i]] = player;
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
	            $scope.t3Board[openMoves[i]] = undefined;
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
	    if($scope.t3Board[ coordinates[0] ] === $scope.cpu){
	        score = 1;
	    }else if($scope.t3Board[ coordinates[0] ] === $scope.human){
	        score = -1;
	    }
	    
	    if($scope.t3Board[ coordinates[1] ] === $scope.cpu){
	        if(score === 1){
	            score = 10;
	        }else if(score === -1){
	            return 0;
	        }else{
	            score = 1;
	        }
	    }else if($scope.t3Board[ coordinates[1] ] === $scope.human){
	        if(score === -1){
	            score = -10;
	        }else if(score === 1){
	            return 0;
	        }else{
	            score = -1;
	        }
	    }
	    
	    if($scope.t3Board[ coordinates[2] ] === $scope.cpu){
	        if(score > 0){
	            score *= 10;
	        }else if(score < 0){
	            return 0;
	        }else{
	            score = 1;
	        }
	    }else if($scope.t3Board[ coordinates[2] ] === $scope.human){
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
	            if($scope.t3Board[ $scope.winningMoves[key][i] ] === player){
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

t3Kata.controller('modal',['$scope','$modal',function($scope,$modal){
	var service = {}

	return service;
}]);