import React, { useEffect, useState } from 'react';
import Layout from '@components/common/layout';
import { useTrainContext } from '@context/trainContext';
import moment from 'moment';
import TrainService from '@services/train';
import { message, Radio } from 'antd';
import ContentWrapper from './style';
import PayCorporate from '../payTransferTapa';
import style from './payment.module.scss';

const Payment = () => {
  const { endDate } = useTrainContext();
  const [payMethods, setPayMethods] = useState(undefined);
  const [value, setValue] = React.useState('GOLOMT');
  const { paymentDetail } = useTrainContext();

  useEffect(() => {
    async function getPaymentMethods() {
      try {
        const res = await TrainService.paymentMethods();
        if (res && res.status === 200) {
          setPayMethods(res.result);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getPaymentMethods();
  }, []);

  const setPayment = e => {
    setValue(e.target.value);
  };

  const pay = async () => {
    let params = {
      payment_type: value,
      ref_number: 'F210083991',
      is_company: false,
      company_register: 0,
    };
    try {
      const res = await TrainService.createInvoice(params);
      if (res && res.status === 200) {
        window.open(res.result, '_blank');
      }
      if (res && res.status === 201) {
        message.warning(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <ContentWrapper>
        {endDate ? (
          <div className="text-center mt-5 mb-1 max-w-7xl mx-auto px-2 cursor-pointer">
            <p className="font-semibold text-xs text-cardDate  gap-2 bg-white py-5 rounded-lg md:text-base">
              Та захиалгаа{' '}
              <span className="text-yellow-400">
                {moment(endDate).format('YYYY-MM-DD hh цаг mm минут')}
              </span>{' '}
              -аас өмнө хийж дуусгана уу!
            </p>
          </div>
        ) : (
          ''
        )}

        <div className="max-w-7xl mx-auto px-2 my-5 flex gap-5">
          <div className="bg-white rounded-lg h-auto p-10 w-3/5">
            <h1 className="text-base font-semibold text-cardDate">
              КАРТААР БОЛОН ИНТЕРНЕТ БАНКААР
            </h1>

            <div className="py-5 grid">
              <Radio.Group value={value}>
                <div className="grid grid-cols-2 gap-y-2 gap-x-2">
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
                className="bg-blue-500 py-3 px-12 text-white font-semibold text-xs rounded-md"
                onClick={pay}
              >
                ТӨЛБӨР ТӨЛӨХ
              </button>
            </div>

            <h1 className="text-base font-semibold text-cardDate mt-5">
              ДАНСААР ШИЛЖҮҮЛЭХ
            </h1>

            <PayCorporate corporate={payMethods?.corporate} />
          </div>

          <div className="w-2/5">
            <div className="bg-white rounded-lg p-5 ">
              <h1 className="text-base font-semibold text-cardDate">
                Захиалгын мэдээлэл
              </h1>
              <table className={style.styledTable}>
                <thead>
                  <tr>
                    <th>Тайлбар</th>
                    <th>Тоо</th>
                    <th>Төлбөр</th>
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
                  Нийт үнэ: {paymentDetail.sum} ₮
                </h1>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </Layout>
  );
};

export default Payment;
