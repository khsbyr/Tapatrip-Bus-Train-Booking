import React, { useEffect } from 'react';
import PassengerInfo from '@components/bus/passengerInfo';
import Payments from '@components/bus/payment';
// import Payments from '@components/bus/paymentTapatrip';
import { useQuery } from '@apollo/client';
import { BUS_SCHEDULES_DETAIL_QUERY } from '@graphql/queries';
import { Steps } from 'antd';
import SelectSeats from '@components/bus/selectSeats';
import ContentWrapper from './style';
import Layout from '@components/common/layout';
import SeatNav from '@components/bus/seatNavbar';
import { useRouter } from 'next/router';
import { useGlobalStore } from '@context/globalStore';
import Loader from '@components/common/loader';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import AuthService from '@services/auth';
import isEmpty from '@utils/isEmpty';

const { Step } = Steps;

export default function Payment() {
  const { t } = useTranslation(['steps']);
  const router = useRouter();
  const { current, setCurrent, setUser } = useGlobalStore();
  const { id } = router.query;
  useEffect(() => {
    async function loadUserFromCookies() {
      const token =
        AuthTokenStorageService.getAccessToken() &&
        AuthTokenStorageService.getAccessToken() != 'false'
          ? AuthTokenStorageService.getAccessToken()
          : '';
      if (token) {
        try {
          const res = await AuthService.getCurrentUser(token);
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
      title: t('stepSelectSeat'),
      content: <SelectSeats datas={scheduleDataResult} scheduleId={id} />,
      button: t('stepSelectSeatButton'),
    },
    {
      title: t('stepPassengerInfo'),
      content: <PassengerInfo datas={scheduleDataResult} scheduleId={id} />,
      button: t('stepPassengerInfoButton'),
    },
    {
      title: t('stepPayment'),
      content: <Payments datas={scheduleDataResult} scheduleId={id} />,
      button: t('stepPaymentButton'),
    },
  ];

  const onChange = currentStep => {
    if (current === 1 && currentStep === 0) setCurrent(0);
  };

  return (
    <Layout>
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
                  <>
                    <Step key={item.title} icon=" " title={item.title} />
                    {item.title !== t('stepPayment') ? true : false}
                  </>
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
