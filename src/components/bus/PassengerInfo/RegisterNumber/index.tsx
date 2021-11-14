import * as React from 'react';
import { Input, message, Form } from 'antd';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { useGlobalStore } from '@context/globalStore';
import { useMutation } from '@apollo/client';
import { BUS_PASSENGER } from '@graphql/mutation';
import { PATTERN_PHONE, validateMessages } from '@helpers/constantValidation';

const RegisterNumber = ({ registNo, seatNumber = '', passengerNumber = 0 }) => {
  const { selectedSeats, setSelectedSeats } = useGlobalStore();
  const { customers, setCustomers } = useGlobalStore();
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [values1, setValues1] = useState('A');
  const [values2, setValues2] = useState('A');

  const [addPassenger, { data }] = useMutation(BUS_PASSENGER);
  console.log(data);

  // if (loading) return 'Submitting...';

  // const passenger = data && data.busPassenger.passenger;
  // console.log(passenger);
  const handleReg1 = e => {
    setIsOpen1(!isOpen1);
    setIsOpen2(false);
  };

  const handleReg2 = e => {
    setIsOpen2(!isOpen2);
    setIsOpen1(false);
  };

  const handleValue1 = e => {
    setValues1(e.target.value);
    setIsOpen1(false);
  };

  const handleValue2 = e => {
    setValues2(e.target.value);
    setIsOpen2(false);
  };

  const handleRegister = e => {
    if (e.target.value.length === 8) {
      const registerNumber = values1 + values2 + e.target.value;
      addPassenger({
        variables: {
          documentNumber: registerNumber,
        },
      });
      const passenger = data && data.busPassenger.passenger;
      selectedSeats[passengerNumber - 1].isChild = passenger.isChild;
      setSelectedSeats(selectedSeats);
    }
  };

  return (
    <Form.Item
      name={'register' + passengerNumber}
      rules={[
        {
          pattern: PATTERN_PHONE,
          message: 'Регистерийн дугаар буруу байна!',
        },
        {
          required: true,
          message: 'Регистерийн дугаараа заавал бөглөнө үү!',
        },
      ]}
    >
      <div className="w-full mt-0.5">
        <div className="flex w-full">
          <button
            className="flex justify-center pl-3 pr-1 border-0 items-center rounded-lg bg-bg w-16"
            onClick={handleReg1}
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
            onClick={handleReg2}
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
          <Input
            className="z-0 rounded-lg bg-bg border-0 p-2 py-3 text-cardDate text-sm sm:text-base;"
            onChange={handleRegister}
            placeholder="Регистерийн дугаар"
          />
        </div>
        {!isOpen1 ? (
          ''
        ) : (
          <div className="z-10 flex flex-wrap mt-2 bg-white ml-1 w-64 absolute shadow-md rounded-xl px-2 py-3">
            {registNo.map(k => (
              <button
                value={k.uniCode}
                onClick={handleValue1}
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
                  value={k1.uniCode}
                  onClick={handleValue2}
                  className="bg-bg text-cardDate font-semibold rounded-md h-9 w-10 m-1 hover:bg-register hover:text-white"
                >
                  {k1.uniCode}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Form.Item>
  );
};

export default RegisterNumber;
