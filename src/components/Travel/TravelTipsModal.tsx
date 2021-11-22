import { Modal } from 'antd';
import React, { FC, useState } from 'react';
import ContentWrapper from './style';
interface Props {
  title: string;
  image: string;
  description: string;
  isModalVisible?: any;
  close?: any;
}
const TravelTipsModal: FC<Props> = props => {
  return (
    <ContentWrapper>
      <Modal
        title={`${props.title}`}
        visible={props.isModalVisible}
        onCancel={() => props.close()}
        footer={null}
      >
        <div className="p-2">
          {props.image ? <img src={props.image} /> : null}
          <div
            className="font-normal text-sm"
            dangerouslySetInnerHTML={{
              __html: props.description,
            }}
          />
        </div>
      </Modal>
    </ContentWrapper>
  );
};

export default TravelTipsModal;
