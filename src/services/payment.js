import Client from '@lib/apiClient';

const PaymentService = {
  /*Ticket data generation*/
  // async paymentMethods(params) {
  //   const response = await Client.post('/payment/v1/payment_methods/', params);
  //   const datas = {
  //     status: response.data.status_code,
  //     result: response.data.result,
  //     message: response.data.message,
  //   };
  //   return datas;
  // },

  async paymentMethods(params) {
    const response = await Client.post('/payment/v1/payment_methods/', params);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async createInvoice(payload) {
    const response = await Client.post('/payment/v1/create_invoice/', payload);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async checkInvoice(payload) {
    const response = await Client.post('/payment/v1/check_invoice/', payload);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },
};

export default PaymentService;
