import React, { FC, useState } from 'react';
import { AutoComplete, DatePicker, message, Spin } from 'antd';
import { useLazyQuery } from '@apollo/client';
import {
  BUS_LOCATION_ENDS_QUERY,
  BUS_ALL_LOCATION_STOPS_QUERY,
} from '@graphql/queries';
import ContentWrapper from './style';
import style from './SearchBus.module.scss';
import {
  startLocationFormat,
  stopLocationFormat,
  endLocationFormat,
} from '@helpers/array-format';
import { useRouter } from 'next/router';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';

export default function SearchBus({ startLocations }) {
  const { Option } = AutoComplete;
  const router = useRouter();
  const { endLocation, date } = router.query;
  const currentDate = date
    ? date
    : moment().endOf('day').format(dateFormat).toString();
  const startFormatLocation = startLocationFormat(startLocations);
  const [isUlaanbaatar, setIsUlaanbaatar] = useState(true);
  const [selectStartLocation, setSelectStartLocation] = useState('');
  const [selectStopLocation, setSelectStopLocation] = useState('');
  const [selectEndLocation, setSelectEndLocation] = useState('');
  const [selectDate, setSelectDate] = useState(currentDate);

  const [getEndLocations, { loading, error, data: endData }] = useLazyQuery(
    BUS_LOCATION_ENDS_QUERY
  );
  const [
    getStopLocations,
    { data: stopData, loading: stopLoading, error: stopError },
  ] = useLazyQuery(BUS_ALL_LOCATION_STOPS_QUERY);

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;

  // if (stopLoading) return 'Loading...';
  // if (stopError) return `Error! ${stopError.message}`;

  const formatEndLocation = endData && endData.busAllLocationEnds.edges;
  const endFormatLocation = endLocationFormat(formatEndLocation);

  const formatStopLocation = stopData && stopData.busAllLocationStops.edges;
  const stopFormatLocation = stopLocationFormat(formatStopLocation);

  const handleStartSelect = (key: string, options) => {
    setSelectStartLocation(options.key);
    if (options.key != 'QnVzQWxsTG9jYXRpb246MQ==') {
      getStopLocations({
        variables: { location: options.key },
      });
      setIsUlaanbaatar(false);
    } else {
      setIsUlaanbaatar(true);
      getEndLocations({
        variables: { locationStopLocation: options.key, locationStop: '' },
      });
    }
  };

  const handleStopSelect = (key: string, options) => {
    setSelectStopLocation(options.key);
    getEndLocations({
      variables: {
        locationStopLocation: selectStartLocation,
        locationStop: options.key,
      },
    });
  };

  const handleEndSelect = (key: string, options) => {
    setSelectEndLocation(options.key);
  };

  function onChange(date, dateString) {
    setSelectDate(dateString);
  }

  const handleSearchBus = async () => {
    if (selectEndLocation != '') {
      router.push({
        pathname: '/bus/orders',
        query: {
          // startLocattion: selectStartLocation,
          // stopLocattion: selectStopLocation ? selectStopLocation : '',
          endLocation: selectEndLocation,
          date: selectDate,
        },
      });
    } else {
      message.warning('Та явах чиглэлээ сонгоно уу?');
    }
  };

  function disabledDate(current) {
    return current && current < moment().subtract(1, 'days');
  }

  return (
    <ContentWrapper>
      <div className={style.container}>
        <div className={style.startLocation}>
          <AutoComplete
            allowClear
            defaultActiveFirstOption
            notFoundContent="Хайлт илэрцгүй"
            filterOption={true}
            onSelect={handleStartSelect}
            placeholder="Хаанаас: хот байршил..."
          >
            {startFormatLocation &&
              startFormatLocation.map((location, value) => (
                <Option key={location.id} value={location.name}>
                  <div className="flex items-center">
                    <img
                      className="w-7 h-7 text-direction pr-3"
                      src="../../assets/svgIcons/stopLocation.svg"
                    />
                    {location.name}
                  </div>
                </Option>
              ))}
          </AutoComplete>
          <img
            className={style.currentIcon}
            src="../../assets/svgIcons/currentLocation.svg"
          />
        </div>
        <div className={style.stopLocation}>
          <AutoComplete
            allowClear
            onSelect={handleStopSelect}
            disabled={isUlaanbaatar}
            placeholder="Хаанаас: сум байршил..."
          >
            {stopFormatLocation &&
              stopFormatLocation.map((location, value) => (
                <Option key={location.id} value={location.name}>
                  <div className="flex items-center">
                    <img
                      className="w-7 h-7 text-direction pr-3"
                      src="../../assets/svgIcons/stopLocation.svg"
                    />
                    {location.name}
                  </div>
                </Option>
              ))}
          </AutoComplete>
          <img
            className={style.currentIcon}
            src="../../assets/svgIcons/currentLocation.svg"
          />
        </div>
        <div className={style.endLocation}>
          <AutoComplete
            allowClear
            filterOption={true}
            notFoundContent="Хайлт илэрцгүй"
            onSelect={handleEndSelect}
            placeholder="Хаашаа: хот байршил..."
          >
            {endFormatLocation &&
              endFormatLocation.map((location, value) => (
                <Option key={location.id} value={location.name}>
                  <div className="flex items-center">
                    <img
                      className="w-7 h-7 text-direction pr-3"
                      src="../../assets/svgIcons/stopLocation.svg"
                    />
                    {location.name}
                  </div>
                </Option>
              ))}
          </AutoComplete>
          <img
            className={style.currentIcon}
            src="../../assets/svgIcons/stopLocation.svg"
          />
        </div>
        <DatePicker
          defaultValue={moment(selectDate, dateFormat)}
          format={dateFormat}
          disabledDate={disabledDate}
          onChange={onChange}
          placeholder="Он, сар, өдөр"
        />
        <button className={style.searchButton} onClick={handleSearchBus}>
          Хайх
        </button>
      </div>
    </ContentWrapper>
  );
}
