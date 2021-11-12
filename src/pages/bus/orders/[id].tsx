import React from 'react';
import PassengerInfo from '@components/bus/PassengerInfo';
import Payments from '@components/bus/Payments';
import { useQuery } from '@apollo/client';
import { BUS_SCHEDULES_DETAIL_QUERY } from '@graphql/queries';
import { Steps } from 'antd';
import NavData from '@data/navData.json';
import SelectSeats from '@components/bus/SelectSeats';
import ContentWrapper from './style';
import Layout from '@components/common/Layout';
import SeatNav from '@components/bus/SeatNavbar';
import { useRouter } from 'next/router';
import { useGlobalStore } from '@context/globalStore';
import Loader from '@components/common/Loader';

const { Step } = Steps;

export default function Payment() {
  const router = useRouter();
  const { current, setCurrent } = useGlobalStore();
  const { id } = router.query;

  const { data: scheduleDataDetail, loading } = useQuery(
    BUS_SCHEDULES_DETAIL_QUERY,
    {
      variables: {
        id: id,
      },
    }
  );

  const scheduleDataResult =
    scheduleDataDetail === undefined ? '' : scheduleDataDetail.busSchedule;

  const steps = [
    {
      title: 'Суудал сонгох',
      content: <SelectSeats datas={scheduleDataResult} />,
      button: 'Зорчигчийн мэдээлэл оруулах',
    },
    {
      title: 'Зорчигчийн мэдээлэл',
      content: <PassengerInfo datas={scheduleDataResult} />,
      button: 'Төлбөр төлөх',
    },
    {
      title: 'Төлбөр төлөх',
      content: <Payments datas={scheduleDataResult} />,
      button: 'Захиалгын мэдээлэл шалгах',
    },
  ];

  const onChange = currentStep => {
    if (current === 1 && currentStep === 0) setCurrent(0);
  };

  return (
    <Layout>
      <div className="relative bg-bg">
        <SeatNav navbarData={NavData} />

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
        {loading ? <Loader /> : steps[current].content}
      </div>
    </Layout>
  );
}
