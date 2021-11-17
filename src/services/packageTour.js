import Client from '@lib/apiClient';

const PackageTourService = {
  async checkInvoice(payload) {
    const data = {
      payment_type: 'Package tour',
      ref_number: payload.refNumber,
    };

    const response = await Client.post('/payment/v1/check_invoice/', data);
    return response;
  },
};

export default PackageTourService;
