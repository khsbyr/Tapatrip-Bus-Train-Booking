import React, { FC, useState } from 'react';
import { AutoComplete, DatePicker } from 'antd';
import { useLazyQuery } from '@apollo/client';
import {
  BUS_LOCATION_ENDS_QUERY,
  BUS_ALL_LOCATION_STOPS_QUERY,
} from '@graphql/queries';
import ContentWrapper from './style';
import style from './SearchBus.module.scss';
import arrayFilter from '@helpers/array-filter';
import {
  startLocationFormat,
  stopLocationFormat,
  endLocationFormat,
} from '@helpers/array-format';
import { useRouter } from 'next/router';

interface Props {
  startLocations?: any;
}

const SearchBus: FC<Props> = ({ startLocations }) => {
  const { Option } = AutoComplete;
  const router = useRouter();
  const formatLocation = startLocationFormat(startLocations);
  const [startLocation, setStartLocation] = useState(formatLocation);
  const [isUlaanbaatar, setIsUlaanbaatar] = useState(true);
  const [getEndLocations, { loading, error, data: endData }] = useLazyQuery(
    BUS_LOCATION_ENDS_QUERY
  );
  const [getStopLocations, { data: stopData }] = useLazyQuery(
    BUS_ALL_LOCATION_STOPS_QUERY
  );

  console.log(stopData);
  // const [endLocation, setEndLocation] = useState(getEndLocations);
  const endLocation = endData && endData.busAllLocationEnds.edges;
  const stopLocation = stopData && stopData.busAllLocationStops.edges;
  const endFormatLocation = endLocationFormat(endLocation);

  console.log(endFormatLocation);
  // console.log(graphqlArrayEndFormat(endFormatLocation));

  const handleSearchStartLocation = (value: string) => {
    let result = arrayFilter(formatLocation, value);
    setStartLocation(result);
  };

  const handleSelect = (key: string, options) => {
    if (options.key != 'QnVzQWxsTG9jYXRpb246MQ==') {
      getStopLocations({
        variables: { location: options.key },
      });
      setIsUlaanbaatar(false);
    } else {
      setIsUlaanbaatar(true);
      getEndLocations({
        variables: { locationStopLocation: options.key },
      });
    }
  };

  const handleSearchBus = async () => {
    router.push('/bus/orders');
    //busLocation({ variables: { locationStopLocation: selectStartLocation } });
  };

  return (
    <ContentWrapper>
      <div className={style.container}>
        <div className={style.startLocation}>
          <AutoComplete
            showSearch
            onSearch={handleSearchStartLocation}
            onSelect={handleSelect}
            defaultValue="Улаанбаатар"
            placeholder="Хаанаас: хот байршил..."
          >
            {startLocation.map((location, value) => (
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
            disabled={isUlaanbaatar}
            onSearch={handleSearchStartLocation}
            onSelect={handleSelect}
            placeholder="Хаанаас: сум байршил..."
          >
            {endFormatLocation &&
              endFormatLocation.map((location, value) => (
                <Option key={value} value={location.name}>
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
          <AutoComplete placeholder="Хаашаа: хот байршил...">
            {endFormatLocation &&
              endFormatLocation.map((location, value) => (
                <Option key={value} value={location.name}>
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
        <DatePicker placeholder="Он, сар, өдөр" />
        <button className={style.searchButton} onClick={handleSearchBus}>
          Хайх
        </button>
      </div>
    </ContentWrapper>
  );
};

export default SearchBus;
