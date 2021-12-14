import { Modal } from 'antd';
import { useState } from 'react';
import ReactCodeInput from 'react-verification-code-input';
import style from './confirmModal.module.scss';
import ContentWrapper from './style';
import { useTranslation } from 'next-i18next';

export default function ConfirmModal(props) {
  const [pinCode, setPinCode] = useState('');
  const { t } = useTranslation(['steps']);
  const [confirmError, setConfirmError] = useState(null);
  const handlePinChange = pinCode => {
    setPinCode(pinCode);
  };
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      return props.booking(pinCode);
    }
  };

  return (
    <ContentWrapper>
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
            {t('confirmModalTitle')}
          </h1>
          <p className="flex justify-center pt-4" onKeyPress={handleKeyPress}>
            <ReactCodeInput
              fields={4}
              fieldWidth={46}
              fieldHeight={44}
              onChange={handlePinChange}
            />
          </p>
          <p className="flex justify-center pb-4">
            {props.errorMessage && (
              <span className="text-red-500">{props.errorMessage}</span>
            )}
          </p>
          <button
            onClick={() => props.booking(pinCode)}
            className={style.button}
          >
            {props.loading === 'true' ? (
              <div className={style.ldsDualRing}></div>
            ) : (
              t('confirmModalButton')
            )}
          </button>
        </div>
      </Modal>
    </ContentWrapper>
  );
}
