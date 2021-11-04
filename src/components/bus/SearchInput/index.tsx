import React, { FC, useState } from 'react';
import { AutoComplete, DatePicker } from 'antd';
import { useLazyQuery } from '@apollo/client';
import { BUS_LOCATION_ENDS_QUERY } from '@graphql/queries';
import ContentWrapper from './style';
import style from './SearchBus.module.scss';
import graphqlArrayFormat from '@helpers/graphql-array-format';
import arrayFilter from '@helpers/array-filter';

interface Props {
  startLocations?: any;
}

const SearchBus: FC<Props> = ({ startLocations }) => {
  const { Option } = AutoComplete;
  const formatLocation = graphqlArrayFormat(startLocations);
  const [startLocation, setStartLocation] = useState(formatLocation);
  const [selectStartLocation, setSelectStartLocation] = useState();
  const [getEndLocations, { loading, error, data }] = useLazyQuery(
    BUS_LOCATION_ENDS_QUERY
  );

  const handleSearchStartLocation = (value: string) => {
    let result = arrayFilter(formatLocation, value);
    setStartLocation(result);
  };

  const handleSelect = (key: string, options) => {
    getEndLocations({
      variables: { locationStopLocation: options.key },
    });
  };

  const handleSearchBus = async () => {
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
            placeholder="Хаанаас: хот байршил..."
          >
            {startLocation.map((location, value) => (
              <Option key={location.id} value={location.name}>
                <div className="flex items-center">
                  <img
                    className="w-7 h-7 text-direction pr-3"
                    src="assets/svgIcons/stopLocation.svg"
                  />
                  {location.name}
                </div>
              </Option>
            ))}
          </AutoComplete>
          <img
            className={style.currentIcon}
            src="assets/svgIcons/currentLocation.svg"
          />
        </div>
        <div className={style.endLocation}>
          <AutoComplete placeholder="Хаашаа: хот байршил...">
            {formatLocation.map((location, value) => (
              <Option key={value} value={location.name}>
                <div className="flex items-center">
                  <img
                    className="w-7 h-7 text-direction pr-3"
                    src="assets/svgIcons/stopLocation.svg"
                  />
                  {location.name}
                </div>
              </Option>
            ))}
          </AutoComplete>
          <img
            className={style.currentIcon}
            src="assets/svgIcons/stopLocation.svg"
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
