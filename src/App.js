// App.js

import { useState } from "react";
import "./App.scss";
import CutOptimizerAlgorithm from "./components/CutOptimizerAlgorithm";
import DimensionsFields from "./components/DimensionsFields";
import Materials from "./components/Materials";
import PriceCalculator from "./components/PriceCalculator";

const App = () => {
  const [sheets, setSheets] = useState([]);

  return (
    <div className='container'>
      <Materials />
      <div className='dim-price-wrapper'>
        <DimensionsFields />
        <PriceCalculator sheets={sheets} />
      </div>
      <CutOptimizerAlgorithm sheets={sheets} setSheets={setSheets} />
    </div>
  );
};

export default App;
