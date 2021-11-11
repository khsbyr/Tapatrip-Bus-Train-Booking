import React, { useState } from 'react';
import PassengerInfo from '@components/bus/PassengerInfo';
import Payments from '@components/bus/Payments';
import PaymentCard from '@components/bus/PaymentCard';
import { useQuery } from '@apollo/client';
import { BUS_SCHEDULES_DETAIL_QUERY } from '@graphql/queries';
import { message, Steps } from 'antd';
import NavData from '@data/navData.json';
import SelectSeats from '@components/bus/SelectSeats';
import ContentWrapper from './style';
import Layout from '@components/common/Layout';
import StepCard from '@components/bus/StepCard';
import SeatNav from '@components/bus/SeatNavbar';
import { useRouter } from 'next/router';
const { Step } = Steps;
import s from './orders.module.scss';
import ConfirmModal from '@components/common/ConfirmModal';
import { useGlobalStore } from '@context/globalStore';
import Loader from '@components/common/Loader';
import AuthService from '@services/auth';

export default function Payment() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const { current, setCurrent } = useGlobalStore();
  const { selectedSeats, customers } = useGlobalStore();
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

  const onSubmit = async () => {
    const payload = {
      phone: '88080482',
      dialCode: '976',
    };
    const result = await AuthService.verifySms(payload);
    console.log(result);
    // if(!customers) message.warn('Захиалагчийн мэдээллээ оруулна уу?')
    // console.log(customers);
    // console.log(selectedSeats);
    // console.log('submit');
  };

  // function checkOrder() {
  //   setIsModalVisible(true);
  // }

  const onChange = current => {
    if (current === 0) setCurrent(0);
  };

  const closeModal = () => {
    setIsModalVisible(false);
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
      {isModalVisible && (
        <ConfirmModal isModalVisible={isModalVisible} close={closeModal} />
      )}
    </Layout>
  );
}
