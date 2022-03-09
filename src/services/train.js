import Client from '@lib/apiClient';
import Train from '@lib/apiTrain';

const TrainService = {
  async getTrainStations(token) {
    const response = await Client.get('/train/stations/', {
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
    const response = await Client.post(`/train/get_dates/`, params);
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

  async getTicketInfo(params) {
    const response = await Train.get(`/train/get_ticket/${params}`);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async orderCheck(params) {
    const response = await Client.get(`/train/order_check/${params}`);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },
};

export default TrainService;
