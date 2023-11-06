import { useSelector } from "react-redux";
import PLUS_ICON from "../../assets/icons/plus.svg";
import "./style.scss";

const PriceCalculator = ({ sheets }) => {
  let id = 0;
  const dimensions = useSelector(state => state.dimensions);
  console.log(dimensions);
  const modifiedData = dimensions.flatMap(item => {
    if (+item.quantity > 1) {
      return Array.from({ length: +item.quantity }, () => ({
        ...item,
        quantity: 1,
        id: ++id,
      }));
    } else {
      return [item];
    }
  });

  const multipliedDimensions = modifiedData.reduce(
    (acc, item) => {
      let width = parseFloat(item.width);
      let height = parseFloat(item.height);
      let thick_0_4 = 0;
      let thick_1 = 0;
      let thick_2 = 0;

      if (item.border.bottomPart === "0.4") thick_0_4 += width;
      if (item.border.topPart === "0.4") thick_0_4 += width;
      if (item.border.leftPart === "0.4") thick_0_4 += height;
      if (item.border.rightPart === "0.4") thick_0_4 += height;
      if (item.border.bottomPart === "1") thick_1 += width;
      if (item.border.topPart === "1") thick_1 += width;
      if (item.border.leftPart === "1") thick_1 += height;
      if (item.border.rightPart === "1") thick_1 += height;
      if (item.border.bottomPart === "2") thick_2 += width;
      if (item.border.topPart === "2") thick_2 += width;
      if (item.border.leftPart === "2") thick_2 += height;
      if (item.border.rightPart === "2") thick_2 += height;

      acc.thick_0_4 += thick_0_4;
      acc.thick_1 += thick_1;
      acc.thick_2 += thick_2;

      return acc;
    },
    { thick_0_4: 0, thick_1: 0, thick_2: 0 }
  );
  const mmTom = val => val / 1000;

  const sheetPrice = 24000;
  const quantityPrice = 100;
  const thick_0_4_price = 200;
  const thick_1_price = 250;
  const thick_2_price = 300;

  const finalPrice =
    sheetPrice * sheets.length +
    (mmTom(multipliedDimensions.thick_0_4) * thick_0_4_price +
      mmTom(multipliedDimensions.thick_1) * thick_1_price +
      mmTom(multipliedDimensions.thick_2) * thick_2_price) +
    quantityPrice * modifiedData.length;
  const formattedAmount = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(finalPrice / 1000);

  return (
    <div className='price-calculator-wrapper'>
      <p className='price-calculator-title'>Պարամետրեր:</p>
      <p className='sheets-in-cutting'>
        Տախտակի քանակ:
        <span className='sheets-quantity'> {sheets.length}</span>
      </p>
      <p className='sheets-in-cutting'>
        Դետալների քանակ։
        <span className='sheets-quantity'> {modifiedData.length}</span>
      </p>
      {multipliedDimensions.thick_0_4 ||
      multipliedDimensions.thick_1 ||
      multipliedDimensions.thick_2 ? (
        <div className='edge-length-wrapper'>
          <p className='edge-length-title'>Եզրաթուղթ:</p>
          <div className='thickness'>
            {multipliedDimensions.thick_0_4 !== 0 ? (
              <p>
                0,4 մմ հաստությամբ:{" "}
                <span>{mmTom(multipliedDimensions.thick_0_4)} մ.</span>
              </p>
            ) : null}
            {multipliedDimensions.thick_1 !== 0 ? (
              <p>
                1 մմ հաստությամբ{" "}
                <span> {mmTom(multipliedDimensions.thick_1)} մ.</span>
              </p>
            ) : null}
            {multipliedDimensions.thick_2 ? (
              <p>
                2 մմ հաստությամբ։{" "}
                <span>{mmTom(multipliedDimensions.thick_2)} մ.</span>
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
      <p className='approximate-cost'>
        Նախնական արժեք*: <span>{formattedAmount} դրամ.</span>
      </p>
      <p className='final-price-warning'>
        *Նշված գինը կարող է տարբերվել վերջնական գնից։ Տախտակի մնացած մասը կարող
        է տարբերվել էկրանին ցուցադրվածից:
      </p>
      {/* <div className='attach-drawings-wrapper'>
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
      </div> */}
    </div>
  );
};

export default PriceCalculator;
