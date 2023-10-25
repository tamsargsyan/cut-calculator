import { useState } from "react";
import LAYER_1 from "../../assets/layers/1.jpg";
import LAYER_2 from "../../assets/layers/2.jpg";
import LAYER_3 from "../../assets/layers/3.jpg";
import LAYER_4 from "../../assets/layers/4.jpg";
import "./style.scss";

const Materials = () => {
  const materials = [
    {
      id: 1,
      img: LAYER_1,
    },
    {
      id: 2,
      img: LAYER_2,
    },
    {
      id: 3,
      img: LAYER_3,
    },
    {
      id: 4,
      img: LAYER_4,
    },
  ];
  const [activeMaterial, setActiveMaterial] = useState(null);

  return (
    <div className='materials-wrapper'>
      <p className='materials-title'>Выбор материала</p>
      <div className='materials-items-wrapper'>
        {materials.map(material => (
          <div
            className={`${
              activeMaterial === material.id && "active"
            } material-item`}
            key={material.id}
            onClick={() => setActiveMaterial(material.id)}>
            <img src={material.img} alt='Layer' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Materials;
