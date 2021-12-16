import React, { useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
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
  const [isCompoany, setIsCompany] = useState(false);
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

  const isAuth = user ? true : false;

  const formatSelectedSeats = arrayFilterSchedule(selectedSeats, scheduleId);

  const [addBusBooking] = useMutation(BUS_BOOKING_CREATE);
  window.onpopstate = () => {
    setDisplayLoading('');
    router.push(`/bus/orders/${scheduleId}`);
    setCurrent(0);
  };

  const handleRegister = () => {
    setDisplayBlock();
    router.push('/auth/login');
  };

  const handleCompany = data => {
    let company = data == 0 ? false : true;
    setIsCompany(company);
    if (customers) {
      customers.isCompany = data === 0 ? false : true;
      setCustomers(customers);
    } else {
      let customer = {
        companyRegister: '',
        isCompany: data === 0 ? false : true,
        email: '',
        dialNumber: 976,
        phoneNumber: '',
      };
      setCustomers(customer);
    }
  };

  const close = () => {
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

  const handleCustomerRegister = e => {
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
          customers.email === '' ||
          customers.phoneNumber === undefined ||
          customers.email === undefined ||
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
          openLoadingPassengerInfo();
          if (isAuth) {
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
              const { data } = await addBusBooking({
                variables: {
                  schedule: scheduleId,
                  contactName: passengers[0].firstName,
                  contactDialNumber: parseInt(customers.dialNumber),
                  contactPhone: customers.phoneNumber,
                  contactEmail: customers.email,
                  isCompany: customers.isCompany,
                  companyRegister: customers.companyRegister,
                  pax: passengers,
                },
              });
              if (data) setBooking(data?.busBooking);
              setCurrent(current + 1);
              setIsModalVisible(false);
              closeLoadingConfirm();
            } catch (e) {
              Modal.error({
                title: t('errorTitle'),
                content: e.message,
              });
              closeLoadingConfirm();
            }
          } else {
            let payload = {
              phone: customers.phoneNumber,
              dialCode: customers.dialNumber,
            };
            const result = await AuthService.verifySms(payload);
            if (result) setIsModalVisible(true), closeLoadingPassengerInfo();
            else {
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
              const { data } = await addBusBooking({
                variables: {
                  schedule: scheduleId,
                  contactName: passengers[0].firstName,
                  contactDialNumber: parseInt(customers.dialNumber),
                  contactPhone: customers.phoneNumber,
                  contactEmail: customers.email,
                  isCompany: customers.isCompany,
                  companyRegister: customers.companyRegister,
                  pax: passengers,
                },
              });
              if (data) setBooking(data?.busBooking);
              setCurrent(current + 1);
              setIsModalVisible(false);
              closeLoadingConfirm();
            } catch (e) {
              Modal.error({
                title: t('errorTitle'),
                content: e.message,
              });
              closeLoadingConfirm();
            }
          }
          if (res && res.status === 400) {
            setConfirmError(res.message);
          }
          closeLoadingConfirm();
        }
        closeLoadingConfirm();
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
                      <label className={style.Label} htmlFor="type"></label>
                      <Form.Item name="type">
                        <Select onChange={handleCompany} defaultValue="0">
                          <Option value="0">{t('individual')}</Option>
                          <Option value="1">{t('organization')}</Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <div className={style.rightContent}>
                      <label className={style.Label} htmlFor="companyRegister">
                        {t(`registerNumber`)}
                      </label>
                      <Form.Item
                        name="companyRegister"
                        rules={[
                          {
                            pattern: PATTERN_COMPANY_REGISTER,
                            message: t('registerNumberWarning'),
                          },
                        ]}
                      >
                        <Input
                          disabled={!isCompoany}
                          className={style.input}
                          onChange={handleCustomerRegister}
                          placeholder={t('organizationRNumberPlaceholder')}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className={style.InfoForm}>
                    <div className={style.leftContent}>
                      <label className={style.Label} htmlFor="email">
                        {t('mailAddressTitle')}
                      </label>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            type: 'email',
                            message: t('mailAddressCheck'),
                          },
                          {
                            required: true,
                            message: t('mailAddressWarning'),
                          },
                        ]}
                        shouldUpdate={customers.email}
                      >
                        <Input
                          className={style.input}
                          onChange={handleCustomerEmail}
                          placeholder={t('mailAddressPlaceholder')}
                        />
                      </Form.Item>
                    </div>
                    <div className={style.rightContent}>
                      <label
                        className="text-cardDate px-2 font-medium"
                        htmlFor="pNumber"
                      >
                        {t('passengerPhoneNumber')}
                      </label>
                      <InputPhoneNumber name="customerNumber" />
                    </div>
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
