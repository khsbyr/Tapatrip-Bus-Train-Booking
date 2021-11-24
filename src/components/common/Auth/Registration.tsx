import InputPhoneNumber from '@components/common/InputPhoneNumber';
import { Statistic, Input, Form } from 'antd';
import ContentWrapper from '@components/bus/OrderModal/style';

export default function loginPhoneNumber() {
  const onFinish = async () => {};
  const clicked = () => {
    console.log('clicked');
  };
  return (
    <Form name="login" onFinish={onFinish} className="space-y-8 py-6">
      <ContentWrapper>
        <InputPhoneNumber />
      </ContentWrapper>
      {/* <button className="w-full bg-button py-4 font-medium text-white text-xs rounded hover:shadow-xl">
        БҮРТГҮҮЛЭХ
      </button> */}
    </Form>
  );
}
