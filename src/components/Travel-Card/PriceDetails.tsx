import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import React, { FC, useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
interface Props {
  priceId: number;
  priceName: string;
  price: number;

  getBackPriceId: (arg: number, arg1: string) => void;
}
const PriceDetails: FC<Props> = ({
  priceId,
  priceName,
  price,
  getBackPriceId,
}) => {
  const [stock, setStock] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [clickBait, setClickBait] = useState(null);
  useEffect(() => {
    if (clickBait === 'plus') {
      setTotalPrice(totalPrice + price);

      getBackPriceId(priceId, clickBait);
    } else if (clickBait === 'minus') {
      setTotalPrice(totalPrice - price);

      getBackPriceId(priceId, clickBait);
    }
  }, [stock]);

  return (
    <>
      <div className={`grid grid-cols-3 my-2 gap-2 rounded-md border p-2`}>
        <div className="col-span-2">
          <div>
            <CurrencyFormat
              value={price}
              displayType={'text'}
              thousandSeparator={true}
              suffix={` ₮`}
            />
          </div>
        </div>
        <div className="col-span-1 grid grid-cols-3 ">
          <div className="border-2 m-auto">
            <MinusIcon
              name="removeStock"
              key="removeStock"
              className="h-6"
              fill="#BFC1DA"
              onClick={() => {
                stock > 0 && setStock(stock - 1);
                setClickBait('minus');
              }}
            />
          </div>
          <div className="m-auto">
            <p>{stock}</p>
          </div>
          <div className="m-auto bg-inactive">
            <PlusIcon
              name="addStock"
              className="h-6"
              fill="#FFFFFF"
              onClick={e => {
                setStock(stock + 1);
                setClickBait('plus');
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceDetails;
