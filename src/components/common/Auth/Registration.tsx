import InputPhoneNumber from '@components/common/InputPhoneNumber';
import { Form } from 'antd';
import ContentWrapper from '@components/bus/OrderModal/style';

export default function registration() {
  return (
    <Form name="login" className="space-y-8 py-6">
      <ContentWrapper>
        <InputPhoneNumber />
      </ContentWrapper>
    </Form>
  );
}
