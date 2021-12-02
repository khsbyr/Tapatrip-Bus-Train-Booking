import React, { useState } from 'react';
import NavbarProfile from '@components/bus/seatNavbar';
import { Form, Statistic, Input, Modal } from 'antd';
import InputPhoneNumber from '@components/common/phoneNumber';
import ContentWrapper from '@components/bus/orderModal/style';
import NavData from '@data/navData.json';
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
import { useRouter } from 'next/router';
import style from './login.module.scss';

const PasswordRecovery = () => {
  const { t } = useTranslation(['steps']);
  const { user, setUser } = useGlobalStore();
  const router = useRouter();
  const [code, setCode] = useState(0);
  const { Countdown } = Statistic;
  const deadline = Date.now() + 60 * 60 * 83.3;
  const [pinCode, setPinCode] = useState('');
  const [loading, setLoading] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState(null);
  const [error, setError] = useState(null);
  const [rePasswordError, setRePasswordError] = useState(null);
  const [confirmError, setConfirmError] = useState(null);

  function reset() {
    setCode(0);
  }

  const handleForgot = async values => {
    setLoading('true');
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
        setError('Баталгаажуулах код явуулахад алдаа гарлаа!!!');
      }
      setLoading('false');
    } catch (e) {
      setConfirmError(e.message);
      setLoading('false');
    }
  };

  const handleVerifyCode = async () => {
    if (!pinCode) setConfirmError('Та баталгаажуулах кодоо оруулна уу?');
    else if (pinCode.length < 4)
      setConfirmError(
        'Таны оруулсан баталгаажуулах код 4 оронтой байх ёстой!!!'
      );
    setLoading('true');
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
        setLoading('false');
      }
      setLoading('false');
    } catch (e) {
      setConfirmError(e.message);
      setLoading('false');
    }
  };

  const handleRePassword = async values => {
    setLoading('true');
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
        setLoading('false');
      }
      setLoading('false');
    } catch (e) {
      setRePasswordError(e.message);
      setLoading('false');
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
              <p className="text-lg font-semibold">Нууц үг Сэргээх</p>
              <div className="space-y-2">
                <InputPhoneNumber name="loginNumber" />
                {error && <span className="text-red-500">{error}</span>}
              </div>
            </div>
            <button className={style.loginButton} type="submit">
              {loading === 'true' ? (
                <div className={style.ldsDualRing}></div>
              ) : (
                'ИЛГЭЭХ'
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
            <p className="text-lg font-medium">БАТАЛГААЖУУЛАХ</p>
            <p>
              Таны утасруу баталгаажуулах 4 оронтой тоо явууллаа. Тухайн кодыг
              оруулж утасны дугаараа баталгаажуулна уу. Баярлалаа
            </p>
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
            {loading === 'true' ? (
              <div className={style.ldsDualRing}></div>
            ) : (
              'БАТАЛГААЖУУЛАХ'
            )}
          </button>
          <div className="flex justify-end mt-2">
            <span className="mr-2">Эхнээс нь эхлэх бол? </span>
            <Link href={'/auth/password-recovery'}>
              <a onClick={reset} className="font-medium underline">
                ЭНД ДАРНА УУ
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
            <p className="text-lg font-semibold">Нууц үг үүсгэх</p>
            <div className="space-y-6">
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Та нууц үгээ оруулна уу?',
                  },
                ]}
              >
                <Input.Password
                  placeholder="Нууц үг"
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
                    message: 'Та нууц үгээ давтаж оруулна уу?',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Нууц үг хоёулаа ижил байх ёстой!')
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Нууц үг давтах"
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
            {loading === 'true' ? (
              <div className={style.ldsDualRing}></div>
            ) : (
              'ХАДГАЛАХ'
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
        <title>Нууц үг сэргээх</title>
      </Head>
      <div className="fixed z-20 w-screen top-0">
        <NavbarProfile navbarData={NavData} />
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
          <div className="flex flex-col-reverse lg:flex-row lg:space-x-16 xl:space-x-20">
            <div className="w-full sm:w-96 lg:w-2/5 z-2 sm:mx-auto rounded-lg bg-white p-7 sm:p-10">
              {renderRegister(code)}
              <div className="text-left text-sm font-light pt-4">
                Бүртгүүлэх товчийг дарж, Facebook эрхээрээ нэвтрэх болон бүртгэл
                үүсгэснээр Та tapatrip.com-н{' '}
                <a className="font-medium underline">Үйлчилгээний нөхцөл</a>{' '}
                болон{' '}
                <a className="font-medium underline">Нууцлалын баталгааг</a>{' '}
                хүлээн зөвшөөрч буй болно.
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
