import SeatNav from '@components/bus/SeatNavbar';
import Banks from '@components/common/payments/banks';
import Corporate from '@components/common/payments/corporates';
import ContentWrapper from '@components/Travel/style';
import NavData from '@data/navData.json';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/solid';
import { postRequest } from '@lib/api';
import { message, Modal } from 'antd';
import React, { useState } from 'react';
import Footer from '@components/common/Footer';
import router, { useRouter } from 'next/router';
import CurrencyFormat from 'react-currency-format';
import HeaderBackground from '@components/common/HeaderBackground';
export default function payment({ NavData, refNumber, payments }) {
  const [visible, setVisible] = useState(false);
  const [selectPayment, setSelectPayment] = useState(false);
  const [paymentName, setPaymentName] = useState('');
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isActiveCorp, setIsActiveCorp] = useState(false);

  const router = useRouter();
  const queries = router.query;

  const showModal = () => {
    setVisible(visible);
  };

  const hideModal = () => {
    setVisible(!visible);
  };
  const checkPayment = async refNumber => {
    const data = {
      payment_type: 'Package tour',
      ref_number: refNumber,
    };
    const response = await postRequest('/payment/v1/check_invoice/', data);
    if (response.status) {
      if (response.result.name === 'INVOICE_NOT_PAID') {
        Modal.confirm({
          title: 'no_payment_has_been_made',
          content:
            'Энэ захиалгын төлбөр одоогоор төлөгдөөгүй байна. Та дахин шалгаад баталгаажуулна уу.',
          okText: 'ok',
          cancelText: 'close',
        });
      }

      if (response.result.name === 'INVOICE_ALREADY_PAID') {
        Modal.confirm({
          title: 'Төлбөр баталгаажуулах.',
          icon: <CheckIcon style={{ color: 'green' }} />,
          content: 'your_payment_has_been_successfully_confirmed',
          okText: 'ok',
          cancelText: 'close',
        });
      }
    } else {
      Modal.confirm({
        title: 'Төлбөр баталгаажуулах',
        content:
          'Төлбөр баталгаажуулах явцад алдаа гарлаа. Та дахин оролдоно уу',
        okText: 'ok',
        cancelText: 'close',
      });
    }
  };

  const selectPaymentSpin = () => {
    setSelectPayment(!selectPayment);
  };

  const createInvoiceApi = async payment => {
    selectPaymentSpin();
    const data = {
      payment_type: payment.name,
      ref_number: refNumber,
      cbweb: true,
    };
    const url = '/payment/v1/create_invoice/';
    try {
      await postRequest(url, data).then(res => {
        if (res.status_code === 200) {
          setPaymentName(payment.name),
            setPaymentResponse(
              payment.name === 'HIPAY' || payment.name === 'TDB'
                ? res
                : res.result
            ),
            setVisible(payment.name === 'HIPAY' ? false : true),
            setSelectPayment(false);
        } else {
          message.warning({
            content: res.message,
            className: 'custom-class',
            duration: 30,
            style: {
              marginTop: '9vh',
            },
          });
        }
      });
    } catch (error) {
      message.error({
        content: 'Server error',
        className: 'custom-class',
        duration: 30,
        style: {
          marginTop: '9vh',
        },
      });
    }
  };
  // Payment modal
  const paymentModal = () => {
    return (
      <Modal
        title={'payment'}
        visible={visible}
        onOk={() => checkPayment(selectPayment)}
        onCancel={hideModal}
        okText={'check_payment'}
        cancelText={'close'}
        width={700}
        afterClose={() => setSelectPayment(!selectPayment)}
      >
        {renderPayment()}
        <p style={{ color: 'red', textAlign: 'center' }}>
          {'please_place_the_payment_and_click_the_confirm_button'}
        </p>
      </Modal>
    );
  };

  // render banks
  const renderBanks = () => {
    return (
      <Banks
        data={payments.ecommerce}
        callback={createInvoiceApi}
        spaceBetween={false}
      />
    );
  };

  //render corprate
  const renderCorporate = () => {
    return (
      <Corporate
        corporate={payments.corporate}
        refNumber={refNumber}
        totalPrice={Number(queries.totalPrice)}
      />
    );
  };

  /*rendering popupAlowed banks */
  const renderPayment = () => {
    if (
      paymentName === 'XACBANK' ||
      paymentName === 'GOLOMT' ||
      paymentName === 'TDB'
    ) {
      return (
        <iframe
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          src={paymentResponse}
          scrolling="yes"
          frameBorder="0"
          width="100%"
          height="600px"
        />
      );
    }

    if (paymentName === 'QPAY') {
      return (
        <div style={{ textAlign: 'center' }}>
          <img
            src={`data:image/png;base64,${paymentResponse.qPay_QRimage}`}
            alt="Qpay code"
          />
        </div>
      );
    }
  };
  /*rendering Hipay modal*/
  const paymentHiPayModal = () => {
    return (
      <Modal
        title={'payment'}
        visible={visible}
        onOk={() => checkPayment(paymentName)}
        onCancel={hideModal}
        okText={'check_payment'}
        cancelText={'close'}
        width={700}
        afterClose={() => setSelectPayment(!selectPayment)}
      >
        <div style={{ textAlign: 'center' }}>
          {/* <Spin tip="payment_is_pending..."></Spin> */}
          <div style={{ display: 'hidden' }}>{renderPaymentHiPay()}</div>
        </div>
      </Modal>
    );
  };
  /*rendering Hipay */
  const renderPaymentHiPay = () => {
    const html = `<script>
    window.open('${
      paymentName === 'HIPAY' ? paymentResponse.result : paymentResponse
    }', '_blank');
  </script>`;
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    );
  };

  return (
    <ContentWrapper>
      <div className="relative">
        <SeatNav navbarData={NavData} />
        <div style={{ minHeight: '500px' }} className="bg-bg font-Roboto ">
          <div className="default-container pt-1">
            <div className=" px-2 grid grid-cols-3 gap-2">
              <div className="p-4 col-span-2">
                <div>
                  <h1
                    className="font-bold text-2xl max-w-7xl mx-auto my-6 px-6"
                    style={{ color: '#0A3761' }}
                  >
                    Төлбөр төлөх хэлбэрүүд
                  </h1>
                </div>
                <div className="shadow-md border rounded-md px-4 py-2 bg-white mb-4">
                  <div
                    className=" flex justify-between"
                    onClick={() => setIsActive(!isActive)}
                  >
                    <div className=" items-center">
                      <div className="items-center inline-flex">
                        <h2 className="font-bold text-center text-lg">
                          Pay by card info
                        </h2>
                        <span className="m-2 bg-gray-200 text-center rounded-md p-1">
                          Pay by filling your card info
                        </span>
                      </div>
                    </div>
                    {isActive ? (
                      <ChevronUpIcon className="h-10" />
                    ) : (
                      <ChevronDownIcon className="h-10" />
                    )}
                  </div>
                  <div className={`${!isActive ? 'hidden' : 'block'}`}>
                    {renderBanks()}
                    {paymentName === 'HIPAY' || paymentName === 'STATEBANK'
                      ? paymentHiPayModal()
                      : paymentModal()}
                  </div>
                </div>
                <div className="shadow-md border rounded-md px-4 py-2 bg-white">
                  <div
                    className=" flex justify-between"
                    onClick={() => setIsActiveCorp(!isActiveCorp)}
                  >
                    <div className=" items-center">
                      <div className="items-center inline-flex">
                        <h2 className="font-bold text-center text-lg">
                          Transfer to bank account
                        </h2>
                        {/* <span className="m-2 bg-gray-200 text-center rounded-md p-1">
                        Pay by filling your card info
                      </span> */}
                      </div>
                    </div>
                    {isActiveCorp ? (
                      <ChevronUpIcon className="h-10" />
                    ) : (
                      <ChevronDownIcon className="h-10" />
                    )}
                  </div>
                  <div className={`${!isActiveCorp ? 'hidden' : 'block'}`}>
                    {renderCorporate()}
                  </div>
                </div>
              </div>
              <div className="col-span-1 p-4 ">
                <div>
                  <h1
                    className="font-bold text-2xl max-w-7xl mx-auto my-6 px-6"
                    style={{ color: '#0A3761' }}
                  >
                    Your payment information
                  </h1>
                </div>

                <div className=" bg-white border rounded-md shadow-lg">
                  <div className="flex items-center text-center">
                    <h1 className=" py-2 mx-4 my-1 font-bold">
                      {`${queries.tourName}`}
                    </h1>
                  </div>
                  <div className="flex justify-between">
                    <h1 className=" py-2 mx-4 my-1">Total passengers:</h1>
                    <h1 className=" py-2 mx-4 my-1 font-bold">
                      {queries.totalPassenger}
                    </h1>
                  </div>

                  <div className="bg-bg py-2 flex justify-between">
                    <h1 className="text-lg-16px mx-4 my-1">total price :</h1>
                    <h1 className="text-lg-16px mx-4 my-1 font-bold">
                      <CurrencyFormat
                        value={queries.totalPrice}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={` ₮`}
                      />
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer navbarData={NavData} />
    </ContentWrapper>
  );
}

export async function getServerStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export const getServerSideProps = async ({ params }) => {
  const url = '/payment/v1/payment_methods/';
  const response = await postRequest(url, params.refNumber);
  const res = NavData;
  return {
    props: {
      NavData: res,
      refNumber: params.refNumber,
      payments: response.result,
      navData: res,
    },
  };
};
