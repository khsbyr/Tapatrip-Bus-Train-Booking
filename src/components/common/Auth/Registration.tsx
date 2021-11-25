import InputPhoneNumber from '@components/common/phoneNumber';
import { Form } from 'antd';
import ContentWrapper from '@components/bus/orderModal/style';

export default function registration() {
  return (
    <Form name="login" className="space-y-8 py-6">
      <ContentWrapper>
        <InputPhoneNumber />
      </ContentWrapper>
    </Form>
  );
}
