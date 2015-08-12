describe('t3KataControllers',function(){
	beforeEach(module('t3Kata'));

	var $controller;
	var gameBoard;

	beforeEach(inject(function(_$controller_,theGameBoard){
		$controller = _$controller_;
		gameBoard = theGameBoard.board;
	}));


	describe('game board array init',function(){
		it('Should return an array',function(){
			expect(gameBoard instanceof Array).toEqual(true);
		});
		it('Should have 9 indices',function(){
			expect(gameBoard.length).toEqual(9);
		});
	});



});