import * as React from 'react';
import { Input } from 'antd';
import { Fragment, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import registNo from '@data/registerNumber.json';
import RegisterNumber from '@components/bus/PassengerInfo/RegisterNumber';
import s from '@components/bus/PassengerInfo/PassengerInfo.module.scss';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import InputPhoneNumber from '@components/common/InputPhoneNumber';
import { useGlobalStore } from '@context/globalStore';

const selection = [
  { name: 'Хувь хүн', value: 0 },
  { name: 'Байгууллага', value: 1 },
];

export default function PassengerIfo({ datas }) {
  const router = useRouter();
  const [selected, setSelected] = useState(selection[0]);
  const [isSelected, setIsSelected] = useState(false);
  const { customers, setCustomers } = useGlobalStore();
  const { id } = router.query;
  const { selectedSeats } = useGlobalStore();

  console.log(selectedSeats);
  console.log(customers);

  const onClick = () => {
    setIsSelected(!isSelected);
  };

  const select = () => {
    setIsSelected(!isSelected);
  };

  const handleCompany = data => {
    console.log(data);
    if(customers) {
      customers.isCompany = data.value===0 ? false :true;
      setCustomers(customers);
    }
    else {
      let customer = {
        companyRegister:'',
        isCompany: data.value===0 ? false :true,
        email: '',
        dialNumber: '976',
        phoneNumber:''
      }
      setCustomers(customer);
    }
  };
  
  const handleCustomerEmail = e => {
    if(customers) {
      customers.email = e.target.value;
      setCustomers(customers);
    }
    else {
      let customer = {
        companyRegister:'',
        isCompany: true,
        email:e.target.value,
        dialNumber: '976',
        phoneNumber:''
      }
      setCustomers(customer);
    }
  };

  const handleCustomerRegister = e => {
    if(customers) {
      customers.companyRegister = e.target.value;
      setCustomers(customers);
    }
    else {
      let customer = {
        companyRegister: e.target.value,
        isCompany: true,
        email:'',
        dialNumber: '976',
        phoneNumber:''
      }
      setCustomers(customer);
    }
  };

  return (
    <div className={s.root}>
      <div className={s.regist}>
        <p className="text-cardDate">
          Та бүртгэл үүсгэснээр хялбар, хурдан захиалга хийх боломжтой.
        </p>
        <button className={s.registButton}>Бүртгүүлэх</button>
      </div>

      <div className={s.Information}>
        <h1 className={s.customerInfoTitle}>Захиалагчийн мэдээлэл</h1>
        <div className="w-full sm:grid grid-cols-2 px-4 py-2">
          <div className={s.InfoForm}>
            <div className={s.customerSelect}>
              <Listbox value={selected} onChange={handleCompany}>
                <button className="w-full" onClick={onClick}>
                  <Listbox.Button className="relative w-full py-3 pl-3 text-left text-cardDate bg-bg rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500">
                    <span className="block truncate font-medium">
                      {selected.name}
                    </span>

                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      {isSelected ? (
                        <ChevronUpIcon className="text-secondary h-6 w-6" />
                      ) : (
                        <ChevronDownIcon className="text-secondary h-6 w-6" />
                      )}
                    </span>
                  </Listbox.Button>
                </button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options
                    className="absolute rounded-md shadow-lg bg-white overflow-auto w-full focus:outline-none ring-1 ring-black ring-opacity-5"
                    onClick={select}
                  >
                    {selection.map((bank, i) => (
                      <Listbox.Option
                        key={i}
                        className={({ active }) =>
                          `${active ? 'bg-bg' : 'bg-white'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                        }
                        value={bank}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`${
                                selected ? 'text-cardDate' : 'text-cardDate'
                              } block truncate`}
                            >
                              {bank.name}
                            </span>
                            {selected ? (
                              <span
                                className={`${active ? '' : ''}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                              >
                                <CheckIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </Listbox>
            </div>
            <div className={s.leftContent}>
              <label className={s.Label} htmlFor="email">
                И-мэйл хаяг
              </label>
              <Input
                className={s.input}
                type="email"
                onChange={handleCustomerEmail} 
                placeholder="Таны тасалбарыг илгээх болно"
              />
            </div>
          </div>
          <div className={s.InfoForm}>
            <div className={s.rightContent}>
              <label className={s.Label} htmlFor="RegisterNo">
                Регистрийн дугаар
              </label>
              <Input  onChange={handleCustomerRegister}  className={s.input} />
            </div>
            <div className={s.rightContent}>
              <InputPhoneNumber />
            </div>
          </div>
        </div>
      </div>

      {selectedSeats &&
        selectedSeats.map((seat, i) => (
          <div className={s.Information}>
            <div className={s.passengerInfoTitle}>
              <h1 className="text-cardDate">Зорчигч {++i}</h1>

              <p>
                <h1 className="text-cardDate">Том хүн {datas.adultTicket}</h1>
                <h1 className="text-cardDate font-normal text-xs">
                  АМЬ ДААТГАЛ БАГТСАН 
                </h1>
              </p>
            </div>
            <div className="w-full sm:grid grid-cols-2 px-4 py-2">
              <div className={s.InfoForm}>
                <div className={s.leftContent}>
                  <label className={s.Label} htmlFor="RegisterNo">
                    Регистрийн дугаар
                  </label>
                  <RegisterNumber registNo={registNo} seatNumber={seat.seatNumber} passengerNumber={i}/>
                </div>
                <div className={s.leftContent}>
                  <label className={s.Label} htmlFor="RegisterNo">
                    Овог
                  </label>
                  <Input  className={s.input} />
                </div>
              </div>
              <div className={s.InfoForm}>
                <div className={s.rightContent}>
                  <label className={s.Label} htmlFor="RegisterNo">
                    Вакцинд хамрагдсан эсэх
                  </label>
                  <p className={s.input}>Вакцинд хамрагдсан эсэх</p>
                </div>
                <div className={s.rightContent}>
                  <label className={s.Label} htmlFor="RegisterNo">
                    Нэр
                  </label>
                  <Input defaultValue={seat.firstName} className={s.input} />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
