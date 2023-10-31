import React, { useState, useEffect } from 'react';

const data = [
    {
        width: 200,
        height: 400,
    },
    {
        width: 250,
        height: 120,
    },
    {
        width: 300,
        height: 100,
    },
    {
        width: 100,
        height: 300
    },
    {
        width: 600,
        height: 222
    }
    // Add more items as needed
];

const sheetWidth = 2800;
const sheetHeight = 2070;

const CutOptimizer2 = () => {
    const [bestSolution, setBestSolution] = useState([]);

    useEffect(() => {
        const optimizePlacement = () => {
            const sortedItems = [...data].sort((a, b) => b.height - a.height);
            const placements = [];
            let currentX = 0;
            let currentY = 0;
            let currentColumnHeight = 0;

            // Find the tallest item with the greatest width
            const tallestWithGreatestWidth = sortedItems.find(item => (
                item.height === sortedItems[0].height && item.width === sortedItems[0].width
            ));

            if (tallestWithGreatestWidth) {
                placements.push({
                    x: currentX,
                    y: currentY,
                    width: tallestWithGreatestWidth.width,
                    height: tallestWithGreatestWidth.height
                });

                currentX += tallestWithGreatestWidth.width;
                currentColumnHeight = tallestWithGreatestWidth.height;
            }

            for (const item of sortedItems) {
                if (item !== tallestWithGreatestWidth) {
                    if (
                        currentColumnHeight + item.height <= sheetHeight &&
                        item.width >= item.height &&
                        item.width <= placements[0].width - currentX
                    ) {
                        placements.push({
                            x: currentX,
                            y: currentY,
                            width: item.width,
                            height: item.height
                        });

                        currentX += item.width;
                        currentColumnHeight += item.height;
                    } else {
                        // Start a new column
                        currentX = 0;
                        currentY += currentColumnHeight;
                        currentColumnHeight = 0;

                        // Place the item in the new column
                        placements.push({
                            x: currentX,
                            y: currentY,
                            width: item.width,
                            height: item.height
                        });

                        currentX += item.width;
                        currentColumnHeight += item.height;
                    }
                }
            }

            return placements;
        };

        const bestPlacement = optimizePlacement();
        if (bestPlacement) {
            setBestSolution(bestPlacement);
        } else {
            setBestSolution("No optimal solution found. Consider a larger sheet.");
        }
    }, []);

    return (
        <div>
            <h1>Best Solution</h1>
            <pre>{JSON.stringify(bestSolution, null, 2)}</pre>
        </div>
    );
};

export default CutOptimizer2;
