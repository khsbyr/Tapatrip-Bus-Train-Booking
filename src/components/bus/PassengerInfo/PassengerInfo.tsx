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

const { Option } = Select;
const countries = [
  { name: '+976', src: mngIcon, value: 0 },
  { name: '+444', src: enIcon, value: 1 },
];
const selection = [
  { name: 'Хувь хүн', value: 0 },
  { name: 'Байгууллага', value: 1 },
];
export default function PassengerIfo(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selection[0]);
  return (
    <ContentWrapper>
      <div className={s.root}>
        <div className={s.regist}>
          <p className="text-cardDate w-3/4 p-3">
            Та бүртгэл үүсгэснээр хялбар, хурдан захиалга хийх боломжтой.
          </p>
          <button className={s.registButton}>Бүртгүүлэх</button>
        </div>
        <div className={s.customerInfo}>
          <h1 className={s.customerInfoTitle}>Захиалагчийн мэдээлэл</h1>
          <div className={s.customerInfoForm}>
            <div className="flex items-center w-full mt-10 px-2 sm:pr-3 lg:pr-3">
              <Select
                defaultValue={selection[0].value}
                suffixIcon={
                  <ChevronDownIcon className="text-secondary h-6 w-6" />
                }
                className="w-full bg-bg rounded-lg py-2 text-cardDate text-base"
              >
                {selection.map(select => (
                  <Option value={select.value}>
                    <p className="text-cardDate text-base">{select.name}</p>
                  </Option>
                ))}
              </Select>
            </div>
            <div className={s.customerRegisterNumber}>
              <label
                className={s.customerRegisterNumberLabel}
                htmlFor="RegisterNo"
              >
                Регистрийн дугаар
              </label>
              <RegisterNumber registNo={registNo} />
            </div>
          </div>
          <div className={s.customerInfoForm}>
            <div className={s.customerMail}>
              <label className={s.customerRegisterNumberLabel} htmlFor="email">
                И-мэйл хаяг
              </label>
              <Input
                className={s.input}
                placeholder="Таны тасалбарыг илгээх болно"
              />
            </div>
            <div className="w-full space-y-2 sm:pr-3 lg:pl-3">
              <label
                className={s.customerRegisterNumberLabel}
                htmlFor="pNumber"
              >
                Утас дугаар
              </label>
              <div className="flex rounded-lg bg-bg">
                <Select
                  defaultValue={countries[0].value}
                  className="w-36 text-sm border-r-2 p-2 text-cardDate"
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
        <div className={s.passengerInfo}>
          <div className={s.passengerInfoTitle}>
            <h1 className=" w-1/2 text-cardDate">Зорчигч 1</h1>

            <div className="pl-52">
              <h1 className="text-cardDate">ХҮҮХЭД 1000₮ </h1>
              <h1 className="text-cardDate font-normal text-xs">
                АМЬ ДААТГАЛ БАГТСАН
              </h1>
            </div>
          </div>
          <div className={s.passengerInfoForm}>
            <div className={s.passengerRegisterLastname}>
              <label
                className={s.customerRegisterNumberLabel}
                htmlFor="RegisterNo"
              >
                Регистрийн дугаар
              </label>
              <RegisterNumber registNo={registNo} />
            </div>
            <div className={s.passengerVaccineFirstname}>
              <label
                className={s.customerRegisterNumberLabel}
                htmlFor="Vaccine"
              >
                Вакцинд хамрагдсан эсэх
              </label>
              <Input className={s.input} />
            </div>
          </div>

          <div className={s.passengerInfoForm}>
            <div className={s.passengerRegisterLastname}>
              <label
                className={s.customerRegisterNumberLabel}
                htmlFor="lastName"
              >
                Овог
              </label>
              <Input className={s.input} />
            </div>
            <div className={s.passengerVaccineFirstname}>
              <label
                className={s.customerRegisterNumberLabel}
                htmlFor="firstName"
              >
                Нэр
              </label>
              <Input className={s.input} />
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
