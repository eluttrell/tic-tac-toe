
$(function() {
  $('.board').hide();
  $('.banner').hide();
  var lastClick = '';
  var arrX = [];
  var arrO = [];
  var wins = [['tl','tm','tr'],
              ['tl','ml','bl'],
              ['bl','bm','br'],
              ['br','mr','tr'],
              ['tl','mm','br'],
              ['bl','mm','tr'],
              ['ml','mm','mr'],
              ['tm','mm','bm']
            ];
  var winner = false;
  var win = '';
  var winArr = [];
  var xScore = 0;
  var oScore = 0;
  var drawScore = 0;

  $('#newGame').click(function() {
    $('.board').show();
    $('.rules').hide();
    $('.banner').show();
  });

  function keepScore(x) {
    if (x === 'O') {
      oScore += 1;
      $('#oScore').text(oScore);
    } else if (x === 'X') {
      xScore += 1;
      $('#xScore').text(xScore);
    } else {
      drawScore += 1;
      $('#drawScore').text(drawScore);
    }
  }

  function newGame() {
    $('.banner').show();
    $('#winner').hide();
    $('button.ttt').text('');
    $('button.ttt').css('background-color', '');
    keepScore(win);
    lastClick = '';
    arrX = [];
    arrO = [];
    winner = false;
    win = '';
    winArr = [];
  }

  function isWinner(arr){
    for (var i = 0; i < wins.length; i++) {
      var newArr = [];
      for (var j = 0; j < wins[i].length; j++) {
        for (var k = 0; k < arr.length; k++) {
          if (wins[i][j] === arr[k]) {
            newArr.push(arr[k]);
          }
        }
      }
      debugger
      if (newArr.length >= 3) {
        winArr.push(newArr);
        return true;
      }
    }
  }

  $('button.ttt').click(function() {
    var bClick = $(this).text();
    if (lastClick !== 'O' && bClick === '') {
      $(this).text('O');
      lastClick = 'O';
      arrO.push($(this).attr('id'));
    } else if (lastClick !== 'X' && bClick === '') {
      $(this).text('X');
      lastClick = 'X';
      arrX.push($(this).attr('id'));
    }
    if (isWinner(arrO) === true) {
      for (var i = 0; i < winArr[0].length; i++) {
        var o = winArr[0][i];
        $('#' + o).css('background-color', 'slategray');
      }
      win = 'O';
      winner = true;
    } else if (isWinner(arrX) === true) {
      for (var j = 0; j < winArr[0].length; j++) {
        var x = winArr[0][j];
        $('#' + x).css('background-color', 'slategray');
      }
      win = 'X';
      winner = true;
    } else if (arrX.length === 4 && arrO.length === 5) {
      win = 'D';
      winner = true;
    }
    // else if (isWinner(arrO) !== true && isWinner(arrX) !== true){
    //   win = 'D';
    //   winner = true;
    // }
    if (winner === true) {
      $('#winner').css('display', 'block');
      $('.banner').hide();
      if (win === 'X') {
        $('#whoWon').text('X');
      } else if (win === 'O') {
        $('#whoWon').text('O');
      } else {
        $('#nonDraw').css('display','none');
        $('#draw').css('display','block');
      }
    }
  });

  $('#again').click(function() {
    newGame();
  });
});
