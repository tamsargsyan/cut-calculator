import { CutOptimizer, Shape } from "cut-optimizer";
import "./style.scss";
import { useSelector } from "react-redux";
import ROTATE from "../../assets/rotate.png";
import { useEffect, useState } from "react";
import { uniqueId } from "lodash";

const CutOptimizerAlgorithm = () => {
  const layoutData = useSelector(state => state.layoutData);
  const modifiedData = layoutData.flatMap(item => {
    if (item.quantity > 1) {
      return Array.from({ length: item.quantity }, () => ({
        ...item,
        quantity: 1,
      }));
    } else {
      return [item];
    }
  });
  const SHEET_WIDTH = 2770;
  const SHEET_HEIGHT = 2040;
  const cut_opt = new CutOptimizer(SHEET_HEIGHT, SHEET_WIDTH);
  const shapes = modifiedData.map(data => new Shape(data.width, data.length));
  const optimizedsShapes = cut_opt.optimize(shapes, {
    width: SHEET_WIDTH,
    height: SHEET_HEIGHT,
    items: shapes,
  });
  const [sheets, setSheets] = useState([]);
  //   useEffect(() => {
  //     // if (
  //     //   optimizedsShapes.width <= SHEET_WIDTH &&
  //     //   optimizedsShapes.height <= SHEET_HEIGHT
  //     // ) {
  //     // }
  //     setSheets(prev => [
  //       {
  //         ...prev,
  //         sheet_id: uniqueId,
  //         ...optimizedsShapes,
  //       },
  //     ]);
  //   }, [optimizedsShapes]);

  const percent = 43.5;
  const calcPercent = val => {
    return Math.floor((val * percent) / 100);
  };
  return (
    <div className='cut-optimizer-container'>
      {sheets.map((sheet, i) => (
        <div className='cut-layout-container' key={i}>
          {/* <div className="cut-layout-width">2770 mm</div> */}
          <div
            style={{
              width: `${calcPercent(cut_opt.root.h)}px`,
              height: `${calcPercent(cut_opt.root.w)}px`,
            }}
            className='cut-layout'>
            {sheet.items.map((item, i) => {
              const width = calcPercent(item.width);
              const height = calcPercent(item.height);
              const marginLeft = calcPercent(item.x);
              const marginTop = calcPercent(item.y);
              return (
                // <div key={i} className="cutting-bin">
                <div
                  key={i}
                  className='cut-container'
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    marginLeft: `${marginLeft}px`,
                    marginTop: `${marginTop}px`,
                    background: layoutData[i]?.color,
                  }}>
                  <button className='rotateBtn'>
                    <img src={ROTATE} alt='Rotate' className='rotateImg' />
                  </button>
                  <div className='cut-width'>{item.width}</div>
                  <span className='text'></span>
                  <div className='cut-height'>{item.height}</div>
                </div>
                // </div>
              );
            })}
            {/* {drawShapes(optimizedsShapes)} */}
          </div>
          {/* <div className="cut-layout-height">2040 mm</div> */}
        </div>
      ))}
    </div>
  );
};

export default CutOptimizerAlgorithm;
