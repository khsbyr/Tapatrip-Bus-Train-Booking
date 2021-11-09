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
import s from './orders.module.scss';

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
      button: 'Захиалгын мэдээлэл шалгах',
    },
  ];

  const onChange = current => {
    setCurrent(current);
  };

  const onSubmit = e => {
    console.log('submit');
  };

  const next = () => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    }
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
        <div className={s.body}>
          <div className={s.content}>
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
            <button className={s.buttonBlock} onClick={() => next()}>
              {steps[current].button}
            </button>
          </div>

          <div className={s.card}>
            <div className="px-2 md:px-0 space-y-3 mt-3 md:mt-0">
              <StepCard datas={scheduleDataResult} />
              {current === steps.length - 1 ? <PaymentCard /> : ''}
              <button className={s.button} onClick={() => next()}>
                {steps[current].button}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
