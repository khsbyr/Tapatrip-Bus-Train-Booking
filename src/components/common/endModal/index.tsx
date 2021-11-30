import { Form, Input, Modal } from 'antd';
import React, { useState, FC } from 'react';
import { PATTERN_PHONE } from '@helpers/constantValidation';
import { useMutation } from '@apollo/client';
import { BUS_BOOKING_CHECK } from '@graphql/mutation';
import moment from 'moment';
import { useTranslation } from 'next-i18next';

interface Props {
  isModalVisible?: any;
  close?: any;
}

export default function EndModal(props) {
  const { t } = useTranslation(['steps']);
  return (
    <Modal
      visible={props.isModalVisible}
      onCancel={() => props.close()}
      width={650}
      footer={null}
    >
      <div className="px-5 py-3 space-y-10">
        <div className="flex justify-center">
          <img src="/assets/endBusImg.png" alt="" />
        </div>
        <p className="space-y-5">
          <h1 className=" text-center text-cardDate text-lg font-bold">
            {t('endModalTitle')}
          </h1>
          <h1 className="text-cardDate text-base text-center">
            {t('endModalBody')}
          </h1>
        </p>
        <div className="flex justify-center">
          <a href="/">
            <button className="px-10 bg-button text-base sm:text-lg shadow-md rounded-md font-medium py-3 hover:bg-red-500 text-white">
              {t('endModalButton')}
            </button>
          </a>
        </div>
      </div>
    </Modal>
  );
}
