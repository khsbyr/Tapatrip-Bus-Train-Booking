import React, { useState, useContext } from 'react';
import { AutoComplete, DatePicker, message, Spin } from 'antd';
import { useApolloClient } from '@apollo/client';
import {
  BUS_LOCATION_ENDS_QUERY,
  BUS_ALL_LOCATION_STOPS_QUERY,
} from '@graphql/queries';
import { useGlobalStore } from '@context/globalStore';
import ContentWrapper from './style';
import style from './SearchBus.module.scss';
import {
  startLocationFormat,
  stopLocationFormat,
  endLocationFormat,
  stopLocationUBFormat,
} from '@helpers/array-format';
import { useRouter } from 'next/router';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/mn_MN';
import 'moment/locale/mn';

const dateFormat = 'YYYY-MM-DD';

export default function SearchBus({ startLocations }) {
  const client = useApolloClient();
  const { Option } = AutoComplete;
  const router = useRouter();
  const { date } = router.query;
  const currentDate = date
    ? date
    : moment().endOf('day').format(dateFormat).toString();
  const startFormatLocation = startLocationFormat(startLocations);

  const { selectStartLocation, setSelectStartLocation } = useGlobalStore();
  const { selectStopLocation, setSelectStopLocation } = useGlobalStore();
  const { selectEndLocation, setSelectEndLocation } = useGlobalStore();

  const { endLocationList, setEndLocationList } = useGlobalStore();
  const { stopLocationList, setStopLocationList } = useGlobalStore();

  const { isUlaanbaatar, setIsUlaanbaatar } = useGlobalStore();
  const [selectDate, setSelectDate] = useState(currentDate);

  const formatEndLocation =
    endLocationList && endLocationList.busAllLocationEnds.edges;
  const endFormatLocation = endLocationFormat(formatEndLocation);

  const formatStopLocation =
    stopLocationList && stopLocationList.busAllLocationStops.edges;
  const stopFormatLocation = isUlaanbaatar
    ? stopLocationUBFormat(formatStopLocation)
    : stopLocationFormat(formatStopLocation);

  const handleStartSelect = async (key: string, options) => {
    setSelectStartLocation(options);
    if (options.key != 'QnVzQWxsTG9jYXRpb246MQ==') {
      const { data: stopData } = await client.query({
        query: BUS_ALL_LOCATION_STOPS_QUERY,
        variables: { location: options.key },
      });
      setIsUlaanbaatar(false);
      setStopLocationList(stopData);
    } else {
      const { data: endUBData } = await client.query({
        query: BUS_ALL_LOCATION_STOPS_QUERY,
      });
      setIsUlaanbaatar(true);
      setStopLocationList(endUBData);
    }
  };

  const handleStopSelect = async (key: string, options) => {
    setSelectStopLocation(options);
    const { data: endData } = await client.query({
      query: BUS_LOCATION_ENDS_QUERY,
      variables: {
        locationStopLocation: selectStartLocation.key,
        locationStop: options.key,
      },
    });
    setEndLocationList(endData);
  };

  const handleEndSelect = (key: string, options) => {
    setSelectEndLocation(options);
  };

  function onChange(date, dateString) {
    setSelectDate(dateString);
  }

  const handleSearchBus = async () => {
    if (selectEndLocation.key === undefined || selectEndLocation.key == '') {
      message.warning('Та явах чиглэлээ сонгоно уу?');
    } else {
      const params = {
        endLocation: selectEndLocation.key,
        date: selectDate,
      };
      const ubParams = {
        startLocation: selectStartLocation.key,
        stopLocation: selectEndLocation.key,
        date: selectDate,
      };
      router.push({
        pathname: '/bus/orders',
        query: isUlaanbaatar ? ubParams : params,
      });
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
            defaultValue={selectStartLocation.value}
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
        <div className={style.startLocation}>
          <AutoComplete
            allowClear
            onSelect={handleStopSelect}
            defaultValue={selectStopLocation.value}
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
        <div className={style.startLocation}>
          <AutoComplete
            allowClear
            filterOption={true}
            defaultValue={selectEndLocation.value}
            notFoundContent="Хайлт илэрцгүй"
            onSelect={handleEndSelect}
            placeholder="Хаашаа: хот байршил..."
          >
            {!isUlaanbaatar
              ? endFormatLocation &&
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
                ))
              : stopFormatLocation &&
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
            src="../../assets/svgIcons/stopLocation.svg"
          />
        </div>
        <DatePicker
          defaultValue={moment(selectDate, dateFormat)}
          format={dateFormat}
          disabledDate={disabledDate}
          onChange={onChange}
          placeholder="Он, сар, өдөр"
          locale={locale}
        />
        <button className={style.searchButton} onClick={handleSearchBus}>
          Хайх
        </button>
      </div>
    </ContentWrapper>
  );
}
