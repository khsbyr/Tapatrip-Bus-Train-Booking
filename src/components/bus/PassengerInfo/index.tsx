import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';
import registNo from '@data/registerNumber.json';
import RegisterNumber from '@components/bus/PassengerInfo/RegisterNumber';
import style from './PassengerInfo.module.scss';
import { useGlobalStore } from '@context/globalStore';
import { PATTERN_COMPANY_REGISTER } from '@helpers/constantValidation';
import ContentWrapper from './style';
import StepCard from '../StepCard';
import InputPhoneNumber from '@components/common/InputPhoneNumber';
import { arrayFilterSchedule } from '@helpers/array-format';

const { Option } = Select;

export default function PassengerIfo({ datas, scheduleId }) {
  const [isCompoany, setIsCompany] = useState(true);
  const { customers, setCustomers } = useGlobalStore();
  const { selectedSeats, setSelectedSeats } = useGlobalStore();
  const { current, setCurrent } = useGlobalStore();

  const formatSelectedSeats = arrayFilterSchedule(selectedSeats, scheduleId);

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
    formatSelectedSeats[e.target.id - 1].lastName = e.target.value;
    setSelectedSeats(formatSelectedSeats);
  };

  const handlePassengerFirstname = e => {
    formatSelectedSeats[e.target.id - 1].firstName = e.target.value;
    setSelectedSeats(formatSelectedSeats);
  };

  const onFinish = async values => {
    //console.log('Received values of form:', values);
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

              {formatSelectedSeats &&
                formatSelectedSeats.map((seat, i) => (
                  <div key={i} className={style.Information}>
                    <div className={style.passengerInfoTitle}>
                      <h1 className="text-cardDate">Зорчигч {++i}</h1>

                      <p>
                        <h1 className="text-cardDate">
                          Том хүн{' '}
                          {seat.isChild ? datas.childTicket : datas.adultTicket}
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
                          <RegisterNumber
                            registNo={registNo}
                            seatNumber={seat.seatNumber}
                            passengerNumber={i}
                            scheduleId={scheduleId}
                          />
                        </div>
                        <div className={style.leftContent}>
                          <label className={style.Label} htmlFor="lastName">
                            Овог
                          </label>
                          {/* <Form.Item
                            name={'lastName' + i}
                            rules={[
                              {
                                required: true,
                                message: 'Зорчигчийн овгийг заавал бөглөнө үү!',
                              },
                            ]}
                          > */}
                          <Input
                            onChange={handlePassengerSurname}
                            id={i}
                            value={seat.lastName}
                            className={style.input}
                            placeholder="Зорчигчийн овог"
                          />
                          {/* </Form.Item> */}
                        </div>
                      </div>
                      <div className={style.InfoForm}>
                        <div className={style.rightContent}>
                          <label className={style.Label} htmlFor="Vaccine">
                            Вакцинд хамрагдсан эсэх
                          </label>
                          <Input
                            disabled
                            value={
                              seat.isVaccine
                                ? 'Вакцинд хамрагдсан'
                                : 'Вакцинд хамрагдаагүй'
                            }
                            className={style.input}
                          />
                        </div>
                        <div className={style.rightContent}>
                          <label className={style.Label} htmlFor="firstName">
                            Нэр
                          </label>
                          {/* <Form.Item
                            name={'firstName' + i}
                            rules={[
                              {
                                required: true,
                                message: 'Зорчигчийн нэрийг заавал бөглөнө үү!',
                              },
                            ]}
                          > */}
                          <Input
                            id={i}
                            onChange={handlePassengerFirstname}
                            className={style.input}
                            value={seat.firstName}
                            placeholder="Зорчигчийн нэр"
                          />
                          {/* </Form.Item> */}
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
            <StepCard datas={datas} scheduleId={scheduleId} />
            <button className={style.button} type="submit">
              Төлбөр төлөх
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
}
