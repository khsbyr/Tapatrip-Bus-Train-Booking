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

  return (
    <ContentWrapper>
      <Select
        showSearch
        disabled={disabled}
        style={{ width: '100%' }}
        // placeholder={
        //   <React.Fragment>
        //     <div className="flex items-center">
        //       <LocationMarkerIcon
        //         width={30}
        //         height={30}
        //         className="mr-4"
        //         style={{
        //           color: '#8AB1D5',
        //         }}
        //       />
        //       Хаанаас: хот байршил...
        //     </div>
        //   </React.Fragment>
        // }
        placeholder={placeholder}
        defaultValue={defaultValue}
        optionFilterProp="children"
        maxTagCount="responsive"
        size={size || 'small'}
        onChange={onChange}
      >
        {data &&
          data.map((z, index) => (
            <Option key={index} value={z.id}>
              <div className="flex items-center">
                <LocationMarkerIcon className="w-9 h-9 text-direction pr-3" />
                {z.text}
              </div>
            </Option>
          ))}
      </Select>
    </ContentWrapper>
  );
};

export default Autocomplete;
