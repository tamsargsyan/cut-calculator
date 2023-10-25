import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addDimension,
  removeDimension,
  updateDimension,
} from "../../redux/actions";
import { useState } from "react";

const DimensionsFields = () => {
  const dimensions = useSelector(state => state.dimensions);
  const [dimension, setDimension] = useState({
    width: "",
    height: "",
    quantity: "",
    layerColor: "",
  });
  const [id, setId] = useState(1);
  const dispatch = useDispatch();
  console.log(dimensions);

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

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Длина (мм)</th>
          <th>Ширина (мм)</th>
          <th>Количество</th>
          <th>Кромка</th>
          <th>Редактировать деталь</th>
          <th className='hidden-print'>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {dimensions.map((dim, i) => (
          <tr className='dim' key={dim.id}>
            <td className='layer-id'>{i + 1}</td>
            <td className='plane-width'>
              <input type='text' className='plane-input' value={dim.width} />
            </td>
            <td className='plane-height'>
              <input type='text' className='plane-input' value={dim.height} />
            </td>
            <td className='plane-quantity'>
              <input type='text' className='plane-input' value={dim.quantity} />
            </td>
            <td className='border-selector'>
              <div className='left-part'>
                <a
                  href='/'
                  className='border-left'
                  data-value='0.4'
                  style={{
                    textDecoration:
                      dim.border.leftPart === "0.4" ? "underline" : "none",
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
                      dim.border.leftPart === "1" ? "underline" : "none",
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
                      dim.border.leftPart === "2" ? "underline" : "none",
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
                        dim.border.topPart === "0.4" ? "underline" : "none",
                    }}>
                    0.4
                  </a>
                  <a
                    href='/'
                    className='border-top'
                    data-value='1'
                    style={{
                      textDecoration:
                        dim.border.topPart === "1" ? "underline" : "none",
                    }}>
                    1
                  </a>
                  <a
                    href='/'
                    className='border-top'
                    data-value='2'
                    style={{
                      textDecoration:
                        dim.border.topPart === "2" ? "underline" : "none",
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
                        dim.border.bottomPart === "0.4" ? "underline" : "none",
                    }}>
                    0.4
                  </a>
                  <a
                    href='/'
                    className='border-bottom'
                    data-value='1'
                    style={{
                      textDecoration:
                        dim.border.bottomPart === "1" ? "underline" : "none",
                    }}>
                    1
                  </a>
                  <a
                    href='/'
                    className='border-bottom'
                    data-value='2'
                    style={{
                      textDecoration:
                        dim.border.bottomPart === "2" ? "underline" : "none",
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
                      dim.border.rightPart === "0.4" ? "underline" : "none",
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
                      dim.border.rightPart === "1" ? "underline" : "none",
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
                      dim.border.rightPart === "2" ? "underline" : "none",
                  }}>
                  2
                </a>
              </div>
            </td>
            <td className='hidden-print'>
              <button
                className='add-btn'
                type='submit'
                onClick={() => {
                  console.log(dim.id);
                  const dimId = dim.id;
                  // update dimension here
                  dispatch(updateDimension({}));
                }}>
                Редактировать деталь
              </button>
            </td>
            <td className='hidden-print'>
              <button
                aria-label='Удалить'
                className='close delete-input'
                type='button'
                onClick={() => dispatch(removeDimension(dim.id))}>
                <span aria-hidden='true'>×</span>
              </button>
            </td>
          </tr>
        ))}
        {/* -------------------------------- N E W   D I M I E N S I O N ---------------------------- */}
        <tr className='dim'>
          <td className='layer-id'></td>
          <td className='plane-width'>
            <input
              type='text'
              className='plane-input'
              value={dimension.width}
              onChange={e =>
                setDimension(prev => ({
                  ...prev,
                  width: e.target.value,
                }))
              }
            />
          </td>
          <td className='plane-height'>
            <input
              type='text'
              className='plane-input'
              value={dimension.height}
              onChange={e =>
                setDimension(prev => ({
                  ...prev,
                  height: e.target.value,
                }))
              }
            />
          </td>
          <td className='plane-quantity'>
            <input
              type='text'
              className='plane-input'
              value={dimension.quantity}
              onChange={e =>
                setDimension(prev => ({
                  ...prev,
                  quantity: e.target.value,
                }))
              }
            />
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
                    border.bottomPart ? borderWidth(border.bottomPart) : 0
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
                      border.bottomPart === "0.4" ? "underline" : "none",
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
            <button
              className='add-btn'
              type='submit'
              onClick={() => {
                generateUniqueId();
                dispatch(addDimension({ ...dimension, id, border }));
                setDimension({
                  width: "",
                  height: "",
                  quantity: "",
                  layerColor: "",
                });
                setBorder({
                  leftPart: "",
                  rightPart: "",
                  topPart: "",
                  bottomPart: "",
                });
              }}>
              Добавить
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
      </tbody>
    </table>
  );
};

export default DimensionsFields;
