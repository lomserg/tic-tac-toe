const players = ["X", "O"];
const gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;
let gameBoardElem;

const createTitle = (title) => {
  const titleElem = document.createElement("h1");
  titleElem.textContent = title;

  document.body.appendChild(titleElem);
};

const makeGameBoardElem = () => {
  const gameBoardElem = document.createElement("div");

  gameBoardElem.classList.add("game-board");

  return gameBoardElem;
};

const makeSquareElem = (squareNumber) => {
  const squareElem = document.createElement("div");
  squareElem.classList.add("game-square");

  squareElem.addEventListener(
    "click",
    (e) => {
      const { target } = e;
      target.textContent = currentPlayer;
      gameBoard[squareNumber] = currentPlayer;
      console.log(gameBoard);
      checkBoard();
      switchPlayer();
    },
    { once: true }
  );

  return squareElem;
};

const checkBoard = () => {
  //gameboard
  // [0,1,2]
  // [3,4,5]
  // [6,7,8]

  const winningStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let winState of winningStates) {
    const [position1, position2, position3] = winState;
    console.log(position1, position2, position3);

    if (
      gameBoard[position1] !== "" &&
      gameBoard[position1] === gameBoard[position2] &&
      gameBoard[position1] === gameBoard[position3]
    ) {
      completeGame(`${gameBoard[position1]}'s wins!`);
      return;
    }
  }

  const allSquareUsed = gameBoard.every((square) => square !== "");
  if (allSquareUsed) {
    completeGame(`it's a draw`);
  }
};

const completeGame = (message) => {
  const overlayElem = document.createElement("div");
  overlayElem.style.position = "fixed";
  overlayElem.style.top = "0";
  overlayElem.style.left = "0";
  overlayElem.style.right = "0";
  overlayElem.style.bottom = "0";
  overlayElem.style.backgroundColor = "rgba(0,0,0,0.8)";
  overlayElem.style.display = "flex";
  overlayElem.style.flexDirection = "column";
  overlayElem.style.justifyContent = "center";
  overlayElem.style.alignItems = "center";
  overlayElem.style.textAlign = "center";

  const messageElem = document.createElement("h2");
  messageElem.textContent = message;
  messageElem.style.color = "white";
  messageElem.style.fontSize = "100px";
  overlayElem.appendChild(messageElem);

  const restartButtonElem = document.createElement("button");
  restartButtonElem.textContent = "Reset";
  restartButtonElem.style.backgroundColor = "transparent";
  restartButtonElem.style.color = "white";
  restartButtonElem.style.border = "1px solid white";
  restartButtonElem.style.padding = "10px 30px";

  restartButtonElem.addEventListener("click", () => {
    resetGame();
    document.body.removeChild(overlayElem);
  });
  overlayElem.appendChild(restartButtonElem);

  document.body.appendChild(overlayElem);
};

const switchPlayer = () => {
  if (currentPlayer === players[0]) {
    currentPlayer = players[1];
  } else {
    currentPlayer = players[0];
  }
};

const resetGame = () => {
  if (gameBoardElem) {
    document.body.removeChild(gameBoardElem);
  }
  gameBoardElem = makeGameBoardElem();

  for (let square = 0; square < 9; square++) {
    gameBoardElem.appendChild(makeSquareElem(square));
  }

  currentPlayer = players[0];
  gameBoard.fill("");
  document.body.appendChild(gameBoardElem);
};

// const test = makeSquareElem(2);
// console.log(test);
createTitle("Tic-Tac-Toe");
resetGame();
