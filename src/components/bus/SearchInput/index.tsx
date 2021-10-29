import React, { FC, useState } from 'react';
import { AutoComplete, DatePicker } from 'antd';
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

  const handleSearch = (value: string) => {
    let result = arrayFilter(formatLocation, value);
    setStartLocation(result);
  };

  const handleSelect = (value: string) => {
    let selectResult = arrayFilter(formatLocation, value);
    setSelectStartLocation(selectResult);
  };
  return (
    <ContentWrapper>
      <div className={style.container}>
        <div className={style.startLocation}>
          <AutoComplete
            showSearch
            onSearch={handleSearch}
            onSelect={handleSelect}
            placeholder="Хаанаас: хот байршил..."
          >
            {startLocation.map((location, value) => (
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
        <button className={style.searchButton}>Хайх</button>
      </div>
    </ContentWrapper>
  );
};

export default SearchBus;
