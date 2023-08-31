import { useSelector } from "react-redux";
import DimensionsFields from "../../components/DimensionsFields";
import ShowcaseLayout from "../../components/ShowcaseLayout";
import "./style.scss";

const ExampleLayout = () => {
  // const dimensions = useSelector((state) => state.layoutData);
  // console.log(dimensions);
  return (
    <div className="container">
      {/* <div className="dimensionsFileds"> */}
        {/* {dimensions.map((dim, i) => ( */}
          {/* <div className="dimensionField" key={i}> */}
            {/* <h1>{i + 1}</h1> */}
            <DimensionsFields />
          {/* </div> */}
        {/* ))} */}
      {/* </div> */}
      <ShowcaseLayout />
    </div>
  );
};

export default ExampleLayout;
