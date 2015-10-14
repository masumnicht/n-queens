/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findSolution = function(board, row, col, validator, callback) {

  if (row === board.get('n')) {
    return callback();
  }
  
  if (col === board.get('n')) {
    return false;
  }

  board.togglePiece(row, col);
  
  if (!board[validator]()) {
    var result = findSolution(board, row + 1, 0, validator, callback);
    if (result) {
      return result;
    }    
  }

  board.togglePiece(row, col);

  if (col !== board.get('n')) {
    return findSolution(board, row, col + 1, validator, callback);
  }
  
}

window.findNRooksSolution = function(n) {

  var board = new Board({n: n});
  
  return findSolution(board, 0, 0, 'hasAnyRooksConflicts', function() {
    return _.map(board.rows(), function(row){
      return row.slice();
    })
  });
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  
  // var board = new Board({n: n});
  // var solutionCount = 0;

  // findSolution(board, 0, 0, 'hasAnyRooksConflicts', function() {
  //   solutionCount++;
  // })
  // return solutionCount;

  // var factorial = function(num) {
  //   if (num === 1) {
  //     return 1;
  //   }
  //   return num * factorial(num - 1);
  // };

  // return factorial(n);
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var board = new Board({n: n});

  return findSolution(board, 0, 0, 'hasAnyQueensConflicts', function() {
    return _.map(board.rows(), function(row) {
      return row.slice();
    })
  }) || board.rows();
  
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  
  var board = new Board({n: n});
  var solutionCount = 0;

  findSolution(board, 0, 0, 'hasAnyQueensConflicts', function() {
    solutionCount++;
  })
  return solutionCount;
};
