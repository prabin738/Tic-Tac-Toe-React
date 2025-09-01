import React, { useState } from "react";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  function getWinner(squares) {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function handleSquareClick(index) {
    if (board[index] || getWinner(board)) return;

    const updateBoard = [...board];
    updatedBoard[index] = isXTurn ? "X" : "0";

    setBoard(updatedBoard);
    setIsXTurn(!isXTurn);
  }

  function getGameStatus() {
    const winner = getWinner(board);

    if (winner) return `Winner is ${winner}`;
    if (board.every((square) => square !== null)) {
      return "It's a draw";
    }
    return `Next Player: ${isXTurn ? "X" : "O"}`;
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-[400px] mx-5">
        <h1 className="text-5xl font-semibold text-white mb-8">Tic Tac Toe</h1>
        <div
          className={`text-center mb-6 ${
            getWinner(board)
              ? "text-2xl font-bold text-green-400 animate-bounce"
              : "text-xl text-white"
          }`}
        >
          {getGameStatus()}
        </div>
        <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden mb-6">
          {board.map((square, index) => (
            <button
              key={index}
              onClick={() => handleSquareClick(index)}
              className={` h-32 w-full bg-gray-800 rounded-md text-6xl font-light transition-colors duration-200 hover:bg-gray-700  ${
                square === "X" ? "text-white" : "text-slate-400"
              } `}
            >
              {square}
            </button>
          ))}
        </div>
        <button
          className=" w-full py-3 text-lg text-white border rounded-2xl hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200 cursor-pointer"
          onClick={resetGame}
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default App;
