import PLUS_ICON from "../../assets/icons/plus.png";
import "./style.scss";

const PriceCalculator = () => {
  const sheetsQuantity = 1;
  const thick0_4 = 0;
  const thick1 = 1;
  const thick2 = 1;
  const approximateCost = 5700;
  return (
    <div className='price-calculator-wrapper'>
      <p className='price-calculator-title'>Параметры раскроя:</p>
      <p className='sheets-in-cutting'>
        Листов в раскрое:
        <span className='sheets-quantity'>{sheetsQuantity}</span>
      </p>
      <div className='edge-length-wrapper'>
        <p className='edge-length-title'>Длина кромки:</p>
        <div className='thickness'>
          <p>
            толщиной 0.4мм: <span>{thick0_4} м.</span>
          </p>
          <p>
            толщиной 1мм: <span>{thick1} м.</span>
          </p>
          <p>
            толщиной 2мм: <span>{thick2} м.</span>
          </p>
        </div>
      </div>
      <p className='approximate-cost'>
        Приблизительная стоимость*:
        <span>{approximateCost} руб.</span>
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
