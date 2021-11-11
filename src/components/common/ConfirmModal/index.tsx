import { Modal } from 'antd';
import ReactCodeInput from 'react-verification-code-input';
import s from './ConfirmModal.module.scss';
import ContentWrapper from './style';
export default function OrderModal(props1) {
  return (
    <div>
      <Modal
        visible={props1.isModalVisible}
        // onCancel={() => props.close()}
        closable={false}
        className={s.Modal}
        width={580}
        footer={null}
      >
        <ContentWrapper>
          <div className={s.root}>
            <h1 className="text-lg md:text-xl text-cardDate font-bold">
              Танд илгээсэн 4 оронтой тоог оруулна уу?
            </h1>
            <h1 className="text-cardDate text-sm sm:text-base pt-6">
              Баталгаажуулах код
            </h1>

            <p className="flex justify-center">
              <ReactCodeInput fields={4} fieldWidth={46} fieldHeight={44} />
            </p>

            <h1 className="text-cardDate text-sm sm:text-base pb-4">
              Баталгаажуулах кодыг оруулна уу?
            </h1>
            <button className="bg-blue-500 text-white font-medium text-sm sm:text-base rounded py-2.5 w-full sm:w-7/12">
              Баталгаажуулах
            </button>
          </div>
        </ContentWrapper>
      </Modal>
    </div>
  );
}
