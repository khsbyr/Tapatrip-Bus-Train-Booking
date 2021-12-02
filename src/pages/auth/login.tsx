import React, { useState } from 'react';
import NavbarProfile from '@components/bus/seatNavbar';
import { Form, Statistic, Input, Modal } from 'antd';
import InputPhoneNumber from '@components/common/phoneNumber';
import ContentWrapper from '@components/bus/orderModal/style';
import NavData from '@data/navData.json';
import { Tabs } from 'antd';
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

const Login = () => {
  const { t } = useTranslation(['steps']);
  const { setUser } = useGlobalStore();
  const router = useRouter();
  const { TabPane } = Tabs;
  const [code, setCode] = useState(0);
  const { Countdown } = Statistic;
  const deadline = Date.now() + 60 * 60 * 83.3;
  const [pinCode, setPinCode] = useState('');
  const [loading, setLoading] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [rePasswordError, setRePasswordError] = useState(null);
  const [confirmError, setConfirmError] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');

  function reset() {
    setCode(0);
    setPasswordError(null);
    setCurrentPassword('');
  }

  const handleLogin = async values => {
    setLoading('true');
    const phoneNumber = values.loginNumber
      ? values.loginNumber
      : values.registerNumber;
    let payload = {
      phone: phoneNumber.toString(),
      dialCode: 976,
    };
    setUserPhoneNumber(phoneNumber);
    try {
      const res = await AuthService.createUserCheck(payload);
      if (res?.code === 1) {
        setCode(1);
      } else {
        setCode(3);
      }
      setLoading('false');
    } catch (e) {
      Modal.error({
        title: t('errorTitle'),
        content: e.message,
      });
      setLoading('false');
    }
  };

  const handlePassword = async () => {
    if (!currentPassword) setPasswordError('Та нууц үгээ оруулна уу?');
    setLoading('true');
    let data = {};
    data = {
      phone: userPhoneNumber.toString(),
      password: currentPassword.toString(),
      dial_code: 976,
    };
    try {
      if (currentPassword) {
        const res = await AuthService.authenticate(data);
        if (res && res.status === 200) {
          AuthTokenStorageService.store(res?.result?.token);
          setUser(res?.result?.user);
          setPasswordError(null);
          if (router.query && router.query.from) {
            router.push('/bus' + router.query.from);
          } else {
            router.push('/bus');
          }
        } else {
          setPasswordError(res?.message);
        }
        setLoading('false');
      }
      setLoading('false');
    } catch (e) {
      Modal.error({
        title: t('errorTitle'),
        content: e.message,
      });
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
    const { password } = values;
    let data = {};
    data = {
      phone: userPhoneNumber.toString(),
      dial_code: 976,
      password: password.toString(),
    };
    try {
      if (password) {
        const res = await AuthService.authenticate(data);
        if (res && res.status === 200) {
          AuthTokenStorageService.store(res?.result?.token);
          setUser(res?.result?.user);
          setRePasswordError(null);
          if (router.query && router.query.from) {
            router.push('/bus' + router.query.from);
          } else {
            router.push('/bus');
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

  const handleForgetPaasword = () => {
    router.push(`/auth/password-recovery`);
  };

  const handleCurrentPassword = e => {
    e.preventDefault();
    setCurrentPassword(e.target.value);
  };

  function getLoginForm() {
    return (
      <>
        <ContentWrapper>
          <Tabs
            tabBarGutter={80}
            defaultActiveKey="1"
            className="flex text-lg text-cardDate"
            centered
          >
            <TabPane tab="НЭВТРЭХ" key="1">
              <Form name="login" onFinish={handleLogin} className="space-y-4">
                <InputPhoneNumber name="loginNumber" />
                <div className="flex justify-end">
                  <button
                    onClick={handleForgetPaasword}
                    className="w-32 bg-bg py-4 font-medium text-cardDate text-xs rounded hover:bg-gray-200"
                  >
                    Нууц үг мартсан
                  </button>
                </div>
                <button className={style.button} type="submit">
                  {loading === 'true' ? (
                    <div className={style.ldsDualRing}></div>
                  ) : (
                    'НЭВТРЭХ'
                  )}
                </button>
              </Form>
            </TabPane>
            <TabPane tab="БҮРТГҮҮЛЭХ" key="2">
              <Form
                name="register"
                onFinish={handleLogin}
                className="space-y-8"
              >
                <InputPhoneNumber name="registerNumber" />
                <button className={style.button} type="submit">
                  {loading === 'true' ? (
                    <div className={style.ldsDualRing}></div>
                  ) : (
                    'БҮРТГҮҮЛЭХ'
                  )}
                </button>
              </Form>
            </TabPane>
          </Tabs>
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
            <Link href={'/auth/login'}>
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

  function getPasswordForm() {
    return (
      <>
        <Form name="password" onFinish={handlePassword}>
          <div className="text-cardDate space-y-6">
            <p className="text-lg font-semibold">Нууц үг оруулах</p>
            <div className="space-y-2">
              <Input
                placeholder="Нууц үг оруулах"
                type="password"
                name="currentPassword"
                defaultValue={currentPassword}
                onChange={handleCurrentPassword}
                className="rounded-lg h-12"
              />
              {passwordError && (
                <span className="text-red-500">{passwordError}</span>
              )}
              {!passwordError && (
                <p>
                  Таны дугаар бүртгэлтэй байна, та нууц үгээ хийж нэвтэрнэ үү.
                </p>
              )}
            </div>
          </div>
          <button className={style.loginButton} type="submit">
            {loading === 'true' ? (
              <div className={style.ldsDualRing}></div>
            ) : (
              'НЭВТРЭХ'
            )}
          </button>
          <div className="flex justify-end mt-2">
            <span className="mr-2">Эхнээс нь эхлэх бол? </span>
            <Link href={'/auth/login'}>
              <a onClick={reset} className="font-medium underline">
                ЭНД ДАРНА УУ
              </a>
            </Link>
          </div>
        </Form>
      </>
    );
  }

  function renderRegister(code: number) {
    switch (code) {
      case 0:
        return getLoginForm();
      case 1:
        return getConfirmationCodeForm();
      case 4:
        return getRePasswordForm();
      case 3:
        return getPasswordForm();
    }
  }

  return (
    <div>
      <Head>
        <title>Нэвтрэх</title>
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
            <div className="w-full lg:w-3/5 lg:pr-5 mt-10 lg:mt-0">
              <img
                className="rounded-lg object-cover"
                src="/assets/loginImage.jpg"
                alt="Picture of the author"
              />
            </div>

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
export default Login;

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
