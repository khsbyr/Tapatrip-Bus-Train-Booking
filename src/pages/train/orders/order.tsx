import SeatNav from '@components/bus/seatNavbar';
import RoomClass from '@components/train/selectSeat/roomClass';
import NavData from '@data/navData.json';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Steps } from 'antd';
import ContentWrapper from './style';
import { useGlobalStore } from '@context/globalStore';
const { Step } = Steps;
export default function Order() {
  const { current, setCurrent } = useGlobalStore();
  const steps = [
    {
      title: 'Select Seat',
      content: <RoomClass />,
      button: 'Select Seat Button',
    },
    {
      title: 'Passenger Information',
      content: '',
      button: 'Passenger Button',
    },
    {
      title: 'Make Payment',
      content: '',
      button: 'Payment Button',
    },
  ];
  const onChange = currentStep => {
    if (current === 1 && currentStep === 0) setCurrent(0);
  };

  return (
    <div className="relative bg-bg">
      <SeatNav />
      <div className="bg-steps w-full">
        <div className="max-w-7xl mx-auto">
          <ContentWrapper>
            <Steps
              type="navigation"
              current={current}
              onChange={onChange}
              size="small"
              responsive={true}
              className="site-navigation-steps max-w-2xl mr-auto hidden md:flex"
            >
              {steps.map(item => (
                <Step key={item.title} icon=" " title={item.title} />
              ))}
            </Steps>
          </ContentWrapper>
        </div>
      </div>
      {steps[current].content}
    </div>
  );
}
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
