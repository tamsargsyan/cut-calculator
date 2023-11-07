import "./style.scss";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  addDimension,
  removeDimension,
  updateDimension,
} from "../../redux/actions";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { dimensionsSchema } from "../../validation/schema";
import { SHEET_HEIGHT, SHEET_WIDTH } from "../CutOptimizerAlgorithm";

const DimensionsFields = () => {
  const dimensions = useSelector(state => state.dimensions);
  const [id, setId] = useState(1);
  const dispatch = useDispatch();
  const [layerColor, setLayerColor] = useState("rgba(0, 255, 0, 0.3)");
  const generateLayerColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const alpha = 0.3;
    setLayerColor(`rgba(${red}, ${green}, ${blue}, ${alpha})`);
  };
  const generateUniqueId = () => {
    setId(prevId => prevId + 1);
  };
  const [border, setBorder] = useState({
    leftPart: "",
    rightPart: "",
    topPart: "",
    bottomPart: "",
  });
  const borderWidth = border => {
    if (border === "0.4") return "2";
    else if (border === "1") return "3";
    else if (border === "2") return "4";
    return "";
  };

  const [editedDimensions, setEditedDimensions] = useState([]);

  const handleWidthChange = (index, newValue) => {
    const newDimensions = [...editedDimensions];
    newDimensions[index].width = newValue;
    setEditedDimensions(newDimensions);
  };

  const handleHeightChange = (index, newValue) => {
    const newDimensions = [...editedDimensions];
    newDimensions[index].height = newValue;
    setEditedDimensions(newDimensions);
  };

  const handleQuantityChange = (index, newValue) => {
    const newDimensions = [...editedDimensions];
    newDimensions[index].quantity = newValue;
    setEditedDimensions(newDimensions);
  };

  const handleBorderChange = (index, newValue, border) => {
    const newDimensions = [...editedDimensions];
    newDimensions[index].border[border] = newValue;
    setEditedDimensions(newDimensions);
  };

  useEffect(() => {
    setEditedDimensions(dimensions);
  }, [dimensions]);

  const [errorUpdatedDim, setErrorUpdatedDim] = useState({
    width: "",
    height: "",
    quantity: "",
    idx: null,
  });

  const [idx, setIdx] = useState(null);

  useEffect(() => {
    if (errorUpdatedDim.idx === idx) {
      if (
        errorUpdatedDim.width === "" &&
        errorUpdatedDim.height === "" &&
        errorUpdatedDim.quantity === ""
      ) {
        dispatch(updateDimension({}));
      }
    }
  }, [errorUpdatedDim, idx, dispatch]);

  return (
    <Formik
      validationSchema={dimensionsSchema}
      initialValues={{
        width: "",
        height: "",
        quantity: "",
      }}
      onSubmit={(values, { resetForm }) => {
        if (errorUpdatedDim.idx === idx) {
          if (
            errorUpdatedDim.width === "" &&
            errorUpdatedDim.height === "" &&
            errorUpdatedDim.quantity === ""
          ) {
            generateUniqueId();
            generateLayerColor();
            dispatch(addDimension({ ...values, id, border, layerColor }));
            resetForm();
            setBorder({
              leftPart: "",
              rightPart: "",
              topPart: "",
              bottomPart: "",
            });
          }
        }
      }}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className='dimensions-wrapper'>
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Երկարություն (մմ)</th>
                  <th>Լայնություն (մմ)</th>
                  <th>Քանակ</th>
                  <th>Եզր</th>
                  <th className='hidden-print'>&nbsp;</th>
                  <th className='hidden-print'>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {/* -------------------------------- N E W   D I M I E N S I O N ---------------------------- */}
                <tr className='dim'>
                  <td className='layer-id'></td>
                  <td className='plane-width'>
                    <input
                      type='text'
                      name='width'
                      className='plane-input'
                      value={values.width}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        borderTop:
                          border.topPart !== "" ? "solid" : "1px solid #ddd",
                        borderBottom:
                          border.bottomPart !== "" ? "solid" : "1px solid #ddd",
                      }}
                    />
                    <p className='error'>
                      {errors.width && touched.width && errors.width}
                    </p>
                  </td>
                  <td className='plane-height'>
                    <input
                      type='text'
                      name='height'
                      className='plane-input'
                      value={values.height}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        borderLeft:
                          border.leftPart !== "" ? "solid" : "1px solid #ddd",
                        borderRight:
                          border.rightPart !== "" ? "solid" : "1px solid #ddd",
                      }}
                    />
                    <p className='error'>
                      {errors.height && touched.height && errors.height}
                    </p>
                  </td>
                  <td className='plane-quantity'>
                    <input
                      type='text'
                      className='plane-input'
                      name='quantity'
                      value={values.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <p className='error'>
                      {errors.quantity && touched.quantity && errors.quantity}
                    </p>
                  </td>
                  <td className='border-selector'>
                    <div className='left-part'>
                      <a
                        href='/'
                        className='border-left'
                        data-value='0.4'
                        style={{
                          textDecoration:
                            border.leftPart === "0.4" ? "underline" : "none",
                        }}
                        onClick={e => {
                          e.preventDefault();
                          setBorder(prev => ({
                            ...prev,
                            leftPart: "0.4",
                          }));
                        }}>
                        0.4
                      </a>
                      <br />
                      <a
                        href='/'
                        className='border-left'
                        data-value='1'
                        style={{
                          textDecoration:
                            border.leftPart === "1" ? "underline" : "none",
                        }}
                        onClick={e => {
                          e.preventDefault();
                          setBorder(prev => ({
                            ...prev,
                            leftPart: "1",
                          }));
                        }}>
                        1
                      </a>
                      <br />
                      <a
                        href='/'
                        className='border-left'
                        data-value='2'
                        style={{
                          textDecoration:
                            border.leftPart === "2" ? "underline" : "none",
                        }}
                        onClick={e => {
                          e.preventDefault();
                          setBorder(prev => ({
                            ...prev,
                            leftPart: "2",
                          }));
                        }}>
                        2
                      </a>
                    </div>
                    <div className='center-part'>
                      <div className='top-part'>
                        <a
                          href='/'
                          className='border-top'
                          data-value='0.4'
                          style={{
                            textDecoration:
                              border.topPart === "0.4" ? "underline" : "none",
                          }}
                          onClick={e => {
                            e.preventDefault();
                            setBorder(prev => ({
                              ...prev,
                              topPart: "0.4",
                            }));
                          }}>
                          0.4
                        </a>
                        <a
                          href='/'
                          className='border-top'
                          data-value='1'
                          style={{
                            textDecoration:
                              border.topPart === "1" ? "underline" : "none",
                          }}
                          onClick={e => {
                            e.preventDefault();
                            setBorder(prev => ({
                              ...prev,
                              topPart: "1",
                            }));
                          }}>
                          1
                        </a>
                        <a
                          href='/'
                          className='border-top'
                          data-value='2'
                          style={{
                            textDecoration:
                              border.topPart === "2" ? "underline" : "none",
                          }}
                          onClick={e => {
                            e.preventDefault();
                            setBorder(prev => ({
                              ...prev,
                              topPart: "2",
                            }));
                          }}>
                          2
                        </a>
                      </div>
                      <div
                        className='color-wrapper'
                        style={{
                          backgroundColor: "rgba(255, 0, 0, 0.3)",
                          borderTop: `${
                            border.topPart ? borderWidth(border.topPart) : 0
                          }px solid #000`,
                          borderBottom: `${
                            border.bottomPart
                              ? borderWidth(border.bottomPart)
                              : 0
                          }px solid #000`,
                          borderLeft: `${
                            border.leftPart ? borderWidth(border.leftPart) : 0
                          }px solid #000`,
                          borderRight: `${
                            border.rightPart ? borderWidth(border.rightPart) : 0
                          }px solid #000`,
                        }}></div>
                      <div className='bottom-part'>
                        <a
                          href='/'
                          className='border-bottom'
                          data-value='0.4'
                          style={{
                            textDecoration:
                              border.bottomPart === "0.4"
                                ? "underline"
                                : "none",
                          }}
                          onClick={e => {
                            e.preventDefault();
                            setBorder(prev => ({
                              ...prev,
                              bottomPart: "0.4",
                            }));
                          }}>
                          0.4
                        </a>
                        <a
                          href='/'
                          className='border-bottom'
                          data-value='1'
                          style={{
                            textDecoration:
                              border.bottomPart === "1" ? "underline" : "none",
                          }}
                          onClick={e => {
                            e.preventDefault();
                            setBorder(prev => ({
                              ...prev,
                              bottomPart: "1",
                            }));
                          }}>
                          1
                        </a>
                        <a
                          href='/'
                          className='border-bottom'
                          data-value='2'
                          style={{
                            textDecoration:
                              border.bottomPart === "2" ? "underline" : "none",
                          }}
                          onClick={e => {
                            e.preventDefault();
                            setBorder(prev => ({
                              ...prev,
                              bottomPart: "2",
                            }));
                          }}>
                          2
                        </a>
                      </div>
                    </div>
                    <div className='right-part'>
                      <a
                        href='/'
                        className='border-right'
                        data-value='0.4'
                        style={{
                          textDecoration:
                            border.rightPart === "0.4" ? "underline" : "none",
                        }}
                        onClick={e => {
                          e.preventDefault();
                          setBorder(prev => ({
                            ...prev,
                            rightPart: "0.4",
                          }));
                        }}>
                        0.4
                      </a>
                      <br />
                      <a
                        href='/'
                        className='border-right'
                        data-value='1'
                        style={{
                          textDecoration:
                            border.rightPart === "1" ? "underline" : "none",
                        }}
                        onClick={e => {
                          e.preventDefault();
                          setBorder(prev => ({
                            ...prev,
                            rightPart: "1",
                          }));
                        }}>
                        1
                      </a>
                      <br />
                      <a
                        href='/'
                        className='border-right'
                        data-value='2'
                        style={{
                          textDecoration:
                            border.rightPart === "2" ? "underline" : "none",
                        }}
                        onClick={e => {
                          e.preventDefault();
                          setBorder(prev => ({
                            ...prev,
                            rightPart: "2",
                          }));
                        }}>
                        2
                      </a>
                    </div>
                  </td>
                  <td className='hidden-print'>
                    <button className='add-btn' type='submit'>
                      Ավելացնել
                    </button>
                  </td>
                  <td className='hidden-print'>
                    <button
                      aria-label='Удалить'
                      className='close delete-input'
                      type='button'>
                      <span aria-hidden='true'></span>
                    </button>
                  </td>
                </tr>
                {/* -------------------------------- N E W   D I M I E N S I O N ---------------------------- */}
                {editedDimensions.map((dim, i) => (
                  <tr className='dim' key={i}>
                    <td className='layer-id'>{i + 1}</td>
                    <td className='plane-width'>
                      <input
                        type='text'
                        className='plane-input'
                        name='width'
                        value={dim.width}
                        onChange={e => handleWidthChange(i, e.target.value)}
                        style={{
                          borderTop:
                            dim.border.topPart !== ""
                              ? "solid"
                              : "1px solid #ddd",
                          borderBottom:
                            dim.border.bottomPart !== ""
                              ? "solid"
                              : "1px solid #ddd",
                        }}
                      />
                      <p className='error'>
                        {errorUpdatedDim?.idx === i && errorUpdatedDim.width}
                      </p>
                    </td>
                    <td className='plane-height'>
                      <input
                        type='text'
                        className='plane-input'
                        value={dim.height}
                        onChange={e => handleHeightChange(i, e.target.value)}
                        style={{
                          borderLeft:
                            dim.border.leftPart !== ""
                              ? "solid"
                              : "1px solid #ddd",
                          borderRight:
                            dim.border.rightPart !== ""
                              ? "solid"
                              : "1px solid #ddd",
                        }}
                      />
                      <p className='error'>
                        {errorUpdatedDim?.idx === i && errorUpdatedDim.height}
                      </p>
                    </td>
                    <td className='plane-quantity'>
                      <input
                        type='text'
                        className='plane-input'
                        value={dim.quantity}
                        onChange={e => handleQuantityChange(i, e.target.value)}
                      />
                      <p className='error'>
                        {errorUpdatedDim?.idx === i && errorUpdatedDim.quantity}
                      </p>
                    </td>
                    <td className='border-selector'>
                      <div className='left-part'>
                        <a
                          href='/'
                          className='border-left'
                          data-value='0.4'
                          style={{
                            textDecoration:
                              dim.border.leftPart === "0.4"
                                ? "underline"
                                : "none",
                          }}
                          onClick={e => {
                            e.preventDefault();
                            handleBorderChange(i, "0.4", "leftPart");
                          }}>
                          0.4
                        </a>
                        <br />
                        <a
                          href='/'
                          className='border-left'
                          data-value='1'
                          style={{
                            textDecoration:
                              dim.border.leftPart === "1"
                                ? "underline"
                                : "none",
                          }}
                          onClick={e => {
                            e.preventDefault();
                            handleBorderChange(i, "1", "leftPart");
                          }}>
                          1
                        </a>
                        <br />
                        <a
                          href='/'
                          className='border-left'
                          data-value='2'
                          style={{
                            textDecoration:
                              dim.border.leftPart === "2"
                                ? "underline"
                                : "none",
                          }}
                          onClick={e => {
                            e.preventDefault();
                            handleBorderChange(i, "2", "leftPart");
                          }}>
                          2
                        </a>
                      </div>
                      <div className='center-part'>
                        <div className='top-part'>
                          <a
                            href='/'
                            className='border-top'
                            data-value='0.4'
                            style={{
                              textDecoration:
                                dim.border.topPart === "0.4"
                                  ? "underline"
                                  : "none",
                            }}
                            onClick={e => {
                              e.preventDefault();
                              handleBorderChange(i, "0.4", "topPart");
                            }}>
                            0.4
                          </a>
                          <a
                            href='/'
                            className='border-top'
                            data-value='1'
                            style={{
                              textDecoration:
                                dim.border.topPart === "1"
                                  ? "underline"
                                  : "none",
                            }}
                            onClick={e => {
                              e.preventDefault();
                              handleBorderChange(i, "1", "topPart");
                            }}>
                            1
                          </a>
                          <a
                            href='/'
                            className='border-top'
                            data-value='2'
                            style={{
                              textDecoration:
                                dim.border.topPart === "2"
                                  ? "underline"
                                  : "none",
                            }}
                            onClick={e => {
                              e.preventDefault();
                              handleBorderChange(i, "2", "topPart");
                            }}>
                            2
                          </a>
                        </div>
                        <div
                          className='color-wrapper'
                          style={{
                            backgroundColor: "rgba(255, 0, 0, 0.3)",
                            borderTop: `${borderWidth(
                              dim.border.topPart
                            )}px solid #000`,
                            borderBottom: `${borderWidth(
                              dim.border.bottomPart
                            )}px solid #000`,
                            borderLeft: `${borderWidth(
                              dim.border.leftPart
                            )}px solid #000`,
                            borderRight: `${borderWidth(
                              dim.border.rightPart
                            )}px solid #000`,
                          }}></div>
                        <div className='bottom-part'>
                          <a
                            href='/'
                            className='border-bottom'
                            data-value='0.4'
                            style={{
                              textDecoration:
                                dim.border.bottomPart === "0.4"
                                  ? "underline"
                                  : "none",
                            }}
                            onClick={e => {
                              e.preventDefault();
                              handleBorderChange(i, "0.4", "bottomPart");
                            }}>
                            0.4
                          </a>
                          <a
                            href='/'
                            className='border-bottom'
                            data-value='1'
                            style={{
                              textDecoration:
                                dim.border.bottomPart === "1"
                                  ? "underline"
                                  : "none",
                            }}
                            onClick={e => {
                              e.preventDefault();
                              handleBorderChange(i, "1", "bottomPart");
                            }}>
                            1
                          </a>
                          <a
                            href='/'
                            className='border-bottom'
                            data-value='2'
                            style={{
                              textDecoration:
                                dim.border.bottomPart === "2"
                                  ? "underline"
                                  : "none",
                            }}
                            onClick={e => {
                              e.preventDefault();
                              handleBorderChange(i, "2", "bottomPart");
                            }}>
                            2
                          </a>
                        </div>
                      </div>
                      <div className='right-part'>
                        <a
                          href='/'
                          className='border-right'
                          data-value='0.4'
                          style={{
                            textDecoration:
                              dim.border.rightPart === "0.4"
                                ? "underline"
                                : "none",
                          }}
                          onClick={e => {
                            e.preventDefault();
                            handleBorderChange(i, "0.4", "rightPart");
                          }}>
                          0.4
                        </a>
                        <br />
                        <a
                          href='/'
                          className='border-right'
                          data-value='1'
                          style={{
                            textDecoration:
                              dim.border.rightPart === "1"
                                ? "underline"
                                : "none",
                          }}
                          onClick={e => {
                            e.preventDefault();
                            handleBorderChange(i, "1", "rightPart");
                          }}>
                          1
                        </a>
                        <br />
                        <a
                          href='/'
                          className='border-right'
                          data-value='2'
                          style={{
                            textDecoration:
                              dim.border.rightPart === "2"
                                ? "underline"
                                : "none",
                          }}
                          onClick={e => {
                            e.preventDefault();
                            handleBorderChange(i, "2", "rightPart");
                          }}>
                          2
                        </a>
                      </div>
                    </td>
                    <td className='hidden-print'>
                      <button
                        className='add-btn'
                        type='submit'
                        onClick={e => {
                          e.preventDefault();
                          setErrorUpdatedDim(prev => ({
                            ...prev,
                            idx: i,
                          }));
                          setIdx(i);
                          if (dim.width !== "") {
                            if (+dim.width >= 70 && +dim.width <= SHEET_WIDTH) {
                              setErrorUpdatedDim(prev => ({
                                ...prev,
                                width: "",
                              }));
                            } else
                              setErrorUpdatedDim(prev => ({
                                ...prev,
                                width: `Լայնությունը պետք է լինի 70-${SHEET_WIDTH} միջակայքում`,
                              }));
                          } else {
                            setErrorUpdatedDim(prev => ({
                              ...prev,
                              width: "Լայնությունը պարտադիր է",
                            }));
                          }
                          if (dim.height !== "") {
                            if (
                              +dim.height >= 70 &&
                              +dim.height <= SHEET_HEIGHT
                            ) {
                              setErrorUpdatedDim(prev => ({
                                ...prev,
                                height: "",
                              }));
                            } else {
                              setErrorUpdatedDim(prev => ({
                                ...prev,
                                height: `Երկարությունը պետք է լինի 70-${SHEET_HEIGHT} միջակայքում`,
                              }));
                            }
                          } else {
                            setErrorUpdatedDim(prev => ({
                              ...prev,
                              height: "Երկարությունը պարտադիր է",
                            }));
                          }
                          if (dim.quantity !== "") {
                            if (+dim.quantity >= 1) {
                              setErrorUpdatedDim(prev => ({
                                ...prev,
                                quantity: "",
                              }));
                            } else
                              setErrorUpdatedDim(prev => ({
                                ...prev,
                                quantity: `Քանակը պետք է լինի 0-ից մեծ`,
                              }));
                          } else {
                            setErrorUpdatedDim(prev => ({
                              ...prev,
                              quantity: "Քանակը պարտադիր է",
                            }));
                          }
                        }}>
                        Խմբագրել
                      </button>
                    </td>
                    <td className='hidden-print'>
                      <button
                        aria-label='Удалить'
                        className='close delete-input'
                        type='button'
                        onClick={() => dispatch(removeDimension(i))}>
                        <span aria-hidden='true'>×</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      )}
    </Formik>
  );
};

const mapStateToProps = state => ({
  dimensions: state.dimensions,
});

export default connect(mapStateToProps)(DimensionsFields);
