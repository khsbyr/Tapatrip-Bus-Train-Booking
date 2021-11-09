import React, { useState } from 'react';
import PassengerInfo from '@components/bus/PassengerInfo';
import Payments from '@components/bus/Payments';
import PaymentCard from '@components/bus/PaymentCard';
import { useQuery } from '@apollo/client';
import { BUS_SCHEDULES_DETAIL_QUERY } from '@graphql/queries';
import { Steps } from 'antd';
import NavData from '@data/navData.json';
import SelectSeats from '@components/bus/SelectSeats';
import ContentWrapper from './style';
import Layout from '@components/common/Layout';
import StepCard from '@components/bus/StepCard';
import SeatNav from '@components/bus/SeatNavbar';
import { useRouter } from 'next/router';
const { Step } = Steps;
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
  position: absolute;
  left: 100px;
  top: 0px;
  z-index: 1;
`;

export default function Payment() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const { id } = router.query;
  const {
    data: scheduleDataDetail,
    loading,
    error,
  } = useQuery(BUS_SCHEDULES_DETAIL_QUERY, {
    variables: {
      id: id,
    },
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
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
      content: <Payments />,
      button: 'Захиалагчийн мэдээлэл шалгах',
    },
  ];

  const onChange = current => {
    setCurrent(current);
  };

  const onSubmit = e => {
    console.log('submit');
  };

  const next = () => {
    setCurrent(current + 1);
  };
  return (
    <Layout>
        <div className="relative bg-bg">
          <SeatNav navbarData={NavData} /> 
          <ContentWrapper>
            <div className="bg-steps w-full">
              <div className="max-w-7xl mx-auto">
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
              </div>
            </div>
          </ContentWrapper>
          <div className="max-w-7xl mx-auto my-5 flex">
            <div className="w-full md:w-3/5 lg:w-3/5">
              {
                <ClipLoader
                  color={'#177ad6;'}
                  loading={loading}
                  css={override}
                  speedMultiplier={1}
                  size={80}
                />
              }
              {steps[current].content}
            </div>
            <div className="w-full md:w-2/5 lg:w-2/5">
              {current === 0 && (
                <div className="px-2">
                  {/* // -------------------Components_0---------------------------// */}

                <StepCard datas={scheduleDataResult} />
                <button
                  className="w-full bg-button shadow-md rounded-md font-semibold py-3 mt-2 hover:bg-red-500 text-white"
                  onClick={() => next()}
                >
                  {steps[current].button}
                </button>
              </div>
            )}
            {current === 1 && (
              <div className="p-2">
                {/* // -------------------Components_1---------------------------// */}
                <StepCard datas={scheduleDataResult} />
                <button
                  className="w-full bg-button shadow-md rounded-md font-semibold py-3 mt-2 hover:bg-red-500 text-white"
                  onClick={onSubmit}
                >
                  {steps[current].button}
                </button>
              </div>
            )}
            {current === steps.length - 1 && (
              <div className="p-2 space-y-3">
                {/* // -------------------Components_2---------------------------// */}
                <StepCard datas={scheduleDataResult} />
                <PaymentCard />
                <button className="w-full bg-button shadow-md rounded-md font-semibold py-3 mt-2 hover:bg-red-500 text-white">
                  {steps[current].button}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
