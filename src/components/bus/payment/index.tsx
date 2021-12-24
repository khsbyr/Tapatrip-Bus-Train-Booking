import React, { useState } from 'react';
import { useGlobalStore } from '@context/globalStore';
import { useRouter } from 'next/router';
import { Statistic, Modal } from 'antd';
import PayTransfer from '@components/bus/payTransfer';
import style from './payment.module.scss';
import ContentWrapper from './style';
import StepCard from '../stepCard';
import PaymentCard from '../paymentCard';
import EndModal from '@components/common/endModal';
import { useTranslation } from 'next-i18next';

export default function Payment({ datas, scheduleId }) {
  const { t } = useTranslation(['steps']);
  const router = useRouter();
  const { setCurrent } = useGlobalStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Countdown } = Statistic;
  const deadline = Date.now() + 60 * 60 * 333.3;
  const { booking } = useGlobalStore();
  const [timer, setTimer] = useState(deadline);

  const qrCode =
    JSON.parse(booking.payment)[0].invoice.qPay_QRimage === undefined
      ? JSON.parse(booking.payment)[1].invoice.qPay_QRimage
      : JSON.parse(booking.payment)[0].invoice.qPay_QRimage;

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

  function onFinish() {
    router.push(`/bus`);
  }

  return (
    <ContentWrapper>
      <div className={style.body}>
        <div className={style.content}>
          <div className="rounded-lg bg-white shadow-md p-3 sm:p-8 space-y-6 text-cardDate">
            <div className="bg-white space-y-4">
              <p className="text-base font-medium">
                {t('paymentInstructions')}
              </p>
              <div className="border-2 border-yellow-200 rounded-lg px-5 py-2 sm:px-10 sm:py-5 space-y-4">
                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-10">
                  <p className="bg-yellow-400 px-3 rounded shadow-lg">
                    {
                      <Countdown
                        format="mm:ss"
                        value={timer}
                        onFinish={onFinish}
                      />
                    }
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
            <div>
              <PayTransfer />
              <div>
                <p className="text-base font-medium">QPay</p>
                <img src={`data:image/png;base64,${qrCode}`} />
              </div>
            </div>
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
