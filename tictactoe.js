var sounds = ['slap.wav','punch1.wav','punch2.wav'];
function playSound(sound) {
  var audio = new Audio('sounds/' + sound);
  audio.play();
}

angular.module('tictactoe', [])
  .controller('ticTacToeCtrl',
  ['$scope',
  function($scope) {
  	$scope.currPlayer = 'X';
    $scope.board = [
    	[ { value: ' ' }, { value: ' ' }, { value: ' ' } ],
    	[ { value: ' ' }, { value: ' ' }, { value: ' ' } ],
    	[ { value: ' ' }, { value: ' ' }, { value: ' ' } ]
  	];
    $scope.resetBoard = function() {
      $scope.board = [
      	[ { value: ' ' }, { value: ' ' }, { value: ' ' } ],
      	[ { value: ' ' }, { value: ' ' }, { value: ' ' } ],
      	[ { value: ' ' }, { value: ' ' }, { value: ' ' } ]
    	];
    }
    $scope.turn = function(cell) {
    	if (cell.value == ' ' || cell.value == '-') {
        $scope.playPunchSound();
      	cell.value = $scope.currPlayer;
        $scope.currPlayer = $scope.currPlayer == 'X' ? 'O' : 'X'; // swap turns;
        if($scope.checkForWin()) {
          $("#sound")[0].pause();
          setTimeout(function(){
            if(!alert("Player " + $scope.currPlayer + " wins!")) window.location.reload();
            $scope.resetBoard();
          }, 500);
          $scope.playWinSound();
        }
        else if ($scope.boardFull()) {
          $("#sound")[0].pause();
          setTimeout(function(){
            if(!alert("Cat's game!")) window.location.reload();
            $scope.resetBoard();
          }, 500);
          $scope.playFailSound();
        }
      }
    };
    $scope.checkForWin = function() {
      var board = $scope.board;
      //check rows
      for (var i = 0; i < 3; i++) {
        if ($scope.checkCells(board[i][0], board[i][1], board[i][2])) return true;
      }
      //check columns
      for (var i = 0; i < 3; i++) {
        if ($scope.checkCells(board[0][i], board[1][i], board[2][i])) return true;
      }
      //check diagonals
      if ($scope.checkCells(board[0][0], board[1][1], board[2][2])) return true;
      if ($scope.checkCells(board[2][0], board[1][1], board[0][2])) return true;

      return false;
    }
    $scope.checkCells = function(cell1, cell2, cell3) {
      return  cell1.value == cell2.value &&
              cell2.value == cell3.value &&
              cell1.value != ' ';
    }
    $scope.boardFull = function() {
      for(var y in $scope.board) {
        for(var x in $scope.board[y]) {
          if ($scope.board[x][y].value == ' ') return false;
        }
      }
      return true;
    }
    $scope.playPunchSound = function() {
      var i = Math.floor(Math.random() * 3);
      playSound(sounds[i]);
    }
    $scope.playFailSound = function() {
      playSound('failure.mp3');
    }
    $scope.playWinSound = function() {
      playSound('victory.mp3');
    }
  }
]);
