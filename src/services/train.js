import Client from '@lib/apiClientTrain';

const TrainService = {
  async getTrainStations() {
    const response = await Client.get('/train/stations/');
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async getEndStations(params) {
    const response = await Client.get(`/train/stop_stations/${params}`);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async getAvailableDates(params) {
    const response = await Client.get(`/train/available_dates/${params}`);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async getVoyageData(params) {
    const response = await Client.post(`/train/search_voyage/`, params);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async getWagonData(params) {
    const response = await Client.post(`/train/get_wagons/`, params);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async getMestData(params) {
    const response = await Client.post(`/train/get_mests/`, params);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async getVoyageStations(params) {
    const response = await Client.post(`/train/get_voyage_stations/`, params);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async setMestState(params) {
    const response = await Client.post(`/train/set_mest_state/`, params);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
      order_id: response.data.result.order_id,
    };
    return datas;
  },

  async createBooking(params, token) {
    const response = await Client.post(`/train/create_booking/`, params, {
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

  async paymentMethods() {
    const response = await Client.post(`/payment/v1/payment_methods/`);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async createInvoice(params) {
    const response = await Client.post(`/payment/v1/create_invoice/`, params);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async checkInvoice(params) {
    const response = await Client.post(`/payment/v1/check_invoice/`, params);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },
};

export default TrainService;
