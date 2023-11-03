import { CutOptimizer, Shape } from "cut-optimizer";
import "./style.scss";
import { useSelector } from "react-redux";
import ROTATE from "../../assets/rotate.png";
import { useEffect, useState } from "react";
import { uniqueId } from "lodash";
import { materials } from "../Materials/materialsData";

export const modifiedDataCalc = dimensions =>
  dimensions.flatMap(item => {
    if (+item.quantity > 1) {
      return Array.from({ length: +item.quantity }, () => ({
        ...item,
        quantity: 1,
      }));
    } else {
      return [item];
    }
  });

const CutOptimizerAlgorithm = ({ sheets, setSheets }) => {
  const dimensions = useSelector(state => state.dimensions);
  const modifiedData = modifiedDataCalc(dimensions);
  const SHEET_WIDTH = 3600;
  const SHEET_HEIGHT = 1800;

  let fits = true;
  let pos = 0;
  let count = 1;
  let shapesData = modifiedData.slice(pos, count);
  useEffect(() => {
    let sheetObj = [];
    let uniqID = 0;

    if (shapesData.length > 0) {
      while (fits) {
        sheetObj[uniqID] = {
          sheet_id: uniqID,
          cut_opt: new CutOptimizer(SHEET_HEIGHT, SHEET_WIDTH),
          shapes: shapesData.map(data => new Shape(+data.height, +data.width)),
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
          if (count >= modifiedData.length) {
            fits = false;
          } else {
            shapesData = modifiedData.slice(pos, ++count);
          }
        } else {
          shapesData = modifiedData.slice(pos, --count);

          shapesData.forEach(function (entry) {
            entry.sheet_id = uniqID;
          });

          sheetObj[uniqID] = {
            sheet_id: uniqID,
            cut_opt: new CutOptimizer(SHEET_HEIGHT, SHEET_WIDTH),
            shapes: shapesData.map(
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

          uniqID++;
          pos = count;

          // console.log(count, modifiedData.length, "tex chka >>", uniqID, pos);

          /*count++;
          if(modifiedData[count]!=undefined)
          {
            shapesData.push( modifiedData[count] ); 

          console.log(count, "shapesData >>>>>>>>>>>>>", shapesData);
          console.log(modifiedData, modifiedData.length, "modifiedData <<>>", modifiedData[count]);
          
          }*/

          if (count >= modifiedData.length) {
            fits = false;
          }
        }

        // console.log(count, "shapesData >>", shapesData);
        // console.log("sheetObj >>", sheetObj);
      }

      setSheets(sheetObj);
    }
  }, [dimensions]);

  /*
  const [sheetsCollected, setSheet] = useState([]);
  const [lastIds, setIds] = useState([]);
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

    setSheets(sheetObj);
    //console.log("modifiedData>>", modifiedData);
    //console.log("dimensions>>", dimensions);


      let xx = true;
    if (
      sheetObj[uniqID]["optimizedsShapes"].width <= SHEET_WIDTH &&
      sheetObj[uniqID]["optimizedsShapes"].height <= SHEET_HEIGHT
    ) {
      //setSheets(sheetObj);
    } else {
      let lastElement = dimensions[dimensions.length - 1];

      if(lastIds.indexOf(lastElement.id)>-1)
      {
        xx = false;        
      }
      else
      {
        setIds(prev=>[...prev, lastElement.id]);
      }
      //console.log("xx ++", xx);

      //lastIds.push(lastElement.id);
      let collectedItems = modifiedData.filter(
        ({ id }) => lastIds.indexOf(id) == -1
      );
      sheetObj[uniqID]["optimizedsShapes"]["items"] = collectedItems;
      //sheetObj[uniqID]["shapes"] = collectedItems.map(data => new Shape(+data.height, +data.width));
      // sheetsCollected

      let newModifiedData = modifiedData.filter(
        ({ id }) => id === lastElement?.id
      );

      uniqID++;

      let itr = 0;
      while (xx && itr<100 && newModifiedData.length !== 0) {
        //console.log(lastIds, "uID", uniqID, newModifiedData, "itr", ++itr);
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

        setSheets(sheetObj);



        if (
          sheetObj[uniqID]["optimizedsShapes"].width <= SHEET_WIDTH &&
          sheetObj[uniqID]["optimizedsShapes"].height <= SHEET_HEIGHT
        ) {
          //setSheets(sheetObj);
        

          newModifiedData = [];
        } else {

          let lastElement = dimensions[dimensions.length - 1];

          if(lastIds.indexOf(lastElement.id)>-1)
          {
            xx = false;
          }
          else
          {
            setIds(prev=>[...prev, lastElement.id]);
          }
          //console.log("xx ++", xx);

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
  }, [dimensions]);*/

  //console.log("sheets", sheets);

  const percent = 33.5;
  const calcPercent = val => {
    return Math.floor((val * percent) / 100);
  };

  const materialId = useSelector(state => state.materialId);

  return (
    <div className='cut-optimizer-container'>
      {sheets.map((sheet, i) => {
        return (
          <div className='cut-layout-container' key={i}>
            <div className='cut-layout-width'>{SHEET_WIDTH} mm</div>
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
            <div className='cut-layout-height'>{SHEET_HEIGHT} mm</div>
          </div>
        );
      })}
    </div>
  );
};

export default CutOptimizerAlgorithm;
