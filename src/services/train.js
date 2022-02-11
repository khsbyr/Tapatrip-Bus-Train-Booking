import Client from '@lib/apiClient';

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
};

export default TrainService;
