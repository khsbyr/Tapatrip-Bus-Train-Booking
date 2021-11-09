import NavbarProfile from '@components/common/Navbar/NavbarProfile';
import LoginPhoneNumber from '@components/common/Login/loginPhoneNumber';
// import LoginGMail from '@components/common/Login/loginGmail';
import Img from '@public/assets/loginImg.gif';
import Image from 'next/image';
import NavData from '@data/navData.json';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const Login = () => {
  return (
    <div className="relative bg-bg">
      <NavbarProfile navbarData={NavData} />
      <div className="flex justify-center">
        <div className="flex flex-wrap max-w-7xl sm:my-32">
          <div className="w-full md:w-3/5">
            <Image
              className="rounded-lg"
              src={Img}
              alt="Picture of the author"
            />
          </div>
          <div className="w-full md:w-2/5 flex justify-center">
            <Tabs
              defaultActiveKey="1"
              className="flex flex-wrap text-base font-medium text-cardDate px-5 rounded-lg py-2 pb-4 bg-white"
            >
              <TabPane tab="Утасны дугаар" key="1">
                <LoginPhoneNumber />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
