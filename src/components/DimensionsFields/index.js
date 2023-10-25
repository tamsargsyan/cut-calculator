// import { notification } from "antd";
import { Formik, useFormikContext } from "formik";
import { dimensionsSchema } from "../../validation/schema";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getLayoutData } from "../../redux/actions";
import { Button, message } from "antd";
import { useEffect } from "react";
import { uniqueId } from "lodash";

const DimensionsFields = () => {
  const dimensions = [
    {
      id: 1,
      width: 100,
      height: 100,
      quantity: 2,
      layerColor: "rgba(255, 0, 0, 0.3)",
      border: {
        leftPart: 0.4,
        topPart: 1,
        bottomPart: 2,
        rightPart: 0.4,
      },
    },
  ];
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
              <input
                type='text'
                placeholder='Длина (мм)'
                className='plane-input'
                value={dim.width}
              />
            </td>
            <td className='plane-height'>
              <input
                type='text'
                placeholder='Ширина (мм)'
                className='plane-input'
                value={dim.height}
              />
            </td>
            <td className='plane-quantity'>
              <input
                type='text'
                placeholder='Количество'
                className='plane-input'
                value={dim.quantity}
              />
            </td>
            <td className='border-selector'>
              <div className='left-part'>
                <a
                  href='/'
                  className='border-left'
                  data-value='1'
                  style={{
                    textDecoration: dim.border.leftPart ? "underline" : "none",
                  }}>
                  0.4
                </a>
                <br />
                <a href='/' className='border-left' data-value='3'>
                  1
                </a>
                <br />
                <a href='/' className='border-left' data-value='2'>
                  2
                </a>
              </div>
              <div className='center-part'>
                <div className='top-part'>
                  <a href='/' className='border-top' data-value='1'>
                    0.4
                  </a>
                  <a href='/' className='border-top' data-value='3'>
                    1
                  </a>
                  <a href='/' className='border-top' data-value='2'>
                    2
                  </a>
                </div>
                <div
                  className='color-wrapper'
                  style={{
                    backgroundColor: "rgba(255, 0, 0, 0.3)",
                    borderLeft: "2px solid #000",
                  }}></div>
                <div className='bottom-part'>
                  <a href='/' className='border-bottom' data-value='1'>
                    0.4
                  </a>
                  <a href='/' className='border-bottom' data-value='3'>
                    1
                  </a>
                  <a href='/' className='border-bottom' data-value='2'>
                    2
                  </a>
                </div>
              </div>
              <div className='right-part'>
                <a href='/' className='border-right' data-value='1'>
                  0.4
                </a>
                <br />
                <a href='/' className='border-right' data-value='3'>
                  1
                </a>
                <br />
                <a href='/' className='border-right' data-value='2'>
                  2
                </a>
              </div>
            </td>
            <td className='hidden-print'>
              <button className='add-btn' type='submit'>
                Добавить
              </button>
            </td>
            <td className='hidden-print'>
              <button
                aria-label='Удалить'
                className='close delete-input'
                type='button'>
                <span aria-hidden='true'>×</span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DimensionsFields;
