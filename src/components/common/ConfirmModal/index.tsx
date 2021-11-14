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
        >
          <div className={style.root}>
            <h1 className="text-lg md:text-xl text-cardDate font-bold">
              Танд илгээсэн 4 оронтой тоог оруулна уу?
            </h1>
            <h1 className="text-cardDate text-sm sm:text-base pt-6">
              Баталгаажуулах код
            </h1>

            <p className="flex justify-center">
              <ReactCodeInput
                fields={4}
                fieldWidth={46}
                fieldHeight={44}
                onChange={handlePinChange}
              />
            </p>
            <h1 className="text-cardDate text-sm sm:text-base pb-4">
              Баталгаажуулах кодыг оруулна уу?
            </h1>
            <button
              onClick={() => props.booking(pinCode)}
              className={style.button}
            >
              Баталгаажуулах
            </button>
          </div>
        </Modal>
      </div>
    </ContentWrapper>
  );
}
