// App.js

import "./App.scss";
import CutOptimizerAlgorithm from "./components/CutOptimizerAlgorithm";
import DimensionsFields from "./components/DimensionsFields";
import Materials from "./components/Materials";

const App = () => {
  return (
    <div className='container'>
      <Materials />
      <DimensionsFields />
      <CutOptimizerAlgorithm />
    </div>
  );
};

export default App;
