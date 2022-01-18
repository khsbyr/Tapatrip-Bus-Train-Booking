import React, { useState } from 'react';
import { AutoComplete, DatePicker, message } from 'antd';
import { useApolloClient } from '@apollo/client';
import {
  BUS_LOCATION_ENDS_QUERY,
  BUS_ALL_LOCATION_STOPS_QUERY,
} from '@graphql/queries';
import { useGlobalStore } from '@context/globalStore';
import ContentWrapper from './style';
import style from './searchBus.module.scss';
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
import { useTranslation } from 'next-i18next';
import { useUI } from '@context/uiContext';
const dateFormat = 'YYYY-MM-DD';

export default function SearchInput({ startLocations }) {
  const { openLoadingSearch, displayLoadingSearch, closeLoadingSearch } =
    useUI();
  const { t } = useTranslation();
  const client = useApolloClient();
  const { Option } = AutoComplete;
  const router = useRouter();
  const {
    startLocation,
    stopLocation,
    endLocation,
    date,
    endDate,
    startLocationName,
    endLocationName,
    stopLocationName,
  } = router.query;
  const currentDate = date
    ? date
    : moment().endOf('day').format(dateFormat).toString();

  const { selectStartLocation, setSelectStartLocation } = useGlobalStore();
  const { selectStopLocation, setSelectStopLocation } = useGlobalStore();
  const { selectEndLocation, setSelectEndLocation } = useGlobalStore();

  const { startLocationList, setStartLocationList } = useGlobalStore();
  const { endLocationList, setEndLocationList } = useGlobalStore();
  const { stopLocationList, setStopLocationList } = useGlobalStore();

  const [stopSearchLocationList, setStopSearchLocationList] = useState([]);

  const { isUlaanbaatar, setIsUlaanbaatar } = useGlobalStore();
  const [selectDate, setSelectDate] = useState(currentDate);

  const startFormatLocation = startLocationFormat(startLocations);

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
    setStopSearchLocationList([]);
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
      message.warning(t('warningDirectionSelect'));
    } else {
      const endScheduleDate = moment(selectDate)
        .add(7, 'days')
        .format(dateFormat)
        .toString();

      if (isUlaanbaatar) {
        if (
          startLocation != selectStartLocation.key ||
          stopLocation != selectEndLocation.key ||
          date != selectDate ||
          endDate != endScheduleDate
        ) {
          openLoadingSearch();
        }
      } else {
        if (
          endLocation != selectEndLocation.key ||
          date != selectDate ||
          endDate != endScheduleDate
        ) {
          openLoadingSearch();
        }
      }

      const params = {
        endLocation: selectEndLocation.key,
        date: selectDate,
        endDate: endScheduleDate,
        startLocationName: selectStartLocation.value,
        endLocationName: selectEndLocation.value,
        stopLocationName: selectStopLocation.value,
      };
      const ubParams = {
        startLocation: selectStartLocation.key,
        stopLocation: selectEndLocation.key,
        date: selectDate,
        endDate: endScheduleDate,
        startLocationName: selectStartLocation.value,
        endLocationName: selectEndLocation.value,
        stopLocationName: selectStopLocation.value,
      };

      const paramSearch = {
        startLocation: selectStartLocation.key,
        startLocationName: selectStartLocation.value,
        endLocation: selectEndLocation.key,
        endLocationName: selectEndLocation.value,
        stopLocationName: selectStopLocation.value,
        isUlaanbaatar: isUlaanbaatar,
        time: moment().format('YYYY-MM-DD hh:mm:ss').toString(),
      };

      const recent = [];

      recent.push(paramSearch);

      let prevSearch = JSON.parse(localStorage.getItem('lastSearch'));

      if (prevSearch) {
        const index = prevSearch.findIndex(
          item =>
            item.startLocation === selectStartLocation.key &&
            item.endLocation === selectEndLocation.key
        );
        if (index > -1) {
          prevSearch.splice(index, 1);
          prevSearch.push(paramSearch);
          localStorage.setItem('lastSearch', JSON.stringify(prevSearch));
        } else prevSearch.push(paramSearch);
        localStorage.setItem('lastSearch', JSON.stringify(prevSearch));
      } else {
        localStorage.setItem('lastSearch', JSON.stringify(recent));
      }

      global.analytics.track('Bus/Home/Search', {
        query: isUlaanbaatar ? ubParams : params,
        time: Date.now(),
      });
      router.push({
        pathname: '/bus/orders',
        query: isUlaanbaatar ? ubParams : params,
      });
    }
  };

  const handleStartSearch = (value: string) => {
    let result = startFormatLocation.filter(function (currentElement) {
      return (
        currentElement.name
          .toString()
          .toLowerCase()
          .indexOf(value.toLowerCase()) > -1 ||
        currentElement.latinName
          .toString()
          .toLowerCase()
          .indexOf(value.toLowerCase()) > -1
      );
    });
    setStartLocationList(result);
  };

  const handleStopSearch = (value: string) => {
    let result = stopFormatLocation.filter(function (currentElement) {
      return (
        currentElement.name
          .toString()
          .toLowerCase()
          .indexOf(value.toLowerCase()) > -1 ||
        currentElement.latinName
          .toString()
          .toLowerCase()
          .indexOf(value.toLowerCase()) > -1
      );
    });
    setStopSearchLocationList(result);
  };

  const handleEndSearch = (value: string) => {
    if (isUlaanbaatar) {
      let result = stopFormatLocation.filter(function (currentElement) {
        return (
          currentElement.name
            .toString()
            .toLowerCase()
            .indexOf(value.toLowerCase()) > -1 ||
          currentElement.latinName
            .toString()
            .toLowerCase()
            .indexOf(value.toLowerCase()) > -1
        );
      });
      setStopSearchLocationList(result);
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
            defaultValue={
              startLocationName ? startLocationName : selectStartLocation.value
            }
            notFoundContent={t('warningResult')}
            onSearch={handleStartSearch}
            onSelect={handleStartSelect}
            placeholder={t('startCity')}
          >
            {startLocationList
              ? startLocationList &&
                startLocationList.map((location, value) => (
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
              : startFormatLocation &&
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
            onSearch={handleStopSearch}
            defaultValue={
              stopLocationName ? stopLocationName : selectStopLocation.value
            }
            disabled={
              startLocationName
                ? startLocationName === 'Улаанбаатар'
                : isUlaanbaatar
                ? true
                : false
            }
            placeholder={t('startSoum')}
          >
            {stopSearchLocationList.length > 0
              ? stopSearchLocationList &&
                stopSearchLocationList.map((location, value) => (
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
            src="../../assets/svgIcons/currentLocation.svg"
          />
        </div>
        <div className={style.startLocation}>
          <AutoComplete
            allowClear
            defaultValue={
              endLocationName ? endLocationName : selectEndLocation.value
            }
            notFoundContent={t('warningResult')}
            onSelect={handleEndSelect}
            onSearch={handleEndSearch}
            placeholder={t('endCity')}
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
              : stopSearchLocationList.length > 0
              ? stopSearchLocationList &&
                stopSearchLocationList.map((location, value) => (
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
          placeholder={t('selectDate')}
          locale={locale}
        />
        <button className={style.searchButton} onClick={handleSearchBus}>
          {displayLoadingSearch === true ? (
            <div className={style.ldsDualRing}></div>
          ) : (
            t('searchButton')
          )}
        </button>
      </div>
    </ContentWrapper>
  );
}
