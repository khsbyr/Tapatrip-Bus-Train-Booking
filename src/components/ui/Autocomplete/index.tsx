import React, { FC } from 'react';
import { Select } from 'antd';
import ContentWrapper from './style';
import { LocationMarkerIcon } from '@heroicons/react/solid';

interface Props {
  data: any;
  disabled?: boolean;
  defaultValue?: string;
  size?: any;
  placeholder?: string;
  onChange?: any;
}

const Autocomplete: FC<Props> = props => {
  const { data, disabled, defaultValue, size, placeholder, onChange } = props;
  const { Option } = Select;
  console.log('data : ', data);
  return (
    <ContentWrapper>
      <Select
        showSearch
        disabled={disabled}
        style={{ width: '100%' }}
        placeholder={placeholder}
        defaultValue={defaultValue}
        optionFilterProp="children"
        maxTagCount="responsive"
        size={size || 'small'}
        onChange={onChange}
      >
        {data &&
          data.map((data, value) => (
            <Option key={value} value={data.id}>
              <div className="flex items-center">
                <LocationMarkerIcon className="w-9 h-9 text-direction pr-3" />
                {data.name}
              </div>
            </Option>
          ))}
      </Select>
    </ContentWrapper>
  );
};

export default Autocomplete;
