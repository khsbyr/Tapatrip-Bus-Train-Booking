import React, { useEffect, useState } from 'react';
import Layout from '@components/common/layout';
import { useTrainContext } from '@context/trainContext';
import moment from 'moment';
import { message, Radio, Modal } from 'antd';
import ContentWrapper from './style';
import PayCorporate from '../payTransferTapa';
import { useTranslation } from 'next-i18next';
import PassengerInfoCard from '../passengerInfoCard';
import QRCode from 'react-qr-code';
import { useRouter } from 'next/router';
import PaymentService from '@services/payment';
import style from './payment.module.scss';
import EndModal from '@components/train/endModal';

const Payment = () => {
  const { endDate } = useTrainContext();
  const [payMethods, setPayMethods] = useState(undefined);
  const [value, setValue] = React.useState('GOLOMT');
  const { paymentDetail } = useTrainContext();
  const { t } = useTranslation(['train']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleCheck, setIsModalVisibleCheck] = useState(false);
  const [paymentResult, setPaymentResult] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    async function getPaymentMethods() {
      try {
        const res = await PaymentService.paymentMethods();
        if (res && res.status === 200) {
          setPayMethods(res.result);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getPaymentMethods();
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const afterClose = async () => {
    let params = {
      payment_type: value,
      ref_number: paymentDetail.ref_number,
      is_company: false,
      company_register: 0,
    };
    try {
      const res = await PaymentService.checkInvoice(params);
      if ((res && res.status === 200) || (res && res.status === 201)) {
        message.info(res.result.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setPayment = e => {
    setValue(e.target.value);
  };

  const pay = async () => {
    setLoading(true);
    let params = {
      payment_type: value,
      ref_number: paymentDetail.ref_number,
      is_company: false,
      company_register: 0,
    };
    try {
      const res = await PaymentService.createInvoice(params);
      if (res && res.status === 200) {
        setLoading(false);
        setPaymentResult(res.result);
        value === 'QPAY'
          ? setIsModalVisible(true)
          : window.open(res.result, '_blank');
      }
      if (res && res.status === 201) {
        message.warning(res.message);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (endDate) {
    const interval = setInterval(() => {
      if (
        moment().format('YYYY-MM-DD hh:mm:ss') ===
        moment(endDate).format('YYYY-MM-DD hh:mm:ss')
      ) {
        router.push({
          pathname: `/train`,
        });
        clearInterval(interval);
      }
    }, 1000);
  }

  const handleCheck = () => {
    setIsModalVisibleCheck(true);
  };

  const closeModal = () => {
    setIsModalVisibleCheck(false);
  };

  return (
    <Layout>
      <ContentWrapper>
        {endDate ? (
          <div className="text-center mt-5 mb-1 max-w-7xl mx-auto px-2 cursor-pointer">
            <p className="font-semibold text-xs text-cardDate  gap-2 bg-white py-5 rounded-lg md:text-base  ">
              {locale === 'mn' ? (
                <p>
                  Та захиалгаа{' '}
                  <span className="text-yellow-400">
                    {moment(endDate).format('YYYY-MM-DD hh цаг mm минут')}
                  </span>{' '}
                  -аас өмнө хийж дуусгана уу!
                </p>
              ) : locale === 'en' ? (
                <p>
                  Please complete your order before{' '}
                  <span className="text-yellow-400">
                    {moment(endDate).format(`YYYY-MM-DD hh:mm`)}
                  </span>
                  !
                </p>
              ) : locale === 'zh' ? (
                <p>
                  请您与
                  <span className="text-yellow-400">
                    {moment(endDate).format(
                      'YYYY年MM月DD日hh点mm分之前定完您的订单.'
                    )}
                  </span>
                </p>
              ) : (
                ''
              )}
            </p>
          </div>
        ) : (
          ''
        )}

        <div className="max-w-7xl mx-auto px-2 my-5 md:flex gap-5">
          <div className="bg-white rounded-lg h-auto p-10 w-5/5 md:w-3/5">
            <h1 className="text-base font-semibold text-cardDate">
              {t('cardOrBank')}
            </h1>

            <div className="py-5 grid">
              <Radio.Group value={value}>
                <div className="grid grid-grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-2">
                  {payMethods?.ecommerce?.map((z, index) => (
                    <Radio
                      onChange={setPayment}
                      value={z.name}
                      className="border rounded-md"
                      key={index}
                    >
                      <div className="py-2 flex items-center gap-x-3  ">
                        <img
                          src={z.logo}
                          className="w-12 h-12 ml-3 shadow-sm rounded-md"
                        />
                        <span className="font-semibold text-cardDate text-xs">
                          {z.name} {z.payment_type}
                        </span>
                      </div>
                    </Radio>
                  ))}
                </div>
              </Radio.Group>
            </div>

            <div className="flex justify-center">
              <button
                className="bg-blue-500 py-2 px-12 text-white font-semibold text-xs rounded-md"
                onClick={pay}
              >
                {loading ? (
                  <div className={style.ldsDualRing} />
                ) : (
                  <p className="py-2">{t('pay')}</p>
                )}
              </button>
            </div>

            <h1 className="text-base font-semibold text-cardDate mt-5">
              {t('transferAcc')}
            </h1>

            <PayCorporate corporate={payMethods?.corporate} />
          </div>

          <div className="w-5/5 md:w-2/5 mt-5 md:mt-0">
            <div className="mb-4">
              <PassengerInfoCard />
            </div>

            <div>
              <button className={style.buttonBlock} onClick={handleCheck}>
                {t('endButton')}
              </button>
            </div>

            <div>
              <button className={style.button} onClick={handleCheck}>
                {t('endButton')}
              </button>
            </div>

            {/* <div className="bg-white rounded-lg p-5 ">
              <h1 className="text-base font-semibold text-cardDate">
                {t('orderInformation')}
              </h1>
              <table className={style.styledTable}>
                <thead>
                  <tr>
                    <th>{t('description')}</th>
                    <th>{t('number')}</th>
                    <th>{t('payment')}</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentDetail &&
                    paymentDetail?.fees?.map((z, index) => (
                      <tr>
                        <td>{z.GROUP_NAME}</td>
                        <td>{z.QUANTITY}</td>
                        <td>{z.TOTALCOSTTUG}</td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <div className="flex justify-end mt-3">
                <h1 className="font-semibold text-cardDate text-base">
                  {t('totalPrice')}: {paymentDetail.sum} ₮
                </h1>
              </div>
            </div> */}
          </div>
        </div>

        {isModalVisibleCheck && (
          <EndModal isModalVisible={isModalVisibleCheck} close={closeModal} />
        )}

        <Modal
          title={`QPAY`}
          visible={isModalVisible}
          onCancel={handleCancel}
          width={400}
          bodyStyle={{ height: '600px', overflow: 'auto' }}
          okButtonProps={{ style: { display: 'none' } }}
          cancelText="Хаах"
          afterClose={afterClose}
          centered
        >
          <div className="flex justify-center">
            <QRCode
              size={250}
              value={paymentResult && paymentResult.qPay_QRcode}
            />
          </div>

          <div className="flex justify-center">
            <button
              className="py-3 px-12 bg-blue-500 mt-8 font-bold text-white"
              onClick={afterClose}
            >
              {t('checkPayment')}
            </button>
          </div>
        </Modal>
      </ContentWrapper>
    </Layout>
  );
};

export default Payment;
