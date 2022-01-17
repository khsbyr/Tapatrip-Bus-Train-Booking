import * as React from 'react';
import { Input, Form } from 'antd';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { useGlobalStore } from '@context/globalStore';
import { useMutation } from '@apollo/client';
import { BUS_PASSENGER } from '@graphql/mutation';
import { PATTERN_PHONE } from '@helpers/constantValidation';
import {
  arrayFilterSchedule,
  registerNumberCheck,
} from '@helpers/array-format';
import { useTranslation } from 'next-i18next';

const RegisterNumber = ({
  registNo,
  seatNumber = '',
  passengerNumber = 0,
  scheduleId = '',
}) => {
  const { selectedSeats, setSelectedSeats } = useGlobalStore();
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [values1, setValues1] = useState(registNo[0].uniCode);
  const [values2, setValues2] = useState(registNo[0].uniCode);

  const formatSelectedSeats = arrayFilterSchedule(selectedSeats, scheduleId);

  const [addPassenger, { data }] = useMutation(BUS_PASSENGER);

  const handleReg1 = e => {
    formatSelectedSeats[passengerNumber - 1].registerError = '';
    setIsOpen1(!isOpen1);
    setIsOpen2(false);
  };

  const handleReg2 = e => {
    formatSelectedSeats[passengerNumber - 1].registerError = '';
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
  const { t } = useTranslation(['steps']);

  const handleRegister = async e => {
    if (e.target.value.length === 8) {
      const registerNumber = values1 + values2 + e.target.value;
      const resError = registerNumberCheck(registerNumber);
      var p1 = new Promise((resolve, reject) => {
        if (passengerNumber > 1) {
          for (let i = 1; i < passengerNumber; i++) {
            if (
              formatSelectedSeats[i - 1].documentNumber === registerNumber ||
              resError
            ) {
              reject(new Error('Error!'));
            } else resolve('Success!');
          }
        } else {
          if (resError) {
            reject(new Error('Error!'));
          }
        }
        resolve('Success!');
      });

      p1.then(
        async () => {
          try {
            const { data } = await addPassenger({
              variables: {
                documentNumber: registerNumber,
              },
            });
            const passenger = data && data.busPassenger.passenger;
            formatSelectedSeats[passengerNumber - 1].isChild = passenger
              ? passenger.isChild
              : '';
            formatSelectedSeats[passengerNumber - 1].isVaccine =
              passenger.firstName ? true : false;

            formatSelectedSeats[passengerNumber - 1].isField = true;

            formatSelectedSeats[passengerNumber - 1].firstName = passenger
              ? passenger.firstName
              : '';
            formatSelectedSeats[passengerNumber - 1].lastName = passenger
              ? passenger.lastName
              : '';
            formatSelectedSeats[passengerNumber - 1].documentNumber =
              registerNumber;
            formatSelectedSeats[passengerNumber - 1].lastNameError = '';
            formatSelectedSeats[passengerNumber - 1].firstNameError = '';
            setSelectedSeats(formatSelectedSeats);
          } catch (e) {
            console.log(e);
          }
        },
        reason => {
          console.error(reason); // Error!
        }
      );
    } else {
      formatSelectedSeats[passengerNumber - 1].isField = false;
      setSelectedSeats(formatSelectedSeats);
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
        ({ getFieldValue }) => ({
          validator(_, value) {
            const registerNumber = values1 + values2 + value;
            if (value && passengerNumber > 1 && value.length === 8) {
              for (let i = 1; i < passengerNumber; i++) {
                if (
                  formatSelectedSeats[i - 1].documentNumber.slice(0, 2) +
                    getFieldValue('register' + i) ===
                  registerNumber
                ) {
                  return Promise.reject(new Error(t('registNumberCheck')));
                }
              }
            }
            if (value && value.length === 8 && registerNumber) {
              const registerError = registerNumberCheck(registerNumber);
              let bd = registerNumber.split('');
              let birthYear = parseInt(bd[2]) * 10 + parseInt(bd[3]);
              birthYear = birthYear > 21 ? 0 : birthYear;
              if (registerError)
                return Promise.reject(new Error(t('registerNumberError')));
              if (birthYear > 17)
                return Promise.reject(
                  new Error('4-ээс дээш насны хүүхдэд билет бичих боломжтой')
                );
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
