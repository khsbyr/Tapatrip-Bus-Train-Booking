import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '@context/globalStore';
import { useRouter } from 'next/router';
import { Statistic, Radio, Modal, message } from 'antd';
// import PayTransfer from '@components/bus/payTransfer';
import PayTransferTapa from '@components/bus/payTransferTapa';
import style from './payment.module.scss';
import ContentWrapper from './style';
import StepCard from '../stepCard';
import PaymentCard from '../paymentCard';
import EndModal from '@components/common/endModal';
import { useTranslation } from 'next-i18next';
import PaymentService from '@services/payment';
import PaymentModal from '@components/common/paymentModal';

export default function PaymentTapatrip({ datas, scheduleId }) {
  const { t } = useTranslation(['steps']);
  const router = useRouter();
  const { setCurrent, payment, booking } = useGlobalStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalPayment, setIsModalPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(payment?.ecommerce[0]);
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [loading, setLoading] = useState('');
  const { Countdown } = Statistic;
  const deadline = Date.now() + 60 * 60 * 333.3;

  // useEffect(() => {
  //   async function loadPaymentFromCookies() {
  //     try {
  //       const res = await PaymentService.paymentMethods();
  //       console.log(res);
  //       if (res && res?.status === 200) {
  //         if (!isEmpty(res?.result)) {
  //           setPayment(res?.result);
  //         }
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   loadPaymentFromCookies();
  // }, []);

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
    setIsModalPayment(false);
  };

  const handlePayment = async () => {
    setLoading('true');
    try {
      const payload = {
        payment_type: selectedPayment.name,
        ref_number: booking.refNumber,
        cbweb: true,
      };
      const res = await PaymentService.createInvoice(payload);
      if (res && res?.status === 200) {
        setPaymentResponse(res.result);
        console.log(res);
        setIsModalPayment(true);
        setLoading('false');
      } else {
        message.warning(res.message);
        setLoading('false');
      }
      setLoading('false');
    } catch (err) {
      message.warning(err.message);
      setLoading('false');
    }
  };

  const onChange = e => {
    setSelectedPayment(e.target.value);
  };

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
                value={selectedPayment}
                onChange={onChange}
                className="grid gap-3 sm:grid-cols-2 sm:gap-4"
              >
                {payment?.ecommerce &&
                  payment?.ecommerce.map(bank => (
                    <Radio
                      value={bank}
                      className="w-full flex-row-reverse justify-between items-start border rounded p-2 hover:bg-gray-50"
                    >
                      <div className="flex items-center font-medium space-x-3 w-56 md:w-72 lg:w-52 xl:w-72">
                        <img src={bank.logo} alt="" width="45" />
                        <h1>{bank.description}</h1>
                      </div>
                    </Radio>
                  ))}
              </Radio.Group>
              <div className="flex justify-center">
                <button
                  className="bg-homeLogin flex justify-center text-white space-x-3 py-3 rounded w-full sm:w-1/3 hover:bg-blue-900"
                  type="submit"
                  onClick={handlePayment}
                >
                  {loading === 'true' ? (
                    <div className={style.ldsDualRing}></div>
                  ) : (
                    t('paymentButton')
                  )}
                </button>
              </div>
            </div>
            <PayTransferTapa corporate={payment?.corporate} />
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
      {isModalPayment && (
        <PaymentModal
          isModalVisible={isModalPayment}
          close={closeModal}
          data={paymentResponse}
          payment={selectedPayment}
        />
      )}
    </ContentWrapper>
  );
}
