import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ConfirmModal from '@components/common/confirmModal';
import Layout from '@components/common/layout';
// import StepCard from '../stepCard';
import InputPhoneNumber from '@components/train/phoneNumber';
import RegisterNumber from '@components/train/registerNumber';
import { useGlobalStore } from '@context/globalStore';
import { useTrainContext } from '@context/trainContext';
import { useUI } from '@context/uiContext';
import registNo from '@data/registerNumber.json';
import { PATTERN_COMPANY_REGISTER } from '@helpers/constantValidation';
import AuthService from '@services/auth';
import { Button, Form, Input, Select, Tooltip, Modal } from 'antd';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import PassengerInfoCard from '../passengerInfoCard';
import style from './passengerInfo.module.scss';
import ContentWrapper from './style';

const { Option } = Select;

export default function PassengerInfo() {
  const { t } = useTranslation(['steps']);
  const [confirmError, setConfirmError] = useState(null);
  const router = useRouter();
  const [isCompany, setIsCompany] = useState(false);
  const { user } = useGlobalStore();
  const { selectedSeats, setSelectedSeats } = useTrainContext();
  const { customer, setCustomer } = useTrainContext();
  const { selectedVoyageData } = useTrainContext();
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
  const { current, setCurrent } = useGlobalStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);

  const isAuth = user ? true : false;

  const handleRegister = () => {
    setDisplayBlock();
    setDisplayLoading('');
    router.push('/auth/login');
  };

  const handleCompany = value => {
    let company = parseInt(value) === 0 ? false : true;
    setIsCompany(company);
    if (customer) {
      customer.isCompany = parseInt(value) === 0 ? false : true;
      setCustomer(customer);
    } else {
      let customer = {
        companyRegister: '',
        isCompany: parseInt(value) === 0 ? false : true,
        email: '',
        dialNumber: 976,
        phoneNumber: '',
      };
      setCustomer(customer);
    }
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

  const handleCustomerRegister = async e => {
    if (e.target.value.length === 7) {
      if (customer) {
        customer.companyRegister = e.target.value;
        setCustomer(customer);
      } else {
        let customer = {
          companyRegister: e.target.value,
          isCompany: false,
          email: '',
          dialNumber: 976,
          phoneNumber: '',
        };
        setCustomer(customer);
      }
    }
  };

  const passengerLastName = e => {
    selectedSeats[e.target.id - 1].lastName = e.target.value;
    setSelectedSeats(selectedSeats);
  };

  const passengerFirstName = e => {
    selectedSeats[e.target.id - 1].firstName = e.target.value;
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
      code: pinCode,
    };
    if (pinCode.length > 3) {
      try {
        if (pinCode.length > 3) {
          const res = await AuthService.verifyCode(payload);
          if (res && res.status === 200) {
            console.log(res);
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
    <Layout>
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
                        <h1 className="text-cardDate">
                          {t('passengerIndex')} {++i}
                        </h1>

                        <p>
                          <h1 className="text-cardDate">
                            Суудал: {seat.seatNumber}
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
                              passengerNumber={i}
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
                              id={i}
                              value={seat.lastName}
                              className={style.input}
                              placeholder={t('passengerLastNamePlaceholder')}
                              onChange={passengerLastName}
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
                              className={style.input}
                              value={seat.firstName}
                              placeholder={t('passengerFirstNamePlaceholder')}
                              onChange={passengerFirstName}
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
