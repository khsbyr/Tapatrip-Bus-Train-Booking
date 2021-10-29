import { AutoComplete, DatePicker } from 'antd';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import React, { FC } from 'react';
import ContentWrapper from './style';
import style from './SearchBus.module.scss';
import graphqlArrayFormat from '@helpers/graphql-array-format';

interface Props {
  startLocations?: any;
}

const SearchBus: FC<Props> = ({ startLocations }) => {
  const { Option } = AutoComplete;
  const formatLocation = graphqlArrayFormat(startLocations);

  const handleSearch = (value: string) => {
    console.log(value);
  };

  const handleSelect = (value: string) => {
    console.log(value);
  };
  return (
    <ContentWrapper>
      <div className={style.container}>
        <AutoComplete
          onSearch={handleSearch}
          onSelect={handleSelect}
          placeholder="Хаанаас: хот байршил..."
        >
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
        <DatePicker placeholder="Он, сар, өдөр" />

        <button className="bg-button text-white font-bold rounded-2xl w-30">
          Хайх
        </button>
      </div>
    </ContentWrapper>
  );
};

export default SearchBus;
