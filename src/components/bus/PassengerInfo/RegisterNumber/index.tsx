import * as React from 'react';
import { Input, Select, Divider } from 'antd';
import mngIcon from 'public/assets/flagMongolia.png';
import enIcon from 'public/assets/flagEng.png';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

const RegisterNumber = ({ registNo, seatNumber='', passengerNumber=0 }) => {
  console.log(seatNumber);
  const [isOpen1, setIsOpen1] = useState(false);
  const [values1, setValues1] = useState('A');
  const [isOpen2, setIsOpen2] = useState(false);
  const [values2, setValues2] = useState('A');

  const next = value => {
    console.log(value);
    setValues1(value);
    setIsOpen1(false);
  };
 
  const next1 = value => {
    console.log(value);
    setValues2(value);
    setIsOpen2(false);
  };

  return (
    <div className="w-full">
      <div className="flex w-full">
        <button
          className="flex justify-center pl-3 pr-1 border-0 items-center rounded-lg bg-bg w-16"
          onClick={() => setIsOpen1(!isOpen1)}
        >
          <h2 className="flex items-center text-cardDate font-semibold">
            {values1}
            {!isOpen1 ? (
              <ChevronDownIcon className="text-secondary h-6 w-6" />
            ) : (
              <ChevronUpIcon className="text-secondary h-6 w-6" />
            )}
          </h2>
        </button>
        <button
          className="flex justify-center border-0 pl-3 pr-1 items-center rounded-lg bg-bg mx-2 w-16"
          onClick={() => setIsOpen2(!isOpen2)}
        >
          <h2 className="flex items-center text-cardDate font-semibold">
            {values2}
            {!isOpen2 ? (
              <ChevronDownIcon className="text-secondary h-6 w-6" />
            ) : (
              <ChevronUpIcon className="text-secondary h-6 w-6" />
            )}
          </h2>
        </button>
        <Input value={seatNumber} className="rounded-lg bg-bg border-0 p-2 py-3" />
      </div>
      {!isOpen1 ? (
        <h1></h1>
      ) : (
        <div className="z-10 flex flex-wrap mt-2 bg-white ml-1 w-64 absolute shadow-md rounded-xl px-2 py-3">
          {registNo.map(k => (
            <button
              onClick={() => next(k.uniCode)}
              className="bg-bg text-cardDate font-semibold rounded-md h-9 w-10 m-1 hover:bg-register hover:text-white "
            >
              {k.uniCode}
            </button>
          ))}
        </div>
      )}
      {!isOpen2 ? (
        <h1></h1>
      ) : (
        <div>
          <div className="z-10 ml-14 mt-2 flex flex-wrap bg-white absolute w-64 shadow-md rounded-xl p-2 py-3">
            {registNo.map(k1 => (
              <button
                onClick={() => next1(k1.uniCode)}
                className="bg-bg text-cardDate font-semibold rounded-md h-9 w-10 m-1 hover:bg-register hover:text-white"
              >
                {k1.uniCode}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterNumber;
