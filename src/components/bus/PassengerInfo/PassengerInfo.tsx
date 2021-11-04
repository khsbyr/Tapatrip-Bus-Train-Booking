import * as React from 'react';
import { Input, Select, Divider } from 'antd';
import mngIcon from 'public/assets/flagMongolia.png';
import enIcon from 'public/assets/flagEng.png';
import Image from 'next/image';
import ContentWrapper from './style';
import { Fragment, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import registNo from '@data/registerNumber.json';
import RegisterNumber from '@components/bus/PassengerInfo/RegisterNumber';
import s from '@components/bus/PassengerInfo/PassengerInfo.module.scss';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

export const getStaticProps = async () => {
  const res = registNo;
  return {
    props: { registNo: res },
  };
};
const { Option } = Select;
interface Props {
  registNo?: string;
}
const countries = [
  { name: '+976', src: mngIcon, value: 0 },
  { name: '+444', src: enIcon, value: 1 },
];
const selection = [
  { name: 'Хувь хүн', value: 0 },
  { name: 'Байгууллага', value: 1 },
];
export default function PassengerIfo() {
  const [selected, setSelected] = useState(selection[0]);
  return (
    <ContentWrapper>
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
                <Listbox value={selected} onChange={setSelected}>
                  <button className="w-full">
                    <Listbox.Button className="relative w-full py-3 pl-3 text-left text-cardDate bg-bg rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500">
                      <span className="block truncate font-medium">
                        {selected.name}
                      </span>

                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDownIcon className="text-secondary h-6 w-6" />
                      </span>
                    </Listbox.Button>
                  </button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    {/* <Listbox.Options className="z-10 absolute py-2 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"> */}
                    <Listbox.Options className="absolute rounded-md shadow-lg bg-white overflow-auto w-full focus:outline-none ring-1 ring-black ring-opacity-5">
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
                  placeholder="Таны тасалбарыг илгээх болно"
                />
              </div>
            </div>
            <div className={s.InfoForm}>
              <div className={s.rightContent}>
                <label className={s.Label} htmlFor="RegisterNo">
                  Регистрийн дугаар
                </label>
                <RegisterNumber registNo={registNo} />
              </div>
              <div className={s.rightContent}>
                <label className={s.Label} htmlFor="pNumber">
                  Утас дугаар
                </label>
                <div className="flex rounded-lg bg-bg">
                  <Select
                    defaultValue={countries[0].value}
                    className="w-48 text-sm border-r-2 p-2 mx-2 text-cardDate"
                  >
                    {countries.map(country => (
                      <Option value={country.value}>
                        <p className="h-full w-full">
                          <Image
                            src={country.src}
                            width="24"
                            height="12"
                            className="rounded-sm"
                          />{' '}
                          {country.name}
                        </p>
                      </Option>
                    ))}
                  </Select>
                  <Input className={s.input} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={s.Information}>
          <div className={s.passengerInfoTitle}>
            <h1 className="text-cardDate">Зорчигч 1</h1>

            <p>
              <h1 className="text-cardDate">ХҮҮХЭД 1000₮</h1>
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
                <RegisterNumber registNo={registNo} />
              </div>
              <div className={s.leftContent}>
                <label className={s.Label} htmlFor="RegisterNo">
                  Овог
                </label>
                <Input className={s.input} />
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
                <Input className={s.input} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
