import Client from '@lib/apiClient';

const PaymentService = {
  async checkTicket(params) {
    const response = await Client.post('/bus/booking_ticket/', params);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async paymentMethods(params, token) {
    const response = await Client.post('/payment/v1/payment_methods/', params, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async createInvoice(payload, token) {
    const response = await Client.post('/payment/v1/create_invoice/', payload, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async checkInvoice(payload, token) {
    const response = await Client.post('/payment/v1/check_invoice/', payload, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async getCompanyRegister(register = '') {
    const response = await Client.get(
      `http://info.ebarimt.mn/rest/merchant/info?regno=${register}`
    );
    return response;
  },
};

export default PaymentService;
