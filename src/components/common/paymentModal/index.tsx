import { Form, Input, Modal } from 'antd';
import React, { useState, FC } from 'react';
import { useTranslation } from 'next-i18next';

interface Props {
  isModalVisible?: any;
  close?: any;
}

export default function PaymentModal(props) {
  const { t } = useTranslation(['steps']);

  /*rendering popupAllowed banks */
  const renderPayment = () => {
    console.log('paymentResponse : ', props.data);
    console.log('payment : ', props.payment);
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
        <div style={{ textAlign: 'center' }}>
          <img
            src={`data:image/png;base64,${props.data.qPay_QRimage}`}
            alt="Qpay code"
          />
        </div>
      );
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
      title={'payment'}
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
