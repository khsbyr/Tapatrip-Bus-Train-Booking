import { Input, Form } from 'antd';
import ContentWrapper from '@components/bus/orderModal/style';

export default function createPassword() {
  return (
    <Form name="login" className="space-y-8 py-6">
      <div className="text-cardDate space-y-6">
        <p className="text-lg font-semibold">Нууц үг үүсгэх</p>
        <ContentWrapper className="space-y-6">
          <Input placeholder="Нууц үг" className="rounded-lg h-12" />
          <Input placeholder="Нууц үг давтах" className="rounded-lg h-12" />
        </ContentWrapper>
      </div>
    </Form>
  );
}
