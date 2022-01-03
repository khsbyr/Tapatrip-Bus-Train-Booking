import Client from '@lib/apiLocal';

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
};

export default TrainService;
