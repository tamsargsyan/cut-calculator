import React, { useState } from 'react';

function InputData({ onDataPrepared }) {
    const [items, setItems] = useState([
        {
            width: 300,
            height: 200,
            count: 5,
        },
        {
            width: 150,
            height: 200,
            count: 4,
        },
    ]);
    const [sheetSize] = useState({ width: 2800, height: 2070 });
    const [preparedData, setPreparedData] = useState([]);

    const handleGenerate = () => {
        // Prepare the data with x and y coordinates for items on the sheet
        prepareDataForGeneticAlgorithm(sheetSize, items);
    };

    // Function to prepare data with x and y coordinates
    const prepareDataForGeneticAlgorithm = (sheetSize, items) => {
        let x = 0;
        let y = 0;

        // Create an array to hold the prepared data
        const preparedData = [];

        items.forEach((item) => {
            for (let i = 0; i < item.count; i++) {
                if (x + item.width <= sheetSize.width) {
                    // Place the item at (x, y) and update x for the next item
                    preparedData.push({ x, y, width: item.width, height: item.height });

                    // Move the x coordinate to the right
                    x += item.width;
                } else {
                    // If the item doesn't fit horizontally, move to the next row
                    x = 0;
                    y += item.height;

                    // Check if the item fits vertically
                    if (y + item.height > sheetSize.height) {
                        // Handle the case where the sheet is full or the item is too large
                        console.error('Sheet is full or item is too large.');
                        break;
                    }

                    // Place the item at (x, y) on the new row
                    preparedData.push({ x, y, width: item.width, height: item.height });

                    // Move the x coordinate to the right
                    x += item.width;
                }
            }
        });

        // Update the state with the prepared data
        setPreparedData(preparedData);

        // Notify the parent component about the prepared data
        onDataPrepared(preparedData);
    };

    return (
        <div>
            <h2>Input Data</h2>
            {/* Add form elements to input item dimensions and sheet size */}
            {/* <button onClick={handleGenerate}>Generate Layout</button> */}
        </div>
    );
}

export default InputData;
