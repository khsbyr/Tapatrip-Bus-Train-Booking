import LoadingRing from '@components/common/loadingRing';
import { useTrainContext } from '@context/trainContext';
import {
  availableDatesFormat,
  startLocationFormat,
  endLocationFormat,
} from '@helpers/train-array-format';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import TrainService from '@services/train';
import { AutoComplete, DatePicker, message } from 'antd';
import locale from 'antd/lib/date-picker/locale/mn_MN';
import moment from 'moment';
import 'moment/locale/mn';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import style from './searchBus.module.scss';
import ContentWrapper from './style';

const dFormat = 'YYYY-MM-DD';

export default function SearchInput({ stationData, endStation }) {
  const { t } = useTranslation();
  const { Option } = AutoComplete;
  const { startStationID, setStartStationID } = useTrainContext();
  const { endStationID, setEndStationID } = useTrainContext();
  const { startStationName, setStartStationName } = useTrainContext();
  const { endStationName, setEndStationName } = useTrainContext();
  const { loading, setLoading } = useTrainContext();
  const [availableDates, setAvailableDates] = useState([]);
  const dateFormat = availableDatesFormat(availableDates);
  const date = dateFormat.map(z => z.date);
  const router = useRouter();
  const { startName, endName } = router.query;
  const [endStationData, setEndStationData] = useState(undefined);

  const currentDate = router.query.date
    ? router.query.date
    : moment().endOf('day').format(dFormat).toString();

  const [selectDate, setSelectDate] = useState(currentDate);

  useEffect(() => {
    async function getDates() {
      const token =
        AuthTokenStorageService.getAccessToken() &&
        AuthTokenStorageService.getAccessToken() != 'false'
          ? AuthTokenStorageService.getAccessToken()
          : AuthTokenStorageService.getGuestToken();
      if (token) {
        let params = {
          fromStation: startStationID,
          toStation: endStationID,
        };
        try {
          const res = await TrainService.getAvailableDates(params, token);
          if (res && res.status === 200) {
            setAvailableDates(res.result);
            if (!res.result[0]) {
              message.warning(t('notFoundTrain'));
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    if (startStationID && endStationID) {
      getDates();
    }
  }, [startStationID, endStationID]);

  const SelectStartStation = (value, options) => {
    async function getEndStations() {
      const token =
        AuthTokenStorageService.getAccessToken() &&
        AuthTokenStorageService.getAccessToken() != 'false'
          ? AuthTokenStorageService.getAccessToken()
          : AuthTokenStorageService.getGuestToken();
      if (token) {
        let params = `?from_station=${options.key}`;
        try {
          const res = await TrainService.getEndStations(params, token);
          if (res && res.status === 200) {
            setEndStationData(res.result);
            if (!res.result[0]) {
              message.warning(t('notFoundTrain'));
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    getEndStations();

    setStartStationName(value);
    setStartStationID(options.key);
  };

  const SelectEndStation = (value, options) => {
    setEndStationName(value);
    setEndStationID(options.key);
  };

  const SelectDate = (e, dateString) => {
    setSelectDate(dateString);
  };

  const disabledDate = current => {
    return (
      (current && current < moment().subtract(1, 'days')) ||
      !date?.find(date => date === moment(current).format('YYYY-MM-DD'))
    );
  };

  const searchTrain = async () => {
    if (startStationID && endStationID && selectDate) {
      setLoading(true);

      const paramSearch = {
        startStation: startStationID,
        endStation: endStationID,
        startName: startStationName,
        endName: endStationName,
        time: moment().format('YYYY-MM-DD hh:mm:ss').toString(),
      };

      const recent = [];

      recent.push(paramSearch);

      let prevSearch = JSON.parse(localStorage.getItem('lastSearchTrain'));

      if (prevSearch) {
        const index = prevSearch.findIndex(
          item =>
            item.startStation === startStationID &&
            item.endStation === endStationID
        );
        if (index > -1) {
          prevSearch.splice(index, 1);
          prevSearch.push(paramSearch);
          localStorage.setItem('lastSearchTrain', JSON.stringify(prevSearch));
        } else prevSearch.push(paramSearch);
        localStorage.setItem('lastSearchTrain', JSON.stringify(prevSearch));
      } else {
        localStorage.setItem('lastSearchTrain', JSON.stringify(recent));
      }

      const params = {
        startStation: startStationID,
        endStation: endStationID,
        date: selectDate,
        startName: startStationName,
        endName: endStationName,
      };

      router.push({
        pathname: '/train/orders',
        query: params,
      });
    } else {
      message.warning('Та явах чиглэл, өдөрөө сонгоно уу?');
    }
  };

  return (
    <ContentWrapper>
      <div className={style.container}>
        <div className={style.startLocation}>
          <AutoComplete
            allowClear
            notFoundContent={t('warningResult')}
            placeholder={t('startCity')}
            onSelect={SelectStartStation}
            filterOption={(input, option) =>
              option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            defaultValue={`${startName ? startName : ''}`}
          >
            {startLocationFormat(stationData)?.map(station => (
              <Option
                key={station.station_id}
                value={station.station_name}
                title={station.station_latinName}
              >
                <div className="flex items-center">
                  <img
                    className="w-7 h-7 text-direction pr-3"
                    src="../../assets/svgIcons/stopLocation.svg"
                  />
                  {station.station_name}
                </div>
              </Option>
            ))}
          </AutoComplete>
          <img
            className={style.currentIcon}
            src="../../assets/svgIcons/currentLocation.svg"
          />
        </div>

        <div className={style.startLocation}>
          <AutoComplete
            allowClear
            notFoundContent={t('warningResult')}
            placeholder={t('endCity')}
            onSelect={SelectEndStation}
            filterOption={(input, option) =>
              option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            defaultValue={`${endName ? endName : ''}`}
          >
            {endLocationFormat(endStation ? endStation : endStationData)?.map(
              station => (
                <Option
                  key={station.station_id}
                  value={station.station_name}
                  title={station.station_latinName}
                >
                  <div className="flex items-center">
                    <img
                      className="w-7 h-7 text-direction pr-3"
                      src="../../assets/svgIcons/stopLocation.svg"
                    />
                    {station.station_name}
                  </div>
                </Option>
              )
            )}
          </AutoComplete>
          <img
            className={style.currentIcon}
            src="../../assets/svgIcons/stopLocation.svg"
          />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
          <DatePicker
            placeholder={t('selectDate')}
            locale={locale}
            disabledDate={disabledDate}
            onChange={SelectDate}
            defaultValue={moment(selectDate, dFormat)}
          />
          <button className={style.searchButton} onClick={searchTrain}>
            {loading ? <LoadingRing /> : t('searchButton')}
          </button>
        </div>

        <button className={style.searchButtonHide} onClick={searchTrain}>
          {t('searchButton')}
        </button>
      </div>
    </ContentWrapper>
  );
}

export async function getStaticProps({ stationData }) {
  return {
    props: {
      stationData: stationData,
    },
  };
}
