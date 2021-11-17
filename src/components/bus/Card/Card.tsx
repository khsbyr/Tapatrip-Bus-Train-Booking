import {
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
} from '@heroicons/react/solid';
import React, { FC, useState } from 'react';
import { Steps } from 'antd';

const { Step } = Steps;

interface Props {
  description: string;
  start_date: string;
  end_date: string;
  date: string;
  price: number;
  passengers: number;
  direction_name: string;
  start_location: string;
  end_location: string;
  stops?: any;
}

const Card: FC<Props> = ({
  description,
  start_date,
  end_date,
  date,
  price,
  passengers,
  direction_name,
  start_location,
  end_location,
  stops,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="px-2">
        <div className="max-w-7xl mx-auto">
          <div className=" relative bg-white w-full h-auto rounded-2xl">
            <div className="px-20 space-y-4">
              <h1 className="pt-4 font-bold text-cardDescColor">
                {description}
              </h1>
              <div className="flex justify-between ">
                <div className="space-y-2">
                  <div className="flex space-x-4">
                    <h1 className="text-cardDate font-bold text-xl">
                      {start_date}
                    </h1>
                    <ArrowRightIcon className="h-7 text-direction" />
                    <h1 className="text-cardDate font-bold text-xl">
                      {end_date}
                    </h1>
                  </div>
                  <h1 className="font-light text-cardDate text-lg"> {date} </h1>
                </div>
                <div className="space-y-2">
                  <h1 className="text-cardDate font-bold text-2xl">
                    {price} MNT
                  </h1>
                  <h1 className="flex items-center">
                    <UserIcon className="w-4 h-4 " /> {passengers} зорчигчийн
                    үнэ
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap py-5 justify-between items-center ">
                <div>
                  <h1 className="text-cardDate font-semibold text-md">
                    {direction_name}
                  </h1>
                </div>
                <div className="flex items-center space-x-8">
                  <button
                    className="text-direction font-medium flex"
                    onClick={() => setIsActive(!isActive)}
                  >
                    Чиглэлийн мэдээлэл
                    {isActive ? (
                      <ChevronUpIcon className="w-6 h-6" />
                    ) : (
                      <ChevronDownIcon className="w-6 h-6" />
                    )}
                  </button>
                  <button className="bg-button text-white font-bold py-2 px-4 rounded-lg h-10 w-40">
                    Захиалах
                  </button>
                </div>
              </div>
            </div>
            <div className="border-4 w-7 h-12 border-r-0 rounded-tl-full rounded-bl-full absolute top-28 right-0 bg-bg border-bg"></div>
            <div className="border-4 w-7 h-12 border-l-0 rounded-tr-full rounded-br-full absolute top-28 left-0 bg-bg border-bg"></div>
            <div
              className="bg-bg w-full h-0.5 absolute"
              style={{ top: '135px' }}
            ></div>
            <div className={`${!isActive ? 'hidden' : 'block'}`}>
              <div className="border border-dashed "></div>
              <div className="px-20 py-5">
                <Steps progressDot direction="vertical">
                  <Step title={start_date} description={start_location} />
                  {stops?.map(z => (
                    <Step
                      title={z.start_date}
                      description={z.description}
                      key={z.id}
                    />
                  ))}
                  <Step title={end_date} description={end_location} />
                </Steps>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
