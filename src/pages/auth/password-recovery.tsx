import React, { useState, useEffect } from 'react';
import NavbarProfile from '@components/bus/seatNavbar';
import { Form, Statistic, Input, Modal } from 'antd';
import InputPhoneNumber from '@components/common/phoneNumber';
import ContentWrapper from '@components/bus/orderModal/style';
import Footer from '@components/common/footer';
import Company from '@data/company.json';
import styles from '@components/common/layout/layout.module.scss';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useGlobalStore } from '@context/globalStore';
import Head from 'next/head';
import AuthService from '@services/auth';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import ReactCodeInput from 'react-verification-code-input';
import Link from 'next/link';
import isEmpty from '@utils/isEmpty';
import { useRouter } from 'next/router';
import style from './login.module.scss';
import { useUI } from '@context/uiContext';

const PasswordRecovery = () => {
  const { t } = useTranslation(['common']);
  const { user, setUser } = useGlobalStore();
  const router = useRouter();
  const { closeLoadingRegister, openLoadingRegister, displayLoadingRegister } =
    useUI();
  const [code, setCode] = useState(0);
  const { Countdown } = Statistic;
  const deadline = Date.now() + 60 * 60 * 83.3;
  const [pinCode, setPinCode] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState(null);
  const [error, setError] = useState(null);
  const [rePasswordError, setRePasswordError] = useState(null);
  const [confirmError, setConfirmError] = useState(null);

  const isAuth = user ? true : false;

  if (isAuth === true) {
    if (router.query && router.query.from) {
      router.push('/bus' + router.query.from);
    } else {
      router.push('/bus');
    }
  }

  useEffect(() => {
    async function loadUserFromCookies() {
      const token =
        AuthTokenStorageService.getAccessToken() &&
        AuthTokenStorageService.getAccessToken() != 'false'
          ? AuthTokenStorageService.getAccessToken()
          : '';
      if (token) {
        try {
          const res = await AuthService.getCurrentUser();
          if (res && res?.status === 200) {
            if (!isEmpty(res?.result?.user)) {
              setUser(res?.result?.user);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    loadUserFromCookies();
  }, []);

  function reset() {
    setCode(0);
  }
  const handleForgot = async values => {
    openLoadingRegister();
    let payload = {
      phone: values.loginNumber.toString(),
      dialCode: 976,
    };
    setUserPhoneNumber(values.loginNumber);
    try {
      const res = await AuthService.verifySms(payload);
      if (res) {
        setCode(2);
      } else {
        setError(t('confirmationCodeError'));
      }
      closeLoadingRegister();
    } catch (e) {
      setConfirmError(e.message);
      closeLoadingRegister();
    }
  };

  const handleVerifyCode = async () => {
    if (!pinCode) setConfirmError(t('enterConfirmationCode'));
    else if (pinCode.length < 4) setConfirmError(t('confirmCodeError'));
    openLoadingRegister();
    let data = {};
    data = {
      phone: userPhoneNumber.toString(),
      dial_code: 976,
      code: parseInt(pinCode),
    };
    try {
      if (pinCode.length > 3) {
        const res = await AuthService.getConfirmationCode(data);
        if (res && res.status === 200) {
          setCode(4);
        }
        if (res && res.status === 400) {
          setConfirmError(res.message);
        }
        closeLoadingRegister();
      }
      closeLoadingRegister();
    } catch (e) {
      setConfirmError(e.message);
      closeLoadingRegister();
    }
  };

  const handleRePassword = async values => {
    openLoadingRegister();
    const { password, rePassword } = values;
    let data = {};
    data = {
      phone: userPhoneNumber.toString(),
      dial_code: 976,
      new_password: password.toString(),
      reapet_password: rePassword.toString(),
    };
    try {
      if (password && rePassword) {
        const res = await AuthService.createNewPassword(data);
        if (res && res.status === 200) {
          setRePasswordError(null);
          if (router.query && router.query.from) {
            router.push('/auth/login' + router.query.from);
          } else {
            router.push('/auth/login');
          }
        } else {
          setRePasswordError(res?.message);
        }
        closeLoadingRegister();
      }
      closeLoadingRegister();
    } catch (e) {
      setRePasswordError(e.message);
      closeLoadingRegister();
    }
  };

  const handlePinChange = pinCode => {
    if (pinCode) setConfirmError(null);
    setPinCode(pinCode);
  };

  function getForgotForm() {
    return (
      <>
        <ContentWrapper>
          <Form name="forgot" onFinish={handleForgot}>
            <div className="text-cardDate space-y-6">
              <p className="text-lg font-semibold">
                {t('passwordRecoveryTitle')}
              </p>
              <div className="space-y-2">
                <InputPhoneNumber name="loginNumber" />
                {error && <span className="text-red-500">{error}</span>}
              </div>
            </div>
            <button className={style.loginButton} type="submit">
              {displayLoadingRegister === true ? (
                <div className={style.ldsDualRing}></div>
              ) : (
                t('sendButton')
              )}
            </button>
          </Form>
        </ContentWrapper>
      </>
    );
  }

  function getConfirmationCodeForm() {
    return (
      <>
        <Form
          name="confirm"
          onFinish={handleVerifyCode}
          className="space-y-8 py-6"
        >
          <div className="text-cardDate space-y-6">
            <p className="text-lg font-medium">{t('confirmationButton')}</p>
            <p>{t('confirmationBody')}</p>
            <div className="bg-bg py-4 space-y-2 rounded-lg">
              <div className="text-center">
                {<Countdown format="mm:ss" value={deadline} />}
              </div>
              <div className="flex justify-center">
                <ReactCodeInput
                  fields={4}
                  type="number"
                  fieldWidth={46}
                  fieldHeight={44}
                  onChange={handlePinChange}
                />
              </div>
            </div>
            {confirmError && (
              <span className="text-red-500">{confirmError}</span>
            )}
          </div>
          <button className={style.button} type="submit">
            {displayLoadingRegister === true ? (
              <div className={style.ldsDualRing}></div>
            ) : (
              t('confirmationButton')
            )}
          </button>
          <div className="flex justify-end mt-2">
            <span className="mr-2">{t('startQuiz')}</span>
            <Link href={'/auth/password-recovery'}>
              <a onClick={reset} className="font-medium underline">
                {t('thisClick')}
              </a>
            </Link>
          </div>
        </Form>
      </>
    );
  }

  function getRePasswordForm() {
    return (
      <>
        <Form
          name="rePassword"
          onFinish={handleRePassword}
          className="space-y-8"
        >
          <div className="text-cardDate space-y-6">
            <p className="text-lg font-semibold">{t('createPassword')}</p>
            <div className="space-y-6">
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: t('passwordWarning'),
                  },
                ]}
              >
                <Input.Password
                  placeholder={t('password')}
                  type="password"
                  className="rounded-lg h-12"
                />
              </Form.Item>
              <Form.Item
                name="rePassword"
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: t('rePasswordMessage'),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(t('passwordError')));
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder={t('passwordInputPlaceholder')}
                  type="password"
                  className="rounded-lg h-12"
                />
              </Form.Item>
            </div>
            {rePasswordError && (
              <span className="text-red-500">{rePasswordError}</span>
            )}
          </div>
          <button className={style.button} type="submit">
            {displayLoadingRegister === true ? (
              <div className={style.ldsDualRing}></div>
            ) : (
              t('saveButton')
            )}
          </button>
        </Form>
      </>
    );
  }

  function renderRegister(code: number) {
    switch (code) {
      case 0:
        return getForgotForm();
      case 2:
        return getConfirmationCodeForm();
      case 4:
        return getRePasswordForm();
    }
  }

  return (
    <div>
      <Head>
        <title>{t('passwordRecoveryTitle')}</title>
      </Head>
      <div className="fixed z-20 w-screen top-0">
        <NavbarProfile />
      </div>
      <div className="flex relative mt-10 lg:mt-20 bg-bg">
        {/* <div className="absolute">
          <img
            src="/assets/loginBackground.jpg"
            alt=""
            className="object-cover"
          />{' '}
        </div> */}
        <div className="relative z-10 py-36 px-4 max-w-7xl mx-auto ">
          <div className="flex flex-col-reverse lg:flex-row lg:space-x-16 xl:space-x-20 max-w-xl">
            <div className="w-full  z-2 sm:mx-auto rounded-lg bg-white p-7 sm:p-10">
              {renderRegister(code)}
              <div className="text-left text-sm font-light pt-4">
                {t('registerInstructionsBody1')}{' '}
                <a
                  href="/term-condition"
                  className="font-medium underline"
                  target="_blank"
                >
                  {t(`termsConditions`)}
                </a>{' '}
                {t('registerInstructionsBody2')}{' '}
                <a
                  href="/privacy-policy"
                  className="font-medium underline"
                  target="_blank"
                >
                  {t(`privacyPolicy`)}
                </a>{' '}
                {t('registerInstructionsBody3')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="z-20 relative w-screen">
        <div className={styles.main}>
          <Footer companyInfo={Company} />
        </div>
      </div>
    </div>
  );
};
export default PasswordRecovery;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'footer',
        'steps',
        'order',
      ])),
    },
  };
}
