import React, { useState } from "react";

const StockProblemSolver = () => {
  const [inputRectangles, setInputRectangles] = useState([]);
  const [stockSheet, setStockSheet] = useState({ width: 1204, height: 864 });
  const [placedRectangles, setPlacedRectangles] = useState([]);
  const [inputWidth, setInputWidth] = useState("");
  const [inputHeight, setInputHeight] = useState("");

  const handleAddRectangle = (width, height) => {
    const newRectangle = { width, height };
    setInputRectangles([...inputRectangles, newRectangle]);
    setPlacedRectangles([]); // Clear previously placed rectangles when adding new input.
  };

  const solveStockProblem = () => {
    const rectanglesCopy = [...inputRectangles];
    const sortedRectangles = rectanglesCopy.sort(
      (a, b) => b.width * b.height - a.width * a.height
    );
  
    let x = 0; // Starting x-coordinate for placing rectangles
    let y = 0; // Starting y-coordinate for placing rectangles
    const placed = [];
    const stockWidth = stockSheet.width;
    const stockHeight = stockSheet.height;
  
    for (const rect of sortedRectangles) {
      if (x + rect.width <= stockWidth && y + rect.height <= stockHeight) {
        // If the rectangle fits horizontally, place it there
        placed.push({ ...rect, x, y });
        x += rect.width;
      } else {
        // If it doesn't fit horizontally, start a new row
        x = 0;
        y += rect.height;
  
        // If the new row doesn't fit vertically, start a new sheet
        if (y + rect.height > stockHeight) {
          x = 0;
          y = 0; // Start at the top of the new sheet
        }
  
        placed.push({ ...rect, x, y });
        x += rect.width;
      }
    }
  
    setPlacedRectangles(placed);
  };
  

  return (
    <div>
      <h2>2D Stock Problem Solver</h2>
      <div>
        Input Rectangle:
        <input
          type="number"
          placeholder="Width"
          onChange={(e) => setInputWidth(e.target.value)}
        />
        <input
          type="number"
          placeholder="Height"
          onChange={(e) => setInputHeight(e.target.value)}
        />
        <button onClick={() => handleAddRectangle(inputWidth, inputHeight)}>
          Add
        </button>
      </div>
      <button onClick={solveStockProblem}>Solve</button>
      <div>
        <h3>Placed Rectangles:</h3>
        <svg width={stockSheet.width} height={stockSheet.height}>
          {placedRectangles.map((rect, index) => (
            <rect
              key={index}
              x={stockSheet.width - rect.width}
              y={stockSheet.height - rect.height}
              width={rect.width}
              height={rect.height}
              fill="blue"
              stroke="black"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default StockProblemSolver;
