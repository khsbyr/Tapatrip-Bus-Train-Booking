import Client from '@lib/apiClient';

const PaymentService = {
  async paymentMethods(params) {
    const response = await Client.post('/payment/v1/payment_methods/', params);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },
};

export default PaymentService;
