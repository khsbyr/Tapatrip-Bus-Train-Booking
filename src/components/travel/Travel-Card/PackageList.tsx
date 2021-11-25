import {
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/solid';
import React, { FC, useState, useEffect } from 'react';
import PriceDetails from './PriceDetails';
import CurrencyFormat from 'react-currency-format';
import style from '@components/bus/Card/Card.module.scss';
interface Props {
  subPackageId: number;
  title: string;
  hotel_name: string;
  stocks: number;
  hotel_image: string;
  package_prices?: any;
  package_code: string;
  collectPrices: (arg?: any, arg1?: any) => void;
}
const arr = [];
const PackageList: FC<Props> = ({
  subPackageId,
  title,
  hotel_name,
  stocks,
  hotel_image,
  package_prices,
  package_code,
  collectPrices,
}) => {
  const [showPrices, setShowPrices] = useState(false);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    return function cleanup() {
      selectedPrices.length = 0;
      arr.length = 0;
    };
  }, []);

  const arrayRemover = (arr, value) => {
    arr.map(ele => {
      if (ele.id === value && ele.subPackageId === subPackageId) {
        let index = arr.indexOf(ele);
        ele.eventType = 'minus';
        ele.subPackageId = subPackageId;
        ele.packageCode = package_code;
        arr.splice(index, 1);
        return arr;
      }
    });
    return arr.filter(ele => {
      return ele != null;
    });
  };

  const getBackPriceId = (priceId, clickType) => {
    if (clickType === 'plus') {
      const selected = package_prices.filter(package_price => {
        return package_price.id === priceId;
      });
      selected[0].eventType = clickType;
      selected[0].subPackageId = subPackageId;
      selected[0].packageCode = package_code;
      arr.push(selected[0]);
      setSelectedPrices(selectedPrices => [...selectedPrices, selected[0]]);
      collectPrices(arr);
    } else if (clickType === 'minus') {
      const removed = arrayRemover(selectedPrices, priceId);
      arrayRemover(arr, priceId);
      setSelectedPrices(removed || []);
      collectPrices(selectedPrices);
    }
  };

  return (
    <>
      <div
        className={`grid grid-cols-3 my-6 gap-2 border rounded-md hover:shadow-md cursor-pointer`}
        onClick={() => {
          setShowPrices(!showPrices);
          setIsActive(!isActive);
        }}
      >
        <div className="col-span-2 p-2">
          <h1 className="font-bold text-lg">{title}</h1>
        </div>
        <div className="col-span-1 p-2">
          <img className="h-20 w-full " src={`${hotel_image}`} />
        </div>
        <div className="flex border-t border-dashed col-span-3  justify-between p-2">
          <p className="text-base">{`Hotel name : ${hotel_name}`}</p>
          <button className="text-direction font-medium flex text-xs md:text-base">
            Сонгох
            {isActive ? (
              <ChevronUpIcon className="md:w-6 md:h-6 w-4 h-4" />
            ) : (
              <ChevronDownIcon className="md:w-6 md:h-6 w-4 h-4" />
            )}
          </button>
        </div>
      </div>
      {package_prices.map((price, index) => {
        return showPrices ? (
          <PriceDetails
            key={index}
            priceId={price.id}
            priceName={price.name}
            price={price.price}
            getBackPriceId={getBackPriceId}
          />
        ) : (
          <></>
        );
      })}
      <hr className="divide divide-gray-400" />
    </>
  );
};

export default PackageList;
