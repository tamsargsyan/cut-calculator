import "./style.scss";
// import { useSelector } from "react-redux";

const payload = [
  {
    length: 300,
    width: 200,
    quantity: 1,
  },
  {
    length: 100,
    width: 300,
    quantity: 1,
  },
  {
    length: 240,
    width: 120,
    quantity: 1,
  },
  {
    length: 200,
    width: 240,
    quantity: 1,
  },
  {
    length: 400,
    width: 100,
    quantity: 1
  },
  {
    length: 1000,
    width: 1000,
    quantity: 2,
  }
]

const ShowcaseLayout = () => {
  const updatedLayoutData = payload.reduce((acc, item) => {
    const { quantity, ...rest } = item;
    return acc.concat(Array.from({ length: quantity }, () => ({ ...rest })));
  }, []);
  const sheetSize = {
    length: 2770,
    width: 2040
  }
  //@info percent value
  const percent = 43.5;
  const calcPercent = (val) => {
    return Math.floor((val * percent) / 100);
  };
  const generateLayout = () => {
    const layout = [];
    let currentX = 0;
    let currentY = 0;
    let maxHeightInRow = 0; // Track the maximum height in the current row

    const sortedData = [...updatedLayoutData];
    sortedData.sort((a, b) => {
      if (b.width === a.width) {
        // If widths are the same, prioritize by length
        return b.length - a.length;
      }
      return b.width - a.width;
    });

    sortedData.forEach((item, i) => {
      if (currentX + item.length > sheetSize.length) {
        // If the item's length is greater than the remaining space in the current row,
        // start a new row.
        currentX = 0;
        currentY = maxHeightInRow; // Move to the height of the previous row
        maxHeightInRow = 0; // Reset the maximum height in the current row
      }

      const layoutItem = {
        x: currentX,
        y: currentY,
        w: item.length,
        h: item.width,
        i: i.toString(),
        static: false,
      };

      layout.push(layoutItem);

      // Update the maximum height in the current row
      maxHeightInRow = Math.max(maxHeightInRow, currentY + item.width);

      // Move to the next position to the right
      currentX += item.length;
    });

    return layout;
  };


  // console.log(generateLayout())
  const generateCuttingDOM = () => {
    return generateLayout().map((bin, binIndex) => {
      const width = calcPercent(bin.w)
      const height = calcPercent(bin.h)
      const marginLeft = calcPercent(bin.x)
      const marginTop = calcPercent(bin.y)
      return (
        <div key={binIndex} className="cutting-bin">
          <div
            className="cut-container"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              marginLeft: `${marginLeft}px`,
              marginTop: `${marginTop}px`,
            }}
          >
            <div className="cut-width">{bin.w}</div>
            <span className="text"></span>
            <div className="cut-height">{bin.h}</div>
          </div>
        </div>
      )
    })
  };

  return (
    <div className="cut-layout-container">
      <div className="cut-layout-width">2770 mm</div>
      <div className="cut-layout">{generateCuttingDOM()}</div>
      <div className="cut-layout-height">2040 mm</div>
    </div>
  );
};

export default ShowcaseLayout;
