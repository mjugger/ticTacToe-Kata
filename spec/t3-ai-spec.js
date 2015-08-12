describe('t3AiServices',function(){
	beforeEach(module('t3AiModule'));

	var t3_ai;
	var gameStateMock;
	beforeEach(inject(function(t3_ai){
		gameBoard = t3_ai;
	}));

	beforeEach(function(){
		gameStateMock = {
			updateCell:function(params){},
			availableMoves:function(){},
			finalGameState:function(){},
			gameOverState:function(){},
			hasWon:function(){}
		};
	});

	describe('t3 AI behaviors',function(){

	});
});