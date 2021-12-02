import React, { useState } from 'react';
import { useGlobalStore } from '@context/globalStore';
import { useRouter } from 'next/router';
import { Statistic, Radio, Space, Modal } from 'antd';
import PayTransfer from '@components/bus/payTransfer';
import PayTransferTapa from '@components/bus/payTransferTapa';
import style from './payment.module.scss';
import ContentWrapper from './style';
import StepCard from '../stepCard';
import PaymentCard from '../paymentCard';
import EndModal from '@components/common/endModal';
import { useTranslation } from 'next-i18next';
import { CheckIcon } from '@heroicons/react/solid';

export default function PaymentTapatrip({ datas, scheduleId }) {
  const { t } = useTranslation(['steps']);
  const router = useRouter();
  const [value, setValue] = useState(1);
  const { setCurrent } = useGlobalStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Countdown } = Statistic;
  const deadline = Date.now() + 60 * 60 * 333.3;

  window.onpopstate = () => {
    Modal.warning({
      title: t('warningTitlePayment'),
      content: t('warningContentPayment'),
    });
    router.push(`/bus/orders/${scheduleId}`);
    setCurrent(2);
  };

  const handleCheck = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const banks = [
    {
      name: t('golomtBank'),
      src: '/assets/golomt.png',
      value: 0,
      accNum: '5858585858',
    },
    {
      name: t('khasBank'),
      src: '/assets/khas.png',
      value: 1,
      accNum: '1258585858',
    },
    {
      name: t('turiinBank'),
      src: '/assets/turiin.png',
      value: 2,
      accNum: '2258585858',
    },
    { name: 'HiPay', src: '/assets/hipay.png', value: 3 },
    { name: 'QPay', src: '/assets/qpay.png', value: 4 },
  ];
  return (
    <ContentWrapper>
      <div className={style.body}>
        <div className={style.content}>
          <div className="rounded-lg bg-white shadow-md p-3 sm:p-8 space-y-6 text-cardDate">
            <div className="space-y-4">
              <p className="text-base font-medium">
                {t('paymentInstructions')}
              </p>
              <div className="border-2 border-yellow-200 rounded-lg px-5 py-2 sm:px-10 sm:py-5 space-y-4">
                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-10">
                  <p className="bg-yellow-400 px-3 rounded shadow-lg">
                    {<Countdown format="mm:ss" value={deadline} />}
                  </p>
                  <p className="text-center text-sm font-medium">
                    {t('paymentInstructionsTitle')}
                  </p>
                </div>
                <ul className="text-sm">
                  <li>{t('paymentInstructionsContent1')}</li>
                  <li className="py-2">{t('paymentInstructionsContent2')}</li>
                  <ul>
                    <li>-{t('paymentInstructionsContent3')}</li>
                    <li>-{t('paymentInstructionsContent4')}</li>
                    <li>-{t('paymentInstructionsContent5')}</li>
                  </ul>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-sm font-medium">{t('paymentCardAppTitle')}</p>
              <Radio.Group
                name="radiogroup"
                defaultValue={0}
                className="grid gap-3 sm:grid-cols-2 sm:gap-4"
              >
                {banks.map(bank => (
                  <Radio
                    value={bank.value}
                    className="w-full flex-row-reverse justify-between items-start border rounded p-2 hover:bg-gray-50"
                  >
                    <div className="flex items-center font-medium space-x-3 w-56 md:w-72 lg:w-52 xl:w-72">
                      <img src={bank.src} alt="" width="45" />
                      <h1>{bank.name}</h1>
                    </div>
                  </Radio>
                ))}
              </Radio.Group>
              <div className="flex justify-center">
                <button className="bg-homeLogin flex justify-center text-white space-x-3 py-2 rounded w-full sm:w-1/3 hover:bg-blue-900">
                  <CheckIcon className="h-6 w-6" />
                  <p>{t('paymentButton')}</p>
                </button>
              </div>
            </div>
            <PayTransferTapa />
          </div>
          <button className={style.buttonBlock} onClick={handleCheck}>
            {t('endButton')}
          </button>
        </div>
        <div className={style.card}>
          <div className="px-2 lg:px-0 space-y-3 mt-3 md:mt-0">
            <StepCard datas={datas} scheduleId={scheduleId} />
            <PaymentCard datas={datas} scheduleId={scheduleId} />
            <button className={style.button} onClick={handleCheck}>
              {t('endButton')}
            </button>
          </div>
        </div>
      </div>
      {isModalVisible && (
        <EndModal isModalVisible={isModalVisible} close={closeModal} />
      )}
    </ContentWrapper>
  );
}
