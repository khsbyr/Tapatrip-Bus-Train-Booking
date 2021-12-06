import React, { useState } from 'react';
import { useGlobalStore } from '@context/globalStore';
import { useRouter } from 'next/router';
import { Statistic, Radio, Space, Modal } from 'antd';
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
  const [value, setValue] = useState(1);
  const { setCurrent } = useGlobalStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Countdown } = Statistic;
  const deadline = Date.now() + 60 * 60 * 333.3;
  const { booking } = useGlobalStore();
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

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleCheck = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <ContentWrapper>
      <div className={style.body}>
        <div className={style.content}>
          <div className={style.root}>
            <div className={style.bodyPayment}>
              <div className={style.instructions}>
                <p>{t('paymentInstructions')}</p>
                <p>{<Countdown format="mm:ss" value={deadline} />}</p>
              </div>
              <ul className="p-4 text-sm sm:text-base px-10">
                <li>{t('paymentInstructionsContent1')}</li>
                <li className="py-6">{t('paymentInstructionsContent2')}</li>
                <ul>
                  <li>-{t('paymentInstructionsContent3')}</li>
                  <li>-{t('paymentInstructionsContent4')}</li>
                  <li>-{t('paymentInstructionsContent5')}</li>
                </ul>
              </ul>
            </div>

            <div className={style.radioGroup}>
              <h1 className={style.paymentTitle}>{t('paymentTitle')}</h1>
              <Radio.Group onChange={onChange} value={value} className="w-full">
                <div className="w-full ml-6">
                  <Space direction="vertical">
                    <Radio value={1}>
                      <div className="w-full">
                        <p className={style.paymentShape}>{t('transfer')}</p>
                        {value === 1 && <PayTransfer />}
                      </div>
                    </Radio>
                    <Radio value={2}>
                      <div>
                        <p className={style.paymentShape}>QPay</p>
                        {value === 2 && (
                          // <img
                          //   src={`data:image/png;base64,${qrCode}`}
                          //   alt="Qpay code"
                          //   width={150}
                          //   height={150}
                          // />
                          <div>QPAY</div>
                        )}
                      </div>
                    </Radio>
                  </Space>
                </div>
              </Radio.Group>
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
