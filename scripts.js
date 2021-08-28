const turnText = document.querySelector(".next-player");
const tiles = document.querySelectorAll(".square");

const gameBoard = (() => {

  let tiles = {0:undefined, 1:undefined, 2:undefined,
               3:undefined, 4:undefined, 5:undefined,
               6:undefined, 7:undefined, 8:undefined,};

  let turnPlayerX = true;

  const makePlay = (tile) => {
    if (turnPlayerX) {
      tiles[tile] = "X";
      turnPlayerX = !turnPlayerX;
    } else if (!turnPlayerX) {
      tiles[tile] = "O";
      turnPlayerX = !turnPlayerX;
    } else {
      return null
    }
  }

  const updateTurnText = () => {
    if (!turnPlayerX) {
      // console.log(turnPlayerX);
      turnText.innerText = "Next turn: player X";
    } else {
      // console.log(turnPlayerX);
      turnText.innerText = "Next turn: player O";
    }
  }

  const checkPlayerWin = () => {
      const lines = [[0, 1, 2],
                     [3, 4, 5],
                     [6, 7, 8],
                     [0, 3, 6],
                     [1, 4, 7],
                     [2, 5, 8],
                     [0, 4, 8],
                     [2, 4, 6]];
      for (let i = 0; i < lines.length; i++) {
        const  [a, b, c] = lines[i];
        if (
          tiles[a] &&
          tiles[a] == tiles[b] &&
          tiles[b] == tiles[c]
        ) {
          return tiles[a]
        }
      }
      return null
  }

  const fillTile = (tile) => {
    if (turnPlayerX) {
      tile.innerText = "X";
    } else if (!turnPlayerX) {
      tile.innerText = "O";
    }
  }

  return {makePlay, updateTurnText, checkPlayerWin, fillTile}

})();



tiles.forEach((tile) => {
  tile.addEventListener('click', function playGame(e) {
    const tileNumber = parseInt(e.currentTarget.dataset.sqrNmb);
    gameBoard.fillTile(tile);
    gameBoard.makePlay(tileNumber);
    gameBoard.updateTurnText();
    tile.removeEventListener('click', playGame)

    if (gameBoard.checkPlayerWin()) {
      alert(`Player ${gameBoard.checkPlayerWin()} wins!`);
    }
  })
});
