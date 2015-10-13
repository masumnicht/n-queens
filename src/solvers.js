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



window.findNRooksSolution = function(n) {
  
  var b = new Board({n: n});

  var inner = function(board, row) {
    row = row || 0;
    if (row === board.rows().length) {
      return true;
    }

    for (var i = 0; i < board.rows().length; i++) {
      board.togglePiece(row, i);
      if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
        board.togglePiece(row, i);
        continue;
      }
      if (inner(board, row + 1)) {
        
        return true;
      } else {
        board.togglePiece(row, i);
        continue; 
      }
    }
    return false;
  };

  inner(b);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(b.rows()));
  return b.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {


  // inner function takes in current board, row and col
    // if row === length
      // increment solution counter 

    // if col === length
      // return false

    // toggle piece at this row, col

    // check conflicts
      // if none, call inner with board, row++, 0
        // if inner returns false, untoggle, call inner with board, row, col++


      // if conflicts, untoggle, call inner with board, row, col++  



  
  var b = new Board({n: n});
  var count = 0;

  var inner = function(board, row, col) {
    if (row === board.rows().length) {
      count++;
      return;
    }

    if (col === board.rows().length) {
      //inner(board, row+1, 0);
      return;
    }

    board.togglePiece(row, col);
    
    if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
      board.togglePiece(row, col);
      inner(board, row, col + 1);
    } else {
      inner(board, row + 1, 0);
      board.togglePiece(row, col);
      inner(board, row, col + 1);
    }

  };

  inner(b, 0, 0);
  console.log('Number of solutions for ' + n + ' rooks:', count);
  return count;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var b = new Board({n: n});
  for (var i = 0; i < b.rows().length; i++){
    for(var j = 0; j < b.rows()[i].length; j++) {
      b.togglePiece(i,j);
      if(b.hasRowConflictAt(i) || b.hasColConflictAt(j)|| b.hasAnyMajorDiagonalConflicts()||b.hasAnyMinorDiagonalConflicts()){
        b.togglePiece(i,j);
      }
    }

  }
  

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(b.rows()));
  return b.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
