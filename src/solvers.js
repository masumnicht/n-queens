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

  var solution; 

  var inner = function(board, row, col) {
    if (solution) {
      return;
    } else {
      if (row === board.rows().length) {
        var sol = [];
        for (var i = 0; i < board.rows().length; i++) {
          var arr = (JSON.parse(JSON.stringify(board.get(i))));
          sol.push(arr);
        }
        solution = sol;

        return true;
      }
      
      if (col === board.rows().length) {
        return false;
      }

      board.togglePiece(row, col);

      if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
        board.togglePiece(row, col);
        inner(board, row, col + 1);
      } else {
        if (inner(board, row + 1, 0) === true) {
          return true;
        } else {
          board.togglePiece(row, col);
          inner(board, row, col + 1);
        }
      }
    }
  };

  var empty = new Board({n: n});
  inner(empty, 0, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

  
  // var b = new Board({n: n});

  // var inner = function(board, row) {
  //   row = row || 0;
  //   if (row === board.rows().length) {
  //     return true;
  //   }

  //   for (var i = 0; i < board.rows().length; i++) {
  //     board.togglePiece(row, i);
  //     if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
  //       board.togglePiece(row, i);
  //       continue;
  //     }
  //     if (inner(board, row + 1)) {
        
  //       return true;
  //     } else {
  //       board.togglePiece(row, i);
  //       continue; 
  //     }
  //   }
  //   return false;
  // };

  // inner(b);
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(b.rows()));
  // return b.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  
  var factorial = function(num) {
    if (num === 1) {
      return 1;
    }
    return num * factorial(num - 1);
  };

  return factorial(n);
  
  // var b = new Board({n: n});
  // var count = 0;

  // var inner = function(board, row, col) {
  //   if (row === board.rows().length) {
  //     count++;
  //     return;
  //   }

  //   if (col === board.rows().length) {
  //     //inner(board, row+1, 0);
  //     return;
  //   }

  //   board.togglePiece(row, col);
    
  //   if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
  //     board.togglePiece(row, col);
  //     inner(board, row, col + 1);
  //   } else {
  //     inner(board, row + 1, 0);
  //     board.togglePiece(row, col);
  //     inner(board, row, col + 1);
  //   }

  // };

  // inner(b, 0, 0);
  // console.log('Number of solutions for ' + n + ' rooks:', count);
  // return count;

};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var solution;

  var inner = function(board, row, col) {
    
    if (solution) {
      return;
    } else {
      if (row === board.rows().length) {
        var sol = [];
        for (var i = 0; i < board.rows().length; i++) {
          var arr = (JSON.parse(JSON.stringify(board.get(i))));
          sol.push(arr);
        }
        solution = sol;

        return true;
      }
      
      if (col === board.rows().length) {
        return false;
      }

      board.togglePiece(row, col);
      
      if (board.hasAnyRowConflicts() || 
          board.hasAnyColConflicts() || 
          board.hasAnyMajorDiagonalConflicts() || 
          board.hasAnyMinorDiagonalConflicts()) {

        board.togglePiece(row, col);
        inner(board, row, col + 1);

      } else {

        if (inner(board, row + 1, 0) === true) {
          return true;
        } else {
          board.togglePiece(row, col);
          inner(board, row, col + 1);
        }

      }
    }
    
  };

  var empty = new Board({n: n});
  inner(empty, 0, 0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

  if (solution === undefined) {
    return empty.rows();
  }
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  
  var count = 0;

  var inner = function(board, row, col) {
    if (row === board.rows().length) {
      count++;
      return true;
    }
    
    if (col === board.rows().length) {
      return false;
    }

    board.togglePiece(row, col);
    
    if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()|| board.hasAnyMajorDiagonalConflicts()||board.hasAnyMinorDiagonalConflicts()) {
      board.togglePiece(row, col);
      inner(board, row, col + 1);
    } else {
      inner(board, row + 1, 0);
      board.togglePiece(row, col);
      inner(board, row, col + 1);
    }

  };

  var empty = new Board({n: n});
  inner(empty, 0, 0);
  console.log('Number of solutions for ' + n + ' queens:', count);
  return count;
};
