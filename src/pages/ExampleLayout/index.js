import { useState } from "react";
import DimensionsFields from "../../components/DimensionsFields";
import ShowcaseLayout from "../../components/ShowcaseLayout";
import "./style.scss";

const ExampleLayout = () => {
  const [layout, setLayout] = useState([]);

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const stringifyLayout = () => {
    return layout.map((l) => (
      <div className="layoutItem" key={l.i}>
        <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
      </div>
    ));
  };

  const [dimensions, setDimensions] = useState({
    length: "",
    width: "",
    quantity: "",
  });
  console.log(layout[1]);

  return (
    <div className="container">
      <DimensionsFields setDimensions={setDimensions} dimensions={dimensions} />
      <div className="layoutJSON">
        Displayed as <code>[x, y, w, h]</code>:
        <div className="columns">{stringifyLayout()}</div>
      </div>
      <ShowcaseLayout onLayoutChange={onLayoutChange} />
    </div>
  );
};

export default ExampleLayout;
