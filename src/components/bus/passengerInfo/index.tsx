import React, { useState } from 'react';
import { Form, Input, Modal, Select, Button, Tooltip } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import registNo from '@data/registerNumber.json';
import RegisterNumber from '@components/bus/registerNumber';
import style from './passengerInfo.module.scss';
import { useGlobalStore } from '@context/globalStore';
import { useUI } from '@context/uiContext';
import { useMutation } from '@apollo/client';
import { BUS_BOOKING_CREATE } from '@graphql/mutation';
import { PATTERN_COMPANY_REGISTER } from '@helpers/constantValidation';
import ContentWrapper from './style';
import StepCard from '../stepCard';
import InputPhoneNumber from '@components/common/phoneNumber';
import { arrayFilterSchedule } from '@helpers/array-format';
import ConfirmModal from '@components/common/confirmModal';
import AuthService from '@services/auth';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const { Option } = Select;

export default function PassengerIfo({ datas, scheduleId }) {
  const { t } = useTranslation(['steps']);
  const [confirmError, setConfirmError] = useState(null);
  const router = useRouter();
  const [isCompany, setIsCompany] = useState(false);
  const { user, customers, setCustomers } = useGlobalStore();
  const { selectedSeats, setSelectedSeats } = useGlobalStore();
  const {
    displayBlock,
    setDisplayBlock,
    setDisplayNone,
    setDisplayLoading,
    openLoadingConfirm,
    displayLoadingConfirm,
    closeLoadingConfirm,
    openLoadingPassengerInfo,
    displayLoadingPassengerInfo,
    closeLoadingPassengerInfo,
  } = useUI();
  const { setBooking } = useGlobalStore();
  const { current, setCurrent } = useGlobalStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);

  const isAuth = user ? true : false;

  const formatSelectedSeats = arrayFilterSchedule(selectedSeats, scheduleId);

  const [addBusBooking] = useMutation(BUS_BOOKING_CREATE);

  window.onpopstate = () => {
    router.push(`/bus/orders/${scheduleId}`);
    setCurrent(0);
    setDisplayLoading('');
  };

  const handleRegister = () => {
    setDisplayBlock();
    setDisplayLoading('');
    router.push('/auth/login');
  };

  const handleCompany = value => {
    let company = parseInt(value) === 0 ? false : true;
    setIsCompany(company);
    if (customers) {
      customers.isCompany = parseInt(value) === 0 ? false : true;
      setCustomers(customers);
    } else {
      let customer = {
        companyRegister: '',
        isCompany: parseInt(value) === 0 ? false : true,
        email: '',
        dialNumber: 976,
        phoneNumber: '',
      };
      setCustomers(customer);
    }
  };

  const close = () => {
    setConfirmError(null);
    setIsModalVisible(false);
    closeLoadingConfirm();
  };

  const handleCustomerEmail = e => {
    if (customers) {
      customers.email = e.target.value;
      setCustomers(customers);
    } else {
      let customer = {
        companyRegister: '',
        isCompany: false,
        email: e.target.value,
        dialNumber: 976,
        phoneNumber: '',
      };
      setCustomers(customer);
    }
  };

  const handleCustomerRegister = async e => {
    if (e.target.value.length === 7) {
      if (customers) {
        customers.companyRegister = e.target.value;
        setCustomers(customers);
      } else {
        let customer = {
          companyRegister: e.target.value,
          isCompany: false,
          email: '',
          dialNumber: 976,
          phoneNumber: '',
        };
        setCustomers(customer);
      }
    }
  };

  const handlePassengerSurname = e => {
    formatSelectedSeats[e.target.id - 1].lastName = e.target.value;
    formatSelectedSeats[e.target.id - 1].lastNameError = '';
    setSelectedSeats(formatSelectedSeats);
  };

  const handlePassengerFirstname = e => {
    formatSelectedSeats[e.target.id - 1].firstName = e.target.value;
    formatSelectedSeats[e.target.id - 1].firstNameError = '';
    setSelectedSeats(formatSelectedSeats);
  };

  const booking = async (token = '') => {
    const passengers = [];
    formatSelectedSeats.map(seat => {
      let passenger = {
        firstName: seat.firstName,
        seat: parseInt(seat.seatNumber),
        lastName: seat.lastName,
        documentNumber: seat.documentNumber,
      };
      passengers.push(passenger);
    });
    try {
      global.analytics.track('Bus/Seat/OrderButton', {
        schedule: scheduleId,
        contactPhone: customers.phoneNumber,
        seatCount: passengers.length,
        time: Date.now(),
      });
      const { data } = await addBusBooking({
        variables: {
          schedule: scheduleId,
          contactName: passengers[0].firstName,
          contactDialNumber: customers?.dialNumber
            ? parseInt(customers.dialNumber)
            : 976,
          contactPhone: customers.phoneNumber,
          contactEmail: customers.email ? customers.email : '',
          isCompany: customers.isCompany,
          companyRegister: customers.companyRegister,
          pax: passengers,
        },
        context: {
          headers: {
            userToken: token,
          },
        },
        onCompleted: () => {
          closeLoadingConfirm();
          closeLoadingPassengerInfo();
        },
      });
      if (data) setBooking(data?.busBooking);
      setIsModalVisible(false);
      setCurrent(current + 1);
    } catch (e) {
      Modal.error({
        title: t('errorTitle'),
        content: e.message,
      });
      global.analytics.track('Bus/Seat/Error', {
        error: e.message,
        time: Date.now(),
      });
      closeLoadingConfirm();
      closeLoadingPassengerInfo();
    }
  };

  const onFinish = async e => {
    var p1 = new Promise((resolve, reject) => {
      formatSelectedSeats.forEach(async (element, i) => {
        formatSelectedSeats[i].lastNameError = element.lastName
          ? ''
          : t('passengerLastNameWarning');
        formatSelectedSeats[i].firstNameError = element.firstName
          ? ''
          : t('passengerFirstNameWarning');
        setSelectedSeats(formatSelectedSeats);
        if (
          element.lastName === '' ||
          element.firstName === '' ||
          element.documentNumber === '' ||
          customers.phoneNumber === '' ||
          customers.phoneNumber === undefined ||
          element.documentNumber === undefined
        ) {
          reject(new Error('Error!'));
        }
      });
      resolve('Success!');
    });
    if (!displayBlock) {
      p1.then(
        async () => {
          setConfirmError(null);
          openLoadingPassengerInfo();
          if (isAuth) {
            booking();
          } else {
            let payload = {
              phone: customers.phoneNumber,
              dialCode: customers.dialNumber,
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
          }
        },
        reason => {
          console.error(reason); // Error!
        }
      );
    }
  };
  const handleBooking = async pinCode => {
    if (!pinCode) setConfirmError(t('enterConfirmationCode'));
    else if (pinCode.length < 4) setConfirmError(t('confirmCodeWarning'));
    openLoadingConfirm();
    let payload = {
      phone: customers.phoneNumber,
      dialCode: customers.dialNumber,
      code: pinCode,
    };
    if (pinCode.length > 3) {
      try {
        if (pinCode.length > 3) {
          const res = await AuthService.verifyCode(payload);
          if (res && res.status === 200) {
            booking(res.token);
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

  return (
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
                        className="text-cardDate px-2 font-medium"
                        htmlFor="type"
                      ></label>
                      <Form.Item name="type">
                        <Select onChange={handleCompany} defaultValue="0">
                          <Option value="0">{t('individual')}</Option>
                          <Option value="1">{t('organization')}</Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <div className={style.rightContent}>
                      <label
                        className="text-cardDate px-2 font-medium"
                        htmlFor="companyRegister"
                      >
                        {t(`registerNumber`)}
                      </label>
                      <Form.Item
                        name="companyRegister"
                        rules={[
                          {
                            pattern: PATTERN_COMPANY_REGISTER,
                            message: t('registerNumberWarning'),
                          },
                          isCompany && {
                            required: true,
                            message:
                              'Компаний регистерийн дугаараа оруулна уу?',
                          },
                        ]}
                      >
                        <Input
                          disabled={!isCompany}
                          className={style.input}
                          onChange={handleCustomerRegister}
                          placeholder={t('organizationRNumberPlaceholder')}
                        />
                      </Form.Item>
                    </div>
                  </div>
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
                          shouldUpdate={customers.email}
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

              {formatSelectedSeats &&
                formatSelectedSeats.map((seat, i) => (
                  <div key={i} className={style.Information}>
                    <div className={style.passengerInfoTitle}>
                      <h1 className="text-cardDate">
                        {t('passengerIndex')} {++i}
                      </h1>

                      <p>
                        <h1 className="text-cardDate">
                          {seat.isChild
                            ? t('passengerChild')
                            : t('passengerAdults')}{' '}
                          {seat.isChild
                            ? datas?.childTicket
                            : datas?.adultTicket}
                        </h1>
                      </p>
                    </div>
                    <div className="w-full px-4 py-2">
                      <div className={style.InfoForm}>
                        <div className={style.leftContent}>
                          <label className={style.Label} htmlFor="RegisterNo">
                            {t('registerNumber')}
                          </label>
                          <RegisterNumber
                            registNo={registNo}
                            seatNumber={seat.seatNumber}
                            passengerNumber={i}
                            scheduleId={scheduleId}
                          />
                        </div>
                        <div className={style.rightContent}>
                          <label className={style.Label} htmlFor="Vaccine">
                            {t('checkVaccineTitle')}
                          </label>
                          <p className={style.input}>
                            {seat.documentNumber === ''
                              ? '?'
                              : seat.isVaccine
                              ? '' + t('yesVaccine') + ''
                              : '' + t('noVaccine') + ''}
                          </p>
                        </div>
                      </div>
                      {seat.isField && (
                        <div className={style.InfoForm}>
                          <div className={style.leftContent}>
                            <label className={style.Label} htmlFor="lastName">
                              {t('passengerLastName')}
                            </label>
                            <Input
                              onChange={handlePassengerSurname}
                              id={i}
                              value={seat.lastName}
                              className={style.input}
                              placeholder={t('passengerLastNamePlaceholder')}
                            />
                            {seat.lastNameError && (
                              <span className="text-red-500 text-sm">
                                {seat.lastNameError}
                              </span>
                            )}
                          </div>
                          <div className={style.rightContent}>
                            <label className={style.Label} htmlFor="firstName">
                              {t('passengerFirstName')}
                            </label>
                            <Input
                              id={i}
                              onChange={handlePassengerFirstname}
                              className={style.input}
                              value={seat.firstName}
                              placeholder={t('passengerFirstNamePlaceholder')}
                            />
                            {seat.firstNameError && (
                              <span className="text-red-500 text-sm">
                                {seat.firstNameError}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
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
            <StepCard datas={datas} scheduleId={scheduleId} />
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
  );
}
