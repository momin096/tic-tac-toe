import React from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="w-12 h-12 text-xl font-semibold border border-gray-500 rounded-md flex items-center justify-center hover:bg-gray-200"
    >
      {value}
    </button>
  );
}

function Board({ isTrue, squares, onPlay }) {
  const winner = calculateWinner(squares);

  const status = winner
    ? `Winner: ${winner}`
    : `Next Player: (${isTrue ? "X" : "O"})`;

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = isTrue ? "X" : "O";
    onPlay(nextSquares);
  };

  return (
    <>
      <div className="text-center text-lg font-semibold mt-2">{status}</div>

      <div className="grid grid-cols-3 gap-2 max-w-36 mx-auto mt-6">
        {squares.map((val, i) => (
          <Square key={i} value={val} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = React.useState([Array(9).fill(null)]);
  const [isTrue, setIsTrue] = React.useState(true);
  const [currentMove, setCurrentMove] = React.useState(0);

  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setIsTrue((prev) => !prev);
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
    setIsTrue(move % 2 === 0);
  };

  const moves = history.map((_, move) => {
    const description = move > 0 ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          className="text-blue-600 hover:underline"
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="text-center mt-6">
      <Board isTrue={isTrue} squares={currentSquares} onPlay={handlePlay} />
      <ol className="mt-4 list-disc list-inside">{moves}</ol>
    </div>
  );
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
