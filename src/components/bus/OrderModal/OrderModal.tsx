import { Input, Modal } from 'antd';
import React, { FC } from 'react';
import ContentWrapper from './style';

interface Props {
  isModalVisible?: any;
  close?: any;
}

const OrderModal: FC<Props> = props => {
  return (
    <ContentWrapper>
      <Modal
        title="Захиалгийн мэдээлэл шалгах"
        okText="Хадгалах"
        cancelText="Буцах"
        visible={props.isModalVisible}
        // onOk={save}
        onCancel={() => props.close()}
      >
        <Input placeholder="Basic usage" />

        <Input placeholder="Basic usage" />

        <Input placeholder="Basic usage" />
      </Modal>
    </ContentWrapper>
  );
};

export default OrderModal;
