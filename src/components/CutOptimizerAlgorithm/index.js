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
    if (+item.quantity > 1) {
      return Array.from({ length: +item.quantity }, () => ({
        ...item,
        quantity: 1,
      }));
    } else {
      return [item];
    }
  });

  const SHEET_WIDTH = 800;
  const SHEET_HEIGHT = 800;

  const [sheets, setSheets] = useState([]);
  const [sheetsCollected, setSheet] = useState([]);
  useEffect(() => {
    let sheetObj = [];
    let uniqID = 0;
    sheetObj[uniqID] = {
      sheet_id: uniqID,
      cut_opt: new CutOptimizer(SHEET_HEIGHT, SHEET_WIDTH),
      shapes: modifiedData.map(data => new Shape(+data.height, +data.width)),
    };

    sheetObj[uniqID]["optimizedsShapes"] = sheetObj[uniqID]["cut_opt"].optimize(
      sheetObj[uniqID]["shapes"],
      {
        width: SHEET_WIDTH,
        height: SHEET_HEIGHT,
        items: sheetObj[uniqID]["shapes"],
      }
    );

    //setSheets(sheetObj);
    //console.log("modifiedData>>", modifiedData);

    let lastIds = [];
    if (
      sheetObj[uniqID]["optimizedsShapes"].width <= SHEET_WIDTH &&
      sheetObj[uniqID]["optimizedsShapes"].height <= SHEET_HEIGHT
    ) {
      setSheets(sheetObj);
    } else {
      let lastElement = dimensions[dimensions.length - 1];
      lastIds.push(lastElement.id);
      let collectedItems = modifiedData.filter(
        ({ id }) => lastIds.indexOf(id) == -1
      );
      sheetObj[uniqID]["optimizedsShapes"]["items"] = collectedItems;

      let newModifiedData = modifiedData.filter(
        ({ id }) => id === lastElement?.id
      );

      uniqID++;

      let itr = 0;
      while (itr < 10 && newModifiedData.length !== 0) {
        // console.log("uID", uniqID, newModifiedData, "itr", ++itr);
        sheetObj[uniqID] = {
          sheet_id: uniqID,
          cut_opt: new CutOptimizer(SHEET_HEIGHT, SHEET_WIDTH),
          shapes: newModifiedData.map(
            data => new Shape(+data.height, +data.width)
          ),
        };

        sheetObj[uniqID]["optimizedsShapes"] = sheetObj[uniqID][
          "cut_opt"
        ].optimize(sheetObj[uniqID]["shapes"], {
          width: SHEET_WIDTH,
          height: SHEET_HEIGHT,
          items: sheetObj[uniqID]["shapes"],
        });

        if (
          sheetObj[uniqID]["optimizedsShapes"].width <= SHEET_WIDTH &&
          sheetObj[uniqID]["optimizedsShapes"].height <= SHEET_HEIGHT
        ) {
          setSheets(sheetObj);

          newModifiedData = [];
        } else {
          // console.log(
          //   'sheetObj[uniqID]["optimizedsShapes"] ---***',
          //   sheetObj[uniqID]["optimizedsShapes"]
          // );

          let lastElement = dimensions[dimensions.length - 1];
          lastIds.push(lastElement.id);

          let collectedItems = newModifiedData.filter(
            ({ id }) => lastIds.indexOf(id) == -1
          );
          sheetObj[uniqID]["optimizedsShapes"]["items"] = collectedItems;

          newModifiedData = newModifiedData.filter(
            ({ id }) => id === lastElement?.id
          );

          uniqID++;
        }
      }
    }

    //console.log("sheetObj >>", sheetObj);
  }, [dimensions]);

  // console.log("sheets", sheets);
  const percent = 43.5;
  const calcPercent = val => {
    return Math.floor((val * percent) / 100);
  };

  const materialId = useSelector(state => state.materialId);

  return (
    <div className='cut-optimizer-container'>
      {sheets.map((sheet, i) => {
        return (
          <div className='cut-layout-container' key={i}>
            {/* <div className="cut-layout-width">2770 mm</div> */}
            <div
              style={{
                width: `${calcPercent(sheet.cut_opt.root.h)}px`,
                height: `${calcPercent(sheet.cut_opt.root.w)}px`,
                backgroundImage: `url(${
                  materials.find(material => material.id === materialId)?.img
                })`,
              }}
              className='cut-layout'>
              {sheet.optimizedsShapes.items.map((item, i) => {
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
                    {/* <button className='rotateBtn'>
                      <img src={ROTATE} alt='Rotate' className='rotateImg' />
                    </button> */}
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
        );
      })}
    </div>
  );
};

export default CutOptimizerAlgorithm;
