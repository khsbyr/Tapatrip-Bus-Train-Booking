import { Input, Form } from 'antd';
import ContentWrapper from '@components/bus/OrderModal/style';

export default function loginPhoneNumber() {
  const onFinish = async () => {};
  return (
    <Form name="login" onFinish={onFinish} className="space-y-8 py-6">
      <div className="text-cardDate space-y-6">
        <p className="text-lg font-semibold">Нууц үг үүсгэх</p>
        <ContentWrapper className="space-y-6">
          <Input placeholder="Нууц үг" className="rounded-lg h-12" />
          <Input placeholder="Нууц үг давтах" className="rounded-lg h-12" />
        </ContentWrapper>
        {/* <button className="w-full bg-button py-4 font-medium text-white text-xs rounded hover:shadow-xl">
          ХАДГАЛАХ
        </button> */}
      </div>
    </Form>
  );
}
