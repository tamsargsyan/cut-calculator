// App.js

import "./App.scss";
import CutOptimizerAlgorithm from "./components/CutOptimizerAlgorithm";
import DimensionsFields from "./components/DimensionsFields";
import Materials from "./components/Materials";
import PriceCalculator from "./components/PriceCalculator";

const App = () => {
  return (
    <div className='container'>
      <Materials />
      <div className='dim-price-wrapper'>
        <DimensionsFields />
        <PriceCalculator />
      </div>
      <CutOptimizerAlgorithm />
    </div>
  );
};

export default App;
