// import { notification } from "antd";
import { Formik } from "formik";
import { dimensionsSchema } from "../../validation/schema";
import "./style.scss";

const DimensionsFields = ({ dimensions, setDimensions }) => {
  // const [api, contextHolder] = notification.useNotification();
  // const openNotificationWithIcon = (type) => {
  //   api[type]({
  //     message: "Invalid Dimensions",
  //     description:
  //       "Ensure that both the Length and Width dimensions exceed 70mm.",
  //   });
  // };

  // const handleAdd = () => {
  //   // if (dimensions.length < 70 || dimensions.width < 70) {
  //     // openNotificationWithIcon("warning");
  //   // } else {
  //     setDimensions({
  //       length: "",
  //       width: "",
  //       quantity: "",
  //     // });
  //     // alert(JSON.stringify(dimensions));
  //   }
  // };
  // const hasEmptyStringValues = (obj) => {
  //   return Object.values(obj).reduce((acc, value) => {
  //     return acc || (typeof value === "string" && value.trim() === "");
  //   }, false);
  // };
  // const resetForm = (formik) => {
  //   formik.resetForm({ values: initialValues });
  // };
  return (
    <div className="dimensionsFields">
      {/* {contextHolder} */}
      <Formik
        validationSchema={dimensionsSchema}
        initialValues={{ length: "", width: "", quantity: "" }}
        onSubmit={(values, { resetForm }) => {
          alert(JSON.stringify(values));
          resetForm();
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
            <div className="form-group">
              <div>
                <label htmlFor="length">Length (mm)</label>
                <input
                  id="length"
                  name="length"
                  type="number"
                  className="form-field"
                  value={values.length}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <p className="error">
                {errors.length && touched.length && errors.length}
              </p>
            </div>
            <div className="form-group">
              <div>
                <label htmlFor="width">Width (mm)</label>
                <input
                  id="width"
                  name="width"
                  type="number"
                  className="form-field"
                  value={values.width}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <p className="error">
                {errors.width && touched.width && errors.width}
              </p>
            </div>
            <div className="form-group">
              <div>
                <label htmlFor="quantity">Quantity</label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  className="form-field"
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <p className="error">
                {errors.quantity && touched.quantity && errors.quantity}
              </p>
            </div>
            {/* <div className="form-group form-edge">
          <label>Edge</label>
          <div className="edge" id="edge"></div>
        </div> */}
            <div className="form-group">
              <button disabled={false} type="submit">
                Add
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default DimensionsFields;
