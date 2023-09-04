import { CutOptimizer, Shape } from 'cut-optimizer';
import "./style.scss"
import { useSelector } from 'react-redux';
import ROTATE from "../../assets/rotate.png"
import { useCallback, useEffect } from 'react';

const CutOptimizerAlgorithm = ({ setOpacity }) => {
    const layoutData = useSelector((state) => state.layoutData)
    // console.log(layoutData)
    const modifiedData = layoutData.flatMap(item => {
        if (item.quantity > 1) {
            return Array.from({ length: item.quantity }, () => ({
                ...item,
                quantity: 1
            }));
        } else {
            return [item];
        }
    });
    const shapes = modifiedData.map(data => new Shape(data.width, data.length))
    const cut_opt = new CutOptimizer(2040, 2770);
    let optimizedsShapes = cut_opt.optimize(shapes);
    // console.log(optimizedsShapes)
    // console.log(cut_opt.root, "cut opt")
    const percent = 43.5;
    const calcPercent = (val) => {
        return Math.floor((val * percent) / 100);
    };
    // let canvas = document.getElementById('canvas');
    // let context = canvas?.getContext('2d');
    // const drawShapes = (shapes) => {
    //     // console.log(shapes)
    //     // context.strokeStyle = 'black';
    //     shapes?.items.forEach((shape) => {
    //         context.fillStyle = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    //         context.fillRect(shape.x, shape.y, shape.width, shape.height)
    //     });
    // };
    // useEffect(() => {
    //     if (context) {
    //         drawShapes(shapes)
    //         console.log(drawShapes(shapes))
    //     }
    // }, [shapes, context, drawShapes])
    console.log(optimizedsShapes)
    return (
        <div className="cut-layout-container">
            {/* <div className="cut-layout-width">2770 mm</div> */}
            <div style={{
                width: `${calcPercent(cut_opt.root.h)}px`, height: `${calcPercent(cut_opt.root.w)}px`
            }} className="cut-layout" >
                {
                    optimizedsShapes.items.map((item, i) => {
                        const width = calcPercent(item.width)
                        const height = calcPercent(item.height)
                        const marginLeft = calcPercent(item.x)
                        const marginTop = calcPercent(item.y)
                        return (
                            // <div key={i} className="cutting-bin">
                            <div
                                key={i}
                                className="cut-container"
                                style={{
                                    width: `${width}px`,
                                    height: `${height}px`,
                                    marginLeft: `${marginLeft}px`,
                                    marginTop: `${marginTop}px`,
                                    background: layoutData[i]?.color
                                }}
                            >
                                <button className='rotateBtn' onClick={() => {
                                    optimizedsShapes = cut_opt.optimize(shapes)
                                }}><img src={ROTATE} alt="Rotate" className='rotateImg' /></button>
                                <div className="cut-width">{item.width}</div>
                                <span className="text"></span>
                                <div className="cut-height">{item.height}</div>
                            </div>
                            // </div>
                        )
                    })
                }
                {/* {drawShapes(optimizedsShapes)} */}
            </div>
            {/* <div className="cut-layout-height">2040 mm</div> */}
        </div >
    )
}

export default CutOptimizerAlgorithm