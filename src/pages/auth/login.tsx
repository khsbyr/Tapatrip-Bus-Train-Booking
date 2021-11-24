import NavbarProfile from '@components/bus/seatNavbar';
import LoginPhoneNumber from '@components/common/Auth/loginPhoneNumber';
import Registration from '@components/common/Auth/Registration';
import RegistrationConfirm from '@components/common/Auth/RegistrationConfirm';
import CreatePass from '@components/common/Auth/CreatePass';
import NavData from '@data/navData.json';
import { Tabs } from 'antd';
import Footer from '@components/common/Footer';
import Company from '@data/company.json';
import styles from '@components/common/Layout/layout.module.scss';
import { useState } from 'react';

const Login = () => {
  const { TabPane } = Tabs;
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const clicked = current => {
    switch (current) {
      case 1:
        return (
          <>
            <RegistrationConfirm />
            <button
              onClick={() => next()}
              className="w-full bg-button py-4 font-medium text-white text-xs rounded hover:shadow-xl"
            >
              БАТАЛГААЖУУЛАХ
            </button>
          </>
        );
      case 2:
        return (
          <>
            <CreatePass />
            <button
              onClick={() => next()}
              className="w-full bg-button py-4 font-medium text-white text-xs rounded hover:shadow-xl"
            >
              ХАДГАЛАХ
            </button>
          </>
        );

      default:
        return (
          <p className="text-center text-sm text-cardDate font-medium">
            АМЖИЛТТАЙ !!!
          </p>
        );
    }
  };

  return (
    <div>
      <div className="fixed z-20 w-screen top-0">
        <NavbarProfile navbarData={NavData} />
      </div>
      <div className="flex relative mt-10 lg:mt-20 bg-bg">
        {/* <div className="absolute"><img src="/assets/loginBackground.jpg" alt="" className="object-cover" /> </div> */}
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
              {current === 0 ? (
                <Tabs
                  defaultActiveKey="1"
                  className="flex text-lg text-cardDate"
                  centered
                >
                  <TabPane tab="НЭВТРЭХ" key="1">
                    <LoginPhoneNumber />
                  </TabPane>
                  <TabPane tab="БҮРТГҮҮЛЭХ" key="2">
                    <Registration />
                    <button
                      onClick={() => next()}
                      className="w-full bg-button py-4 font-medium text-white text-xs rounded hover:shadow-xl"
                    >
                      БҮРТГҮҮЛЭХ
                    </button>
                  </TabPane>
                </Tabs>
              ) : (
                clicked(current)
              )}

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
