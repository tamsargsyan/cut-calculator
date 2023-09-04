// App.js

import { useState } from 'react';
import './App.scss';
import CutOptimizerAlgorithm from './components/CutOptimizerAlgorithm';
import DimensionsFields from "./components/DimensionsFields"
// import CutOptimizerAlgorithm from './components/CutOptimizer';
// import InputData from './InputData';
// import GeneticAlgorithm from './GeneticAlgorithm';

function App() {
  const [items, setItems] = useState([
    {
      width: 300,
      height: 200,
      count: 5,
    },
    {
      width: 150,
      height: 200,
      count: 4,
    },
  ]);
  const [opacity, setOpacity] = useState(0.4)
  return (
    <div className="container">
      {/* <h1>Cut Optimizer App</h1>
      <InputData items={items} /> 
      <GeneticAlgorithm sheetSize={{ width: 2800, height: 2070 }} />  */}
      {/* <CutOptimizer /> */}
      <DimensionsFields opacity={opacity} />
      {/* <ShowcaseLayout /> */}
      {/* <GeneticAlgorithm /> */}
      {/* <CutOptimizerAlgorithm /> */}
      <CutOptimizerAlgorithm setOpacity={setOpacity} />
    </div>
  );
}

export default App;


// https://stackoverflow.com/questions/53812280/2d-bin-packing-algorithm
// https://github.com/solomon-b/greedypacker