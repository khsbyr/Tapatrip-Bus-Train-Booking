import { Form, Input, Modal } from 'antd';
import React, { useState, FC } from 'react';
import { useTranslation } from 'next-i18next';
import CurrencyFormat from 'react-currency-format';
import { useGlobalStore } from '@context/globalStore';

interface Props {
  isModalVisible?: any;
  close?: any;
}

export default function PaymentModal(props) {
  const { t } = useTranslation(['steps']);
  const { booking } = useGlobalStore();

  /*rendering popupAllowed banks */
  const renderPayment = () => {
    // console.log('paymentResponse : ', props.data);
    // console.log('payment : ', props.payment);
    // if (
    //   props.payment.name === 'XACBANK' ||
    //   props.payment.name === 'GOLOMT' ||
    //   props.payment.name === 'TDB'
    // ) {
    //   return (
    //     <iframe
    //       sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
    //       src={props.data}
    //       scrolling="yes"
    //       frameBorder="0"
    //       width="100%"
    //       height="600px"
    //     />
    //   );
    // }

    if (props.payment.name === 'QPAY') {
      return (
        <div className="text-cardDate text-base font-medium">
          <p className="flex justify-center">
            Захиалгын дүн:
            <p className="ml-3 font-normal">{booking.toPay}</p>
          </p>
          <img
            className="mx-auto"
            src={`data:image/png;base64,${props.data.qPay_QRimage}`}
            alt="Qpay code"
          />
          <p className="text-center">
            Та дээрх QR кодыг өөрийн интернет банкны аппликейшн ашиглан уншуулж
            төлбөрөө төлнө үү.
          </p>
          <p className="flex justify-center">
            Лавлах утас: <p className="ml-3 font-normal"> 75154444</p>
          </p>
        </div>
      );
    } else if (props.payment.name === 'HIPAY') {
      return <div>HIPAY</div>;
    } else if (props.payment.name === 'TDB') {
      return <div>TDB</div>;
    } else if (props.payment.name === 'STATEBANK') {
      return <div>StateBank</div>;
    } else {
      return (
        <iframe
          // X-Frame-Options="sameorigin"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          src={props.data}
          scrolling="yes"
          frameBorder="0"
          width="100%"
          height="600px"
        />
      );
    }
  };
  return (
    <Modal
      title={'Төлбөр төлөх'}
      visible={props.isModalVisible}
      onOk={() => alert('dd')}
      onCancel={props.close}
      okText={'check_payment'}
      cancelText={'close'}
      width={700}
    >
      {renderPayment()}
    </Modal>
  );
}
