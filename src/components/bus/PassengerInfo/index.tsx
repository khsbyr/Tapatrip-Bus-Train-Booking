import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';
import registNo from '@data/registerNumber.json';
// import RegisterNumber from '@components/bus/PassengerInfo/RegisterNumber';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import style from './PassengerInfo.module.scss';
import { useGlobalStore } from '@context/globalStore';
import {
  PATTERN_COMPANY_REGISTER,
  PATTERN_PHONE,
} from '@helpers/constantValidation';
import ContentWrapper from './style';
import StepCard from '../StepCard';
import InputPhoneNumber from '@components/common/InputPhoneNumber';

const { Option } = Select;

export default function PassengerIfo({ datas }) {
  const [isCompoany, setIsCompany] = useState(true);
  const { customers, setCustomers } = useGlobalStore();
  const { selectedSeats, setSelectedSeats } = useGlobalStore();
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [values1, setValues1] = useState('A');
  const [values2, setValues2] = useState('A');
  const { current, setCurrent } = useGlobalStore();

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
    console.log(e);
  };

  const handleCompany = data => {
    let company = data == 0 ? true : false;
    setIsCompany(company);
    if (customers) {
      customers.isCompany = data === 0 ? false : true;
      setCustomers(customers);
    } else {
      let customer = {
        companyRegister: '',
        isCompany: data === 0 ? false : true,
        email: '',
        dialNumber: '976',
        phoneNumber: '',
      };
      setCustomers(customer);
    }
  };

  const handleCustomerEmail = e => {
    if (customers) {
      customers.email = e.target.value;
      setCustomers(customers);
    } else {
      let customer = {
        companyRegister: '',
        isCompany: true,
        email: e.target.value,
        dialNumber: '976',
        phoneNumber: '',
      };
      setCustomers(customer);
    }
  };

  const handleCustomerRegister = e => {
    if (customers) {
      customers.companyRegister = e.target.value;
      setCustomers(customers);
    } else {
      let customer = {
        companyRegister: e.target.value,
        isCompany: true,
        email: '',
        dialNumber: '976',
        phoneNumber: '',
      };
      setCustomers(customer);
    }
  };

  const handlePassengerSurname = e => {
    selectedSeats[e.target.id - 1].lastName = e.target.value;
    setSelectedSeats(selectedSeats);
  };

  const handlePassengerFirstname = e => {
    selectedSeats[e.target.id - 1].firstName = e.target.value;
    setSelectedSeats(selectedSeats);
  };

  const onFinish = async values => {
    alert(values);
    console.log('Received values of form:', values);
    // setCurrent(current + 1);
  };

  return (
    <Form name="busBookingItem" onFinish={onFinish}>
      <div className={style.body}>
        <div className={style.content}>
          <ContentWrapper>
            <div className={style.root}>
              <div className={style.regist}>
                <p className="text-cardDate">
                  Та бүртгэл үүсгэснээр хялбар, хурдан захиалга хийх боломжтой.
                </p>
                <button className={style.registButton}>Бүртгүүлэх</button>
              </div>
              <div className={style.Information}>
                <h1 className={style.customerInfoTitle}>
                  Захиалагчийн мэдээлэл
                </h1>
                <div className="w-full sm:grid grid-cols-2 px-4 pt-2 pb-4">
                  <div className={style.InfoForm}>
                    <div className={style.leftContent}>
                      <label className={style.Label} htmlFor="type"></label>
                      <Form.Item name="type">
                        <Select onChange={handleCompany} defaultValue="0">
                          <Option value="0">Хувь хүн</Option>
                          <Option value="1">Байгууллага</Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <div className={style.leftContent}>
                      <label className={style.Label} htmlFor="email">
                        И-мэйл хаяг
                      </label>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            type: 'email',
                            message: 'И-мэйл буруу байна!',
                          },
                          {
                            required: true,
                            message: 'И-мэйл хаягаа заавал бөглөнө үү!',
                          },
                        ]}
                      >
                        <Input
                          className={style.input}
                          onChange={handleCustomerEmail}
                          placeholder="Таны тасалбарыг илгээх болно"
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className={style.InfoForm}>
                    <div className={style.rightContent}>
                      <label className={style.Label} htmlFor="companyRegister">
                        Регистрийн дугаар
                      </label>
                      <Form.Item
                        name="companyRegister"
                        rules={[
                          {
                            pattern: PATTERN_COMPANY_REGISTER,
                            message: 'Компаний регистерийн дугаар буруу байна',
                          },
                        ]}
                      >
                        <Input
                          disabled={isCompoany}
                          className={style.input}
                          onChange={handleCustomerRegister}
                          placeholder="Компаний регистерийн дугаар"
                        />
                      </Form.Item>
                    </div>
                    <div className={style.rightContent}>
                      <InputPhoneNumber />
                    </div>
                  </div>
                </div>
              </div>

              {selectedSeats &&
                selectedSeats.map((seat, i) => (
                  <div className={style.Information}>
                    <div className={style.passengerInfoTitle}>
                      <h1 className="text-cardDate">Зорчигч {++i}</h1>

                      <p>
                        <h1 className="text-cardDate">
                          Том хүн {datas.adultTicket}
                        </h1>
                        <h1 className="text-cardDate font-normal text-xs">
                          АМЬ ДААТГАЛ БАГТСАН
                        </h1>
                      </p>
                    </div>
                    <div className="w-full sm:grid grid-cols-2 px-4 py-2">
                      <div className={style.InfoForm}>
                        <div className={style.leftContent}>
                          <label className={style.Label} htmlFor="RegisterNo">
                            Регистрийн дугаар
                          </label>
                          <Form.Item
                            name="register"
                            rules={[
                              {
                                pattern: PATTERN_PHONE,
                                message: 'Регистерийн дугаар буруу байна!',
                              },
                              {
                                required: true,
                                message:
                                  'Регистерийн дугаараа заавал бөглөнө үү!',
                              },
                            ]}
                          >
                            <div className="w-full">
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
                                  className={style.input}
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
                        </div>
                        <div className={style.leftContent}>
                          <label className={style.Label} htmlFor="lastName">
                            Овог
                          </label>
                          <Form.Item
                            name="lastName"
                            rules={[
                              {
                                required: true,
                                message: 'Зорчигчийн овгийг заавал бөглөнө үү!',
                              },
                            ]}
                          >
                            <Input
                              onChange={handlePassengerSurname}
                              id={i}
                              className={style.input}
                              placeholder="Зорчигчийн овог"
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className={style.InfoForm}>
                        <div className={style.rightContent}>
                          <label className={style.Label} htmlFor="Vaccine">
                            Вакцинд хамрагдсан эсэх
                          </label>
                          <Input disabled className={style.input} />
                        </div>
                        <div className={style.rightContent}>
                          <label className={style.Label} htmlFor="firstName">
                            Нэр
                          </label>
                          <Form.Item
                            name="firstName"
                            rules={[
                              {
                                required: true,
                                message: 'Зорчигчийн нэрийг заавал бөглөнө үү!',
                              },
                            ]}
                          >
                            <Input
                              value={seat.firstName}
                              onChange={handlePassengerFirstname}
                              id={i}
                              className={style.input}
                              placeholder="Зорчигчийн нэр"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </ContentWrapper>
        </div>
        <div className={style.card}>
          <div className="px-2 lg:px-0 space-y-3 mt-3 md:mt-0">
            <StepCard datas={datas} />
            <button className={style.button} type="submit">
              Төлбөр төлөх
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
}
