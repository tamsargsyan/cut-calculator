// import { notification } from "antd";
import { Formik, useFormikContext } from "formik";
import { dimensionsSchema } from "../../validation/schema";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getLayoutData } from "../../redux/actions";
import { Button, message } from 'antd';
import { useEffect } from "react";
import { uniqueId } from "lodash";

const DimensionsFields = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.info('Hello, Ant Design!');
  };
  const randomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const opacity = 0.4;

    const color = `rgba(${red},${green},${blue},${0.4})`;

    return color;
  }
  const layoutData = useSelector((state) => state.layoutData)
  // const inputs = layoutData.length ? layoutData : [{
  //   id: 1,
  //   length: "",
  //   width: "",
  //   quantity: "",
  //   color: ""
  // }]
  // console.log(layoutData, "data")
  return (
    <>
      {contextHolder}
      <Formik
        validationSchema={dimensionsSchema}
        initialValues={{ length: "", width: "", quantity: "" }}
        onSubmit={(values, { resetForm, errors }) => {
          const data = {
            ...values,
            id: +uniqueId(),
            color: randomColor()
          }
          // const modifiedData = layoutData.flatMap(item => {
          //   if (item.quantity > 1) {
          //     return Array.from({ length: item.quantity }, () => ({
          //       ...item,
          //       quantity: 1
          //     }));
          //   } else {
          //     return [item];
          //   }
          // });
          resetForm()
          dispatch(getLayoutData(data));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form className="dimensionsForm" onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <th>#</th>
                  <th>Length</th>
                  <th>Width</th>
                  <th>Quantity</th>
                  <th>#</th>
                </tr>
                {/* {
                  inputs.map((data) => ( */}
                <tr className="row">
                  <td className="rowNumber">{1}</td>
                  <td>
                    <input
                      className="row-field"
                      id="length"
                      name="length"
                      type="number"
                      value={values.length}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </td>
                  <td>
                    <input
                      className="row-field"
                      id="width"
                      name="width"
                      type="number"
                      value={values.width}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </td>
                  <td>
                    <input
                      className="row-field"
                      id="quantity"
                      name="quantity"
                      type="number"
                      value={values.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </td>
                  <td className="row-btn"><button type="submit">Add</button></td>
                </tr>
                {/* ))
                } */}
              </tbody>
            </table>
          </form>
        )}
      </Formik>
    </>
  );
};

export default DimensionsFields;
