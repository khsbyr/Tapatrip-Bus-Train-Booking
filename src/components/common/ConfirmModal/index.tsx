import { Modal } from 'antd';
import { useState } from 'react';
import ReactCodeInput from 'react-verification-code-input';
import style from './ConfirmModal.module.scss';
import ContentWrapper from './style';

export default function OrderModal(props) {
  const [pinCode, setPinCode] = useState('');

  const handlePinChange = pinCode => {
    setPinCode(pinCode);
  };

  return (
    <ContentWrapper>
      <div>
        <Modal
          visible={props.isModalVisible}
          onCancel={() => props.close()}
          className={style.Modal}
          width={580}
          footer={null}
          maskClosable={false}
        >
          <div className={style.root}>
            <h1 className="text-lg md:text-xl text-cardDate font-bold">
              Танд илгээсэн 4 оронтой тоог оруулна уу?
            </h1>
            <p className="flex justify-center py-4">
              <ReactCodeInput
                fields={4}
                fieldWidth={46}
                fieldHeight={44}
                onChange={handlePinChange}
              />
            </p>
            <button
              onClick={() => props.booking(pinCode)}
              className={style.button}
            >
              {props.loading === 'true' ? (
                <div className={style.ldsDualRing}></div>
              ) : (
                'Баталгаажуулах'
              )}
            </button>
          </div>
        </Modal>
      </div>
    </ContentWrapper>
  );
}
