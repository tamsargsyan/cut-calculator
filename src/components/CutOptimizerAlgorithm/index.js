import { CutOptimizer, Shape } from "cut-optimizer";
import "./style.scss";
import { useSelector } from "react-redux";
import ROTATE from "../../assets/rotate.png";
import { useEffect, useState } from "react";
import { uniqueId } from "lodash";
import { materials } from "../Materials/materialsData";

const CutOptimizerAlgorithm = () => {
  const dimensions = useSelector(state => state.dimensions);
  const modifiedData = dimensions.flatMap(item => {
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
  console.log(modifiedData);
  const cut_opt = new CutOptimizer(SHEET_HEIGHT, SHEET_WIDTH);
  const shapes = modifiedData.map(data => new Shape(data.width, data.height));
  const optimizedsShapes = cut_opt.optimize(shapes, {
    width: SHEET_WIDTH,
    height: SHEET_HEIGHT,
    items: shapes,
  });
  console.log(optimizedsShapes);
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

  const materialId = useSelector(state => state.materialId);

  return (
    <div className='cut-optimizer-container'>
      {sheets.map((sheet, i) => (
        <div className='cut-layout-container' key={i}></div>
      ))}
    </div>
  );
};

export default CutOptimizerAlgorithm;
