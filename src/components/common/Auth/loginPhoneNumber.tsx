import { Form, Input } from 'antd';
import InputPhoneNumber from '@components/common/InputPhoneNumber';
import ContentWrapper from '@components/bus/orderModal/style';
import { useState } from 'react';

export default function loginPhoneNumber() {
  const [current, setCurrent] = useState(0);
  const clicked = () => {
    setCurrent(current + 1);
  };
  return (
    <Form action="" className="space-y-4 py-6">
      {current === 0 ? (
        <>
          <ContentWrapper>
            <InputPhoneNumber />
          </ContentWrapper>

          <div className="flex justify-end">
            <button className="w-32 bg-bg py-4 font-medium text-cardDate text-xs rounded hover:bg-gray-200">
              Нууц үг мартсан
            </button>
          </div>
        </>
      ) : (
        <Input placeholder="Нууц үг" className="rounded-lg h-12" />
      )}

      <button
        className="w-full bg-button py-4 font-medium text-white text-xs rounded hover:shadow-xl"
        onClick={clicked}
      >
        НЭВТРЭХ
      </button>
    </Form>
  );
}
