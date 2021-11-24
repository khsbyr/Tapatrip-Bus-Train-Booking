import { Statistic, Form } from 'antd';
import ContentWrapper from '@components/bus/OrderModal/style';
import { useState } from 'react';
import ReactCodeInput from 'react-verification-code-input';

export default function loginPhoneNumber() {
  const onFinish = async () => {};
  const { Countdown } = Statistic;
  const deadline = Date.now() + 60 * 60 * 83.3;
  const [pinCode, setPinCode] = useState('');
  const handlePinChange = pinCode => {
    setPinCode(pinCode);
  };
  return (
    <Form name="login" onFinish={onFinish} className="space-y-8 py-6">
      <div className="text-cardDate space-y-6">
        <p className="text-lg font-medium">БАТАЛГААЖУУЛАХ</p>
        <p>
          Таны 9911 **55 дугаарлуу баталгаажуулах 4 оронтой тоо явууллаа. Тухайн
          кодыг 15 минутын дотор оруулж утасны дугаараа баталгаажуулна уу.
          Баярлалаа
        </p>
        <div className="bg-bg py-4 space-y-2 rounded-lg">
          <div className="text-center">
            {<Countdown format="mm:ss" value={deadline} />}
          </div>
          <div className="flex justify-center">
            <ReactCodeInput
              fields={4}
              fieldWidth={46}
              fieldHeight={44}
              onChange={handlePinChange}
            />
          </div>
        </div>
        {/* <button className="w-full bg-button py-4 font-medium text-white text-xs rounded hover:shadow-xl">
          БАТАЛГААЖУУЛАХ
        </button> */}
      </div>
    </Form>
  );
}
