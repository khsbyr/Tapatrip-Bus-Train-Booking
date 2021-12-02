import React, { useState } from 'react';
import { Input, Form } from 'antd';
import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { ChevronDownIcon } from '@heroicons/react/solid';
import ContentWrapper from './style';
import style from './phoneNumber.module.scss';
import { useGlobalStore } from '@context/globalStore';
import { PATTERN_PHONE } from '@helpers/constantValidation';
import { useTranslation } from 'next-i18next';

const countries = [
  { name: 976, src: '/assets/flagMongolia.png', value: 0 },
  // { name: 44, src: '/assets/flagEng.png', value: 1 },
  // { name: 86, src: '/assets/flagChina.png', value: 2 },
];

export default function PhoneNumber() {
  const { t } = useTranslation(['steps']);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isSelected, setIsSelected] = useState(false);
  const { customers, setCustomers } = useGlobalStore();

  const onClick = () => {
    setIsSelected(!isSelected);
  };

  function handleChange(value) {
    setSelectedCountry(value);
    if (customers) {
      customers.dialNumber = value.name;
      setCustomers(customers);
    } else {
      let customer = {
        companyRegister: '',
        isCompany: true,
        email: '',
        dialNumber: value.name,
        phoneNumber: '',
      };
      setCustomers(customer);
    }
  }

  const handleCustomerPhone = e => {
    if (customers) {
      customers.phoneNumber = e.target.value;
      setCustomers(customers);
    } else {
      let customer = {
        companyRegister: '',
        isCompany: true,
        email: '',
        dialNumber: '',
        phoneNumber: e.target.value,
      };
      setCustomers(customer);
    }
  };

  return (
    <ContentWrapper className="space-y-2">
      <Form.Item
        name="phone"
        rules={[
          {
            pattern: PATTERN_PHONE,
            message: t('passengerPhoneNumberError'),
          },
          {
            required: true,
            message: t('passengerPhoneNumberWarning'),
          },
        ]}
      >
        <div className="flex rounded-lg bg-bg">
          <div className="flex items-center z-10 cursor-pointer relative pl-4 w-44 border-r-2">
            <img
              className="rounded flex-shrink-0"
              src="/assets/flagMongolia.png"
              width="32"
              height="16"
            />
            <h1 className="pl-2 text-cardDate w-10">{'+' + 976}</h1>
          </div>
          {/* <Listbox value={selectedCountry} onChange={handleChange}>
            <div className="flex items-center z-10 cursor-pointer relative pl-4 w-44 border-r-2">
              <Listbox.Button
                onClick={onClick}
                className="cursor-pointer flex items-center relative text-cardDate"
              >
                <img
                  className="rounded flex-shrink-0"
                  src={selectedCountry.src}
                  width="32"
                  height="16"
                />
                <h1 className="pl-2 text-cardDate w-10">
                  {'+' + selectedCountry.name}
                </h1>
                <ChevronDownIcon className="text-gray-400 h-5 w-5" />
              </Listbox.Button>
              <Listbox.Options className="mt-28 -ml-3.5 absolute w-32 overflow-auto text-base bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm;">
                {countries.map((country, id) => (
                  <Listbox.Option
                    key={id}
                    className={({ active }) =>
                      `${active ? 'text-blue-400 ' : ''}relative py-2 pl-4`
                    }
                    value={country}
                  >
                    {({ selected }) => (
                      <span className="truncate">
                        <p className="flex items-center text-sm">
                          <img
                            className="rounded mr-2"
                            src={country.src}
                            height="16"
                            width="32"
                          />
                          <h1 className="pl-2 text-cardDate">
                            {'+' + country.name}
                          </h1>
                        </p>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center ml-20 pl-5 text-blue-400;">
                            <CheckIcon
                              className="w-5 h-5 text-blue-400"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox> */}
          <Input className={style.input} onChange={handleCustomerPhone} />
        </div>
      </Form.Item>
    </ContentWrapper>
  );
}
