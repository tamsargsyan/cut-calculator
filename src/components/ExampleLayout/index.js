import { useState } from "react";
import ShowcaseLayout from "../ShowcaseLayout";
import "./style.css"

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

  return (
    <div>
      <div className="layoutJSON">
        Displayed as <code>[x, y, w, h]</code>:
        <div className="columns">{stringifyLayout()}</div>
      </div>
      <ShowcaseLayout onLayoutChange={onLayoutChange} />
    </div>
  );
};

export default ExampleLayout;
