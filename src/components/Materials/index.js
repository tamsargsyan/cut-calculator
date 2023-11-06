import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { materials } from "./materialsData";
import { getMaterial } from "../../redux/actions";

const Materials = () => {
  const dispatch = useDispatch();
  const materialId = useSelector(state => state.materialId);

  return (
    <div className='materials-wrapper'>
      <p className='materials-title'>Հումքի ընտրություն</p>
      <div className='materials-items-wrapper'>
        {materials.map(material => (
          <div
            className={`${
              materialId === material.id && "active"
            } material-item`}
            key={material.id}
            onClick={() => dispatch(getMaterial(material.id))}>
            <img src={material.img} alt='Layer' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Materials;
