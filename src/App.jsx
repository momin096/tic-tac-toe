import React from "react";

function Square() {
  const [value, setValue] = React.useState(null);
  const handleClick = () => {
    setValue("X");
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="w-8 h-8 border border-gray-600 rounded-md"
      >
        {value}
      </button>
    </>
  );
}

export default function Board() {
  const [squares, stSquares] = React.useState(Array(9).fill(null));
  return (
    <>
      <div className="grid grid-cols-3   gap-2 max-w-28 mx-auto mt-10">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
