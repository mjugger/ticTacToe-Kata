describe('t3AiServices',function(){
	beforeEach(module('t3AiModule'));
	var testBoard = {
		board:null
	};

	beforeEach(function(){
		testBoard.board = new Array(9);
		module(function($provide){
			$provide.value('theGameBoard',testBoard);
		});
	});

	var t3Ai;
	var gameStateMock;
	beforeEach(inject(function(t3_ai){
		t3Ai = t3_ai;
	}));

	describe('t3 AI return values',function(){
		it('Should have a property bestMove',function(){
			expect(t3Ai.callAI().hasOwnProperty('bestMove')).toEqual(true);
		});
		it('and bestMove should equal an integer',function(){
			expect(typeof t3Ai.callAI().bestMove === 'number').toEqual(true);
		});
		it('Should have a property bestScore',function(){
			expect(t3Ai.callAI().hasOwnProperty('bestScore')).toEqual(true);
		});
		it('and bestScore should equal an integer',function(){
			expect(typeof t3Ai.callAI().bestScore === 'number').toEqual(true);
		});
	});

	describe('t3 AI behaviors',function(){

		it('should block human if human can win',function(){
			testBoard.board[0] = 'O';
			testBoard.board[6] = 'O';
			testBoard.board[4] = 'X';
			expect(t3Ai.callAI().bestMove).toEqual(3);
			/*
			ai to block at square 4(indice 3)
			[O,-,-
			 X,X,-
			 O,-,-]
			 */
		});

		it('should make winning move if available',function(){
			testBoard.board[0] = 'O';
			testBoard.board[1] = 'O';
			testBoard.board[5] = 'O';
			testBoard.board[2] = 'X';
			testBoard.board[4] = 'X';
			expect(t3Ai.callAI().bestMove).toEqual(6);
			/*
			ai to win at square 7(indice 6)
			[O,O,X
			 -,X,O
			 X,-,-]
			 */
		});
	});
});