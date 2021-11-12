import React, { useState } from 'react';
import { Input, Select, Form } from 'antd';
import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import mngIcon from 'public/assets/flagMongolia.png';
import enIcon from 'public/assets/flagEng.png';
import Image from 'next/image';
import ContentWrapper from './style';
import s from '@components/common/InputPhoneNumber/PhoneNumber.module.scss';
import { useGlobalStore } from '@context/globalStore';
import { PATTERN_PHONE } from '@helpers/constantValidation';
const countries = [
  { name: ' 976', src: mngIcon, value: 0 },
  { name: ' 44', src: enIcon, value: 1 },
];
const { Option } = Select;
export default function InputPhoneNumber() {
  const [selectedLanguage, setSelectedLanguage] = useState(countries[0]);
  const [isSelected, setIsSelected] = useState(false);
  const { customers, setCustomers } = useGlobalStore();

  function handleChange(value) {
    if (customers) {
      customers.dialNumber = value;
      setCustomers(customers);
    } else {
      let customer = {
        companyRegister: '',
        isCompany: true,
        email: '',
        dialNumber: value,
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
    <Form>
      <ContentWrapper className="space-y-2">
        <label className={s.Label} htmlFor="pNumber">
          Утасны дугаар
        </label>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              pattern: PATTERN_PHONE,
              message: 'Утасны дугаар буруу байна',
            },
          ]}
        >
          <div className="flex items-center rounded-lg bg-bg">
            {/* <Select defaultValue={countries[0].name} onChange={handleChange}>
              {countries.map(country => (
                <option value={country.name}>
                  <Image
                    src={country.src}
                    width="24"
                    height="12"
                    className="rounded-sm flex-shrink-0"
                  />
                  {'+' + country.name}
                </option>
              ))}
            </Select> */}
            <Listbox value={selectedLanguage} onChange={setSelectedLanguage}>
              <div className={s.body}>
                <Listbox.Button className={s.listboxButton}>
                  <Image
                    className="rounded-sm flex-shrink-0"
                    src={selectedLanguage.src}
                    width="24"
                    height="12"
                  />
                  {'+' + selectedLanguage.name}
                  {isSelected ? (
                    <ChevronUpIcon className={s.icon} />
                  ) : (
                    <ChevronDownIcon className={s.icon} />
                  )}
                </Listbox.Button>
                <Listbox.Options className={s.listboxOption}>
                  {countries.map((language, id) => (
                    <Listbox.Option
                      key={id}
                      className={({ active }) =>
                        `${
                          active ? 'text-blue-500 ' : ''
                        }relative py-2 pl-10 pr-4`
                      }
                      value={language}
                    >
                      {({ selected }) => (
                        <span className={s.options}>
                          <p className="mt-0.5">
                            <Image
                              className="rounded"
                              src={language.src}
                              height="18"
                              width="36"
                            />
                            {language.name}
                          </p>
                          {selected ? (
                            <span className={s.checkIcon}>
                              <CheckIcon
                                className="w-5 h-5"
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
            </Listbox>
            <Input className={s.input} onChange={handleCustomerPhone} />
          </div>
        </Form.Item>
      </ContentWrapper>
    </Form>
  );
}
