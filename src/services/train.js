import Client from '@lib/apiClient';

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

  async getEndStations(params, token) {
    const response = await Client.get(`/train/stop_stations/${params}`, {
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

  async getAvailableDates(params, token) {
    const response = await Client.post(`/train/get_dates/`, params, {
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

  async getVoyageData(params, token) {
    const response = await Client.post(`/train/search_voyage/`, params, {
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

  async getWagonData(params, token) {
    const response = await Client.post(`/train/get_wagons/`, params, {
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

  async getMestData(params, token) {
    const response = await Client.post(`/train/get_mests/`, params, {
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

  async getVoyageStations(params, token) {
    const response = await Client.post(`/train/get_voyage_stations/`, params, {
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
    const response = await Client.get(`/train/get_ticket/${params}`);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async orderCheck(params, token) {
    const response = await Client.get(`/train/order_check/${params}`, {
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

  async getMyOrder(token) {
    const response = await Client.get('/train/train_history/', {
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
};

export default TrainService;
