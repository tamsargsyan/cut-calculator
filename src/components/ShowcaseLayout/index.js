import "./style.scss";
import { useSelector } from "react-redux";

const ShowcaseLayout = () => {
  const layoutData = useSelector((state) => state.layoutData);
  const updatedLayoutData = layoutData.reduce((acc, item) => {
    const { quantity, ...rest } = item;
    return acc.concat(Array.from({ length: quantity }, () => ({ ...rest })));
  }, []);

  //@info percent value
  const percent = 43.5;
  const calcPercent = (val) => {
    return Math.floor((val * percent) / 100);
  };
  const generateLayout1 = () => {
    return updatedLayoutData.map((l, i) => {
      return {
        x: 0,
        y: 0,
        w: l.length,
        h: l.width,
        i: i.toString(),
        static: false,
      };
    });
  };

  const sortedData = [...generateLayout1()];

  sortedData.sort((a, b) => b.h - a.h);

  sortedData.forEach((obj, index) => {
    obj.i = index.toString();
  });

  const solveCuttingStockWithMargins = (
    stockWidth,
    stockHeight,
    sewingMargin
  ) => {
    const pieces = [...generateLayout1()]; // Assuming generateLayout1 returns the pieces
    console.log(pieces, "pieces");

    pieces.forEach((piece) => {
      let width = calcPercent(piece.w);
      let height = calcPercent(piece.h);
      width += sewingMargin;
      height += sewingMargin;
    });

    const bins = [];
    pieces.forEach((piece) => {
      let placed = false;
      const width = calcPercent(piece.w);
      const height = calcPercent(piece.h);
      for (const bin of bins) {
        if (bin.remainingWidth >= width && bin.remainingHeight >= height) {
          bin.items.push(piece);
          bin.remainingWidth -= width;
          placed = true;
          break;
        }
      }

      // If not placed, create a new bin
      if (!placed) {
        const newBin = {
          remainingWidth: stockWidth - width,
          remainingHeight: stockHeight,
          items: [piece],
        };
        bins.push(newBin);
      }
    });

    return bins;
  };

  const cuttingBins = solveCuttingStockWithMargins(1204, 886, 0); // 10mm sewing margin
  const sewingMarginX = 0; // Adjust this value as needed
  const sewingMarginY = 0;
  const generateCuttingDOM = () => {
    let currentX = 0;
    let currentY = 0;

    return cuttingBins.map((bin, binIndex) => (
      <div key={binIndex} className="cutting-bin">
        {bin.items.map((item, itemIndex) => {
          const width = calcPercent(item.w);
          const height = calcPercent(item.h);

          const marginLeft = currentX + sewingMarginX;
          const marginTop = currentY + sewingMarginY;

          // Update currentX and currentY for the next piece placement
          currentX += width + sewingMarginX;
          if (currentX + width > 1204) {
            // Move to the next row
            currentX = 0;
            currentY += height + sewingMarginY;
          }

          return (
            <div
              key={itemIndex}
              className="cut-container"
              style={{
                width: `${width}px`,
                height: `${height}px`,
                marginLeft: `${marginLeft}px`,
                marginTop: `${marginTop}px`,
              }}
            >
              <div className="cut-width">{item.w}</div>
              <span className="text"></span>
              <div className="cut-height">{item.h}</div>
            </div>
          );
        })}
      </div>
    ));
  };

  console.log(cuttingBins);

  // https://stackoverflow.com/questions/49084941/2-dimensional-cutting-rod-algorithm
  // https://medium.com/analytics-vidhya/cutting-stock-problem-1d-df976f7263cd
  // https://github.com/staho/2d-cut-optimization#npm-start
  
  return (
    <div className="cut-layout-container">
      <div className="cut-layout-width">2770 mm</div>
      <div className="cut-layout">{generateCuttingDOM()}</div>
      <div className="cut-layout-height">2040 mm</div>
    </div>
  );
};

export default ShowcaseLayout;

// https://jsfiddle.net/pcfgxedv/1/
// best fit (descreasing)
// We present an asymptotic fully polynomial approximation scheme for strip-packing, or packing rectangles into a rectangle of fixed width and minimum height, a classical NP-hard cutting-stock problem. The algorithm, based on a new linear-programming relaxation, finds a packing of n rectangles whose total height is within a factor of (1 + ε) of optimal (up to an additive term), and has running time polynomial both in n and in 1/ε.