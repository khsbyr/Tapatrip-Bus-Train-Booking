import { useTrainContext } from '@context/trainContext';
import { registerNumberCheck } from '@helpers/array-format';
import { PATTERN_PHONE } from '@helpers/constantValidation';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { Form, Input } from 'antd';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { useState } from 'react';

const RegisterNumber = ({ registNo, passengerNumber }) => {
  const { t } = useTranslation(['steps']);
  const { selectedSeats, setSelectedSeats } = useTrainContext();
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [values1, setValues1] = useState(registNo[0].uniCode);
  const [values2, setValues2] = useState(registNo[0].uniCode);

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
      const resError = registerNumberCheck(registerNumber);
      if (!resError) {
        selectedSeats[passengerNumber].registerNumber = registerNumber;
        setSelectedSeats(selectedSeats);
      }
    }
  };

  return (
    <Form.Item
      key={passengerNumber}
      name={'register' + passengerNumber}
      rules={[
        {
          pattern: PATTERN_PHONE,
          message: t('registerNumberError'),
        },
        {
          required: true,
          message: t('registerWarning'),
        },
        () => ({
          validator(_, value) {
            const registerNumber = values1 + values2 + value;

            if (value && value.length === 8 && registerNumber) {
              const registerError = registerNumberCheck(registerNumber);

              if (registerError)
                return Promise.reject(new Error(t('registerNumberError')));
            }
            return Promise.resolve();
          },
        }),
      ]}
    >
      <div className="w-full mt-0.5">
        <div className="flex w-full">
          <div
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
          </div>
          <div
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
          </div>
          <Input
            className="z-0 rounded-lg bg-bg border-0 p-2 py-3 text-cardDate text-sm sm:text-base"
            onChange={handleRegister}
            placeholder={t('registerNumber')}
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
