import { Modal } from 'antd';
import React from 'react';
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
      <iframe
        // X-Frame-Options="sameorigin"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        src="https://my.telcocom.mn/callus/#!#%2FCE05E5603B1C11EC8428FFD132F2D921"
        scrolling="yes"
        frameBorder="0"
        width="100%"
        height="600px"
      />
    </Modal>
  );
}
