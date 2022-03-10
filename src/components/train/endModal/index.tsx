import { Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Error404 from '../404';
interface Props {
  isModalVisible?: any;
  close?: any;
}

export default function EndModal(props) {
  const { t } = useTranslation(['steps']);
  const router = useRouter();

  return (
    <Modal
      visible={props.isModalVisible}
      onCancel={() => props.close()}
      width={650}
      footer={null}
    >
      <div className="px-5 py-3 space-y-10">
        <Error404 />
        <p className="space-y-5">
          <h1 className=" text-center text-cardDate text-lg font-bold">
            {t('endModalTitle')}
          </h1>
          <h1 className="text-cardDate text-base text-center">
            {t('endModalBodyTrain')}
          </h1>
        </p>
        <div className="flex justify-center">
          <a href={'https://train.tapatrip.com/'}>
            <button className="px-10 bg-button w-full text-base sm:text-lg shadow-md rounded-md font-medium py-3 hover:bg-red-500 text-white">
              {t('endModalButton')}
            </button>
          </a>
        </div>
      </div>
    </Modal>
  );
}
