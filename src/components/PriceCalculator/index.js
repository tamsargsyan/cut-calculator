import { useSelector } from "react-redux";
import PLUS_ICON from "../../assets/icons/plus.svg";
import "./style.scss";
import { modifiedDataCalc } from "../CutOptimizerAlgorithm";

const PriceCalculator = ({ sheets }) => {
  const dimensions = useSelector(state => state.dimensions);
  const modifiedData = modifiedDataCalc(dimensions);
  const defaultPrice = 1000;
  const quantityPrice = 100;
  const borderPrice = 100;

  const borderMultipliers = {
    0.4: 0.4,
    1: 1,
    2: 2,
  };

  const multipliedDimensions = modifiedData.reduce(
    (acc, item) => {
      let width = parseFloat(item.width);
      let height = parseFloat(item.height);

      for (const part in item.border) {
        if (borderMultipliers.hasOwnProperty(item.border[part])) {
          let multiplier = borderMultipliers[item.border[part]];

          if (part === "bottomPart" || part === "topPart") {
            acc.thick_0_4 += width * multiplier;
          } else if (part === "leftPart" || part === "rightPart") {
            acc.thick_0_4 += height * multiplier;
          }
        }
      }

      return acc;
    },
    { thick_0_4: 0, thick_1: 0, thick_2: 0 }
  );
  const mmTom = val => val / 1000;

  const finalPrice =
    defaultPrice * sheets.length +
    (multipliedDimensions.thick_0_4 +
      multipliedDimensions.thick_1 +
      multipliedDimensions.thick_2) *
      borderPrice +
    quantityPrice * modifiedData.length;

  return (
    <div className='price-calculator-wrapper'>
      <p className='price-calculator-title'>Параметры раскроя:</p>
      <p className='sheets-in-cutting'>
        Листов в раскрое:
        <span className='sheets-quantity'> {sheets.length}</span>
      </p>
      <p className='sheets-in-cutting'>
        Всего деталей
        <span className='sheets-quantity'> {modifiedData.length}</span>
      </p>
      <div className='edge-length-wrapper'>
        <p className='edge-length-title'>Длина кромки:</p>
        <div className='thickness'>
          <p>
            толщиной 0.4мм:{" "}
            <span>{Math.ceil(mmTom(multipliedDimensions.thick_0_4))} м.</span>
          </p>
          <p>
            толщиной 1мм:{" "}
            <span> {Math.ceil(mmTom(multipliedDimensions.thick_1))} м.</span>
          </p>
          <p>
            толщиной 2мм:{" "}
            <span>{Math.ceil(mmTom(multipliedDimensions.thick_2))} м.</span>
          </p>
        </div>
      </div>
      <p className='approximate-cost'>
        Приблизительная стоимость*:
        <span>{finalPrice} руб.</span>
      </p>
      <p className='final-price-warning'>
        * Указанная цена может отличаться от конечной. Остаток листа может
        отличаться от показанного на экране. Если Вам нужен остаток
        определенного размера, внесите размеры в параметры деталей.
      </p>
      <div className='attach-drawings-wrapper'>
        <p className='attach-drawings-warning'>
          Если Вам требуется изготовление нестандартной детали, прикрепите
          чертежи к заказу.
        </p>
        <button className='attach-add-btn btn'>
          <img src={PLUS_ICON} alt='Plus' />
          Добавить файлы...
        </button>
        <p className='max-files-quantity'>Максимальное количество файлов: 5</p>
      </div>
      <div className='add-print-btns'>
        <button className='add-to-cart-btn btn'>Добавить в корзину</button>
        <button className='print-btn btn'>Печать</button>
      </div>
    </div>
  );
};

export default PriceCalculator;
