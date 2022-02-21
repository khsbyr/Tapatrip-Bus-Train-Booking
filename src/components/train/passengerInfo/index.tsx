import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ConfirmModal from '@components/common/confirmModal';
import Layout from '@components/common/layout';
import InputPhoneNumber from '@components/train/phoneNumber';
import RegisterNumber from '@components/train/registerNumber';
import { useGlobalStore } from '@context/globalStore';
import { useTrainContext } from '@context/trainContext';
import { useUI } from '@context/uiContext';
import registNo from '@data/registerNumber.json';
import AuthService from '@services/auth';
import TrainService from '@services/train';
import {
  Button,
  Form,
  Input,
  Select,
  Tooltip,
  Modal,
  Checkbox,
  DatePicker,
  message,
} from 'antd';
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import PassengerInfoCard from '../passengerInfoCard';
import style from './passengerInfo.module.scss';
import ContentWrapper from './style';
import locale from 'antd/lib/date-picker/locale/mn_MN';

export default function PassengerInfo() {
  const { t } = useTranslation(['steps']);
  const [confirmError, setConfirmError] = useState(null);
  const router = useRouter();
  const { user } = useGlobalStore();
  const { selectedSeats, setSelectedSeats } = useTrainContext();
  const { customer, setCustomer } = useTrainContext();
  const { selectedVoyageData } = useTrainContext();
  const {
    setDisplayBlock,
    setDisplayNone,
    setDisplayLoading,
    openLoadingConfirm,
    displayLoadingConfirm,
    closeLoadingConfirm,
    displayLoadingPassengerInfo,
    closeLoadingPassengerInfo,
  } = useUI();
  const { current, setCurrent } = useGlobalStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const { endDate, orderId, setPaymentDetail } = useTrainContext();

  const isAuth = user ? true : false;

  const handleRegister = () => {
    setDisplayBlock();
    setDisplayLoading('');
    router.push('/auth/login');
  };

  const close = () => {
    setConfirmError(null);
    setIsModalVisible(false);
    closeLoadingConfirm();
  };

  const handleCustomerEmail = e => {
    if (customer) {
      customer.email = e.target.value;
      setCustomer(customer);
    } else {
      let customer = {
        companyRegister: '',
        isCompany: false,
        email: e.target.value,
        dialNumber: 976,
        phoneNumber: '',
      };
      setCustomer(customer);
    }
  };
  const passengerLastName = (e, i) => {
    selectedSeats[i].lastName = e.target.value;
    setSelectedSeats(selectedSeats);
  };

  const passengerFirstName = (e, i) => {
    selectedSeats[i].firstName = e.target.value;
    setSelectedSeats(selectedSeats);
  };

  const passangerPassportNo = (e, i) => {
    selectedSeats[i].passportNumber = e.target.value;
    setSelectedSeats(selectedSeats);
  };

  const foreign = e => {
    selectedSeats[e.target.id].isForeign =
      e.target.value === false ? true : false;
    setSelectedSeats(selectedSeats);
  };

  const birthDate = (e, dateString, i) => {
    selectedSeats[i].birthDate = dateString;
    setSelectedSeats(selectedSeats);
  };

  const onFinish = async () => {
    let payload = {
      phone: customer.phoneNumber,
      dialCode: customer.dialNumber,
    };
    try {
      const res = await AuthService.verifySms(payload);
      if (res && res.status === 200) {
        setIsModalVisible(true);
        closeLoadingPassengerInfo();
      }
      if (res && res.status === 400) {
        setIsModalVisible(true);
        closeLoadingPassengerInfo();
        setConfirmError(res.message);
      }
    } catch (e) {
      Modal.error({
        title: t('errorTitle'),
        content: t('errorContent'),
      });
      closeLoadingPassengerInfo();
    }
  };

  const handleBooking = async pinCode => {
    if (!pinCode) setConfirmError(t('enterConfirmationCode'));
    else if (pinCode.length < 4) setConfirmError(t('confirmCodeWarning'));
    openLoadingConfirm();
    let payload = {
      phone: customer.phoneNumber,
      dialCode: customer.dialNumber,
      code: '0000',
    };
    if (pinCode.length > 3) {
      try {
        if (pinCode.length > 3) {
          const res = await AuthService.verifyCode(payload);
          if (res && res.status === 200) {
            booking();
          }
          if (res && res.status === 400) {
            setConfirmError(res.message);
            closeLoadingConfirm();
          }
        }
      } catch (e) {
        setConfirmError(t('confirmCodeError'));
        closeLoadingConfirm();
      }
    }
    closeLoadingConfirm();
  };

  const booking = async () => {
    const passengers = [];
    selectedSeats.map(seat => {
      let passenger = {
        first_name: seat.firstName,
        last_name: seat.lastName,
        register_number: seat.registerNumber,
        passport_number: seat.passportNumber,
        birthdate: seat.birthDate,
        tea: seat.isOrderedTea,
      };
      passengers.push(passenger);
    });
    let payload = {
      order_id: orderId,
      passengers: passengers,
      phone_number: customer.phoneNumber,
      email: customer.email,
    };
    try {
      const res = await TrainService.createPassengers(payload);
      if (res && res.status === 200) {
        setPaymentDetail(res.result);
        setCurrent(current + 1);
      }
      if ((res && res.status === 208) || res.status === 400) {
        message.warning(res.message);
        setIsModalVisible(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      {endDate ? (
        <div className="text-center mt-5 mb-1 max-w-7xl mx-auto px-2 cursor-pointer">
          <div className="font-semibold text-xs text-cardDate  justify-center gap-2 bg-white py-5 rounded-lg md:flex md:text-base">
            Та захиалгаа{' '}
            <p className="text-yellow-400">
              {moment(endDate).format('YYYY-MM-DD hh цаг mm минут')}
            </p>
            -аас өмнө хийж дуусгана уу!
          </div>
        </div>
      ) : (
        ''
      )}
      <Form name="busBookingItem" onFinish={onFinish}>
        <div className={style.body}>
          <div className={style.content}>
            <ContentWrapper>
              <div className={style.root}>
                {!isAuth && (
                  <div className={style.regist}>
                    <p className="text-cardDate">{t('registrationContent')}</p>
                    <button
                      onClick={handleRegister}
                      className={style.registButton}
                    >
                      {t('registrationButton')}
                    </button>
                  </div>
                )}
                <div className={style.Information}>
                  <h1 className={style.customerInfoTitle}>
                    {t('passengerInformationTitle')}
                  </h1>
                  <div className="w-full px-4 pt-2 pb-4">
                    <div className={style.InfoForm}>
                      <div className={style.leftContent}>
                        <label
                          className="after:content-['*'] after:ml-0.5 after:text-red-500 text-cardDate px-2 font-medium"
                          htmlFor="pNumber"
                        >
                          {t('passengerPhoneNumber')}
                        </label>
                        <InputPhoneNumber name="customerNumber" />
                      </div>
                      {!isEmailVisible ? (
                        <div className={style.rightButton}>
                          <label
                            className="text-cardDate px-2 font-medium"
                            htmlFor="email"
                          ></label>
                          <Form.Item>
                            <Tooltip title="И-мэйл хаяг нэмэх">
                              <Button
                                type="dashed"
                                shape="circle"
                                onClick={() => setIsEmailVisible(true)}
                                icon={<PlusOutlined />}
                                size="middle"
                                className="sm:mt-4"
                              />
                            </Tooltip>
                          </Form.Item>
                        </div>
                      ) : (
                        <div className={style.rightContent}>
                          <label
                            className="text-cardDate px-2 font-medium"
                            htmlFor="email"
                          >
                            {t('mailAddressTitle')}
                          </label>
                          <Form.Item
                            name="email"
                            rules={[
                              {
                                type: 'email',
                                message: t('mailAddressCheck'),
                              },
                            ]}
                            shouldUpdate={customer.email}
                          >
                            <div className="flex items-center">
                              <Input
                                className={style.inputEmail}
                                onChange={handleCustomerEmail}
                                placeholder={t('mailAddressPlaceholder')}
                              />

                              <Button
                                type="dashed"
                                shape="circle"
                                onClick={() => setIsEmailVisible(false)}
                                icon={<MinusOutlined />}
                                size="middle"
                              />
                            </div>
                          </Form.Item>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {selectedSeats &&
                  selectedSeats.map((seat, i) => (
                    <div key={i} className={style.Information}>
                      <div className={style.passengerInfoTitle}>
                        <p>
                          <h1 className="text-cardDate">
                            Суудал: {seat.seatNumber}
                          </h1>
                        </p>

                        <div>
                          <Checkbox
                            onChange={foreign}
                            id={i}
                            value={seat.isForeign}
                          >
                            <h1 className="text-cardDate text-base">
                              Гадаад иргэн
                            </h1>
                          </Checkbox>
                        </div>
                      </div>
                      <div className="w-full px-4 py-2">
                        <div className={style.InfoForm}>
                          {seat.isForeign ? (
                            <div className={style.leftContent}>
                              <label
                                className={style.Label}
                                htmlFor="birthDate"
                              >
                                Төрсөн он, сар, өдөр
                              </label>
                              <Form.Item
                                name={`birthDate` + i}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Зорчигчийн төрсөн он, сар, өдөр заавал бөглөнө үү!',
                                  },
                                ]}
                              >
                                <DatePicker
                                  className={style.datepicker}
                                  placeholder="Төрсөн он, сар, өдөр"
                                  onChange={(e, dateString) =>
                                    birthDate(e, dateString, i)
                                  }
                                  locale={locale}
                                />
                              </Form.Item>
                            </div>
                          ) : (
                            <div className={style.leftContent}>
                              <label
                                className={style.Label}
                                htmlFor="RegisterNo"
                              >
                                {t('registerNumber')}
                              </label>
                              <RegisterNumber
                                registNo={registNo}
                                passengerNumber={i}
                              />
                            </div>
                          )}
                          <div className={style.rightContent}>
                            <label
                              className={
                                seat.isForeign ? style.Label : style.Labelreq
                              }
                              htmlFor="passportNo"
                            >
                              Пасспортын дугаар
                            </label>
                            <Form.Item
                              name={`passportNo` + i}
                              rules={[
                                {
                                  required: seat.isForeign ? true : false,
                                  message:
                                    'Зорчигчийн пасспорт заавал бөглөнө үү!',
                                },
                              ]}
                            >
                              <Input
                                className={style.input}
                                value={seat.passportNumber}
                                placeholder="Пасспортын дугаар"
                                onChange={e => passangerPassportNo(e, i)}
                              />
                            </Form.Item>
                          </div>
                        </div>
                        <div className={style.InfoForm}>
                          <div className={style.leftContent}>
                            <label className={style.Label} htmlFor="lastName">
                              {t('passengerLastName')}
                            </label>
                            <Form.Item
                              name={`lastName` + i}
                              rules={[
                                {
                                  required: true,
                                  message: 'Зорчигчийн овог заавал бөглөнө үү!',
                                },
                              ]}
                            >
                              <Input
                                value={seat.lastName}
                                className={style.input}
                                placeholder={t('passengerLastNamePlaceholder')}
                                onChange={e => passengerLastName(e, i)}
                              />
                            </Form.Item>
                          </div>
                          <div className={style.rightContent}>
                            <label className={style.Label} htmlFor="firstName">
                              {t('passengerFirstName')}
                            </label>
                            <Form.Item
                              name={`firstName` + i}
                              rules={[
                                {
                                  required: true,
                                  message: 'Зорчигчийн нэр заавал бөглөнө үү!',
                                },
                              ]}
                            >
                              <Input
                                className={style.input}
                                value={seat.firstName}
                                placeholder={t('passengerFirstNamePlaceholder')}
                                onChange={e => passengerFirstName(e, i)}
                              />
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </ContentWrapper>
            <button
              className={style.buttonBlock}
              onClick={() => setDisplayNone()}
            >
              {displayLoadingPassengerInfo === true ? (
                <div className={style.ldsDualRing}></div>
              ) : (
                t('stepPassengerInfoButton')
              )}
            </button>
          </div>
          <div className={style.card}>
            <div className="px-2 lg:px-0 space-y-3 mt-3 md:mt-0">
              <PassengerInfoCard voyage={selectedVoyageData} />
              <button className={style.button} onClick={() => setDisplayNone()}>
                {displayLoadingPassengerInfo === true ? (
                  <div className={style.ldsDualRing}></div>
                ) : (
                  t('stepPassengerInfoButton')
                )}
              </button>
            </div>
          </div>
          {isModalVisible && (
            <ConfirmModal
              isModalVisible={isModalVisible}
              booking={handleBooking}
              errorMessage={confirmError}
              close={close}
              loading={displayLoadingConfirm}
            />
          )}
        </div>
      </Form>
    </Layout>
  );
}
