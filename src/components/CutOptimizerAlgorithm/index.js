import { CutOptimizer, Shape } from "cut-optimizer";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import ROTATE from "../../assets/rotate.png";
import { useEffect, useState } from "react";
import { uniqueId } from "lodash";
import { materials } from "../Materials/materialsData";
import { rotateDimension } from "../../redux/actions";

export const SHEET_WIDTH = 1000; //2770;
export const SHEET_HEIGHT = 1000; //2040;

const CutOptimizerAlgorithm = ({ sheets, setSheets }) => {
  let id = 0;
  const dimensions = useSelector(state => state.dimensions);
  const modifiedData = dimensions.flatMap(item => {
    if (+item.quantity > 1) {
      return Array.from({ length: +item.quantity }, () => ({
        ...item,
        quantity: 1,
        id: ++id,
      }));
    } else {
      return [item];
    }
  });

  let sheetObj = {};
  let uniqID = 0;

  // const [sheets, setSheets] = useState([]);

  let xx = [];

  const cut_opt = new CutOptimizer(SHEET_HEIGHT, SHEET_WIDTH);
  //const shapes = modifiedData.map(data => new Shape(+data.height, +data.width));

  let x = 0;
  useEffect(() => {
    const shapes = modifiedData.map(function (data) {
      let obj = new Shape(+data.height, +data.width);
      obj.id = data.id;
      return obj;
    });

    //const optimizedsShapes = cut_opt.optimize(shapes/*, {inPlace: true}*/);

    let sheetObj = [];
    let uniqID = 0;

    let optimizedsShapes = cut_opt.optimize(shapes);
    let unfiltered = optimizedsShapes.items.filter(
      ({ x, y }) => x == "-1" && y == "-1"
    );
    let filtered = optimizedsShapes.items.filter(
      ({ x, y }) => x != "-1" && y != "-1"
    );

    sheetObj[uniqID] = filtered;

    let x = 0;
    while (unfiltered.length > 0 && ++x < 20) {
      filtered = [];
      unfiltered.forEach(function (elem) {
        let pos = shapes.findIndex(({ id }) => id == elem.item.id);
        filtered.push(shapes[pos]);
      });

      optimizedsShapes = cut_opt.optimize(filtered);
      unfiltered = optimizedsShapes.items.filter(
        ({ x, y }) => x == "-1" && y == "-1"
      );
      filtered = optimizedsShapes.items.filter(
        ({ x, y }) => x != "-1" && y != "-1"
      );

      sheetObj[++uniqID] = filtered;
    }

    setSheets(sheetObj);
  }, [dimensions]);

  const percent = 63.5;
  const calcPercent = val => {
    return Math.floor((val * percent) / 100);
  };

  const materialId = useSelector(state => state.materialId);

  // console.log("sheets >>", sheets);

  const dispatch = useDispatch();

  return (
    <div className='cut-optimizer-container'>
      {sheets.map((sheet, i) => (
        <div className='cut-layout-container' key={i}>
          <div className='sheet_number'>{i + 1}.</div>
          <div className='cut-layout-width'>{SHEET_WIDTH} mm</div>
          <div
            style={{
              width: `${calcPercent(cut_opt.root.h)}px`,
              height: `${calcPercent(cut_opt.root.w)}px`,
              backgroundImage: `url(${
                materials.find(material => material.id === materialId)?.img
              })`,
            }}
            className='cut-layout'>
            {sheet.map((item, i) => {
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
                    background: dimensions[i]?.color,
                  }}>
                  <button
                    className='rotateBtn'
                    onClick={() => {
                      // console.log(item);
                      dispatch(
                        rotateDimension(
                          item.item.width,
                          item.item.height,
                          uniqueId()
                        )
                      );
                    }}>
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
          <div className='cut-layout-height'>{SHEET_HEIGHT} mm</div>
        </div>
      ))}
    </div>
  );
};

export default CutOptimizerAlgorithm;
