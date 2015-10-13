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
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(b.rows()));
  return b.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

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

  var inner = function(board, row) {
    row = row || 0;
    if (row === board.rows().length) {
      return true;
    }

    for (var i = 0; i < board.rows().length; i++) {
      board.togglePiece(row, i);
      if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()|| board.hasAnyMajorDiagonalConflicts()||board.hasAnyMinorDiagonalConflicts()) {
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
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(b.rows()));
  return b.rows();
  // var b = new Board({n: n});

  // var inner = function(board, row, col) {
    
  //   console.log('inner called with:');
  //   console.log(board.rows());
  //   console.log('row:', row);
  //   console.log('col:', col);

  //   if (row === board.rows().length) {
  //     console.log('bottom row reached');
  //     console.log('returning true');
  //     return true;
  //   }
    
  //   if (col === board.rows().length) {
  //     console.log('last col reached');
  //     console.log('returning false');
  //     return false;
  //   }
    
  //   console.log('toggling piece...');
  //   board.togglePiece(row, col);
    
  //   if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()|| board.hasAnyMajorDiagonalConflicts()||board.hasAnyMinorDiagonalConflicts()) {
  //     console.log('conflicts found, untoggling piece...');
  //     board.togglePiece(row, col);
  //     console.log('calling inner with row, col + 1');
  //     inner(board, row, col + 1);
  //   } else {
  //     console.log('no conflicts found, calling inner with row + 1, col');
  //     inner(board, row + 1, 0);
  //     console.log('untoggling piece after calling inner with row + 1, col');
  //     board.togglePiece(row, col);
  //     console.log('calling inner with row, col + 1');
  //     inner(board, row, col + 1);
  //   }
    
  // };

  // console.log('starting it off by calling inner with b');
  // inner(b, 0, 0);
  // //console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // console.log('returning b.rows');
  // return b.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var b = new Board({n: n});
  var count = 0;

  var inner = function(board, row, col) {
    if (row === board.rows().length) {
      count++;
      return;
    }
    b.rows().forEach(function(el){
      console.log(el);
    })
    
    if (col === board.rows().length) {
      return;
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

  inner(b, 0, 0);
  console.log('Number of solutions for ' + n + ' queens:', count);
  return count;

  // inner function takes in array, value, index
  //   if index === arr.length
  //     count++
  //     return

  //   if current value === arr.length
  //     return

  //   increase value at index by 1

  //   if (conflicts)
  //     decrease value
  //     call inner with array, value++, index

  //   if (no conflicts)
  //     call inner with array, 0, index++
  //     decrement value
  //     call inner with array, value++, index
};
