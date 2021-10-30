import Autocomplete from '@components/ui/Autocomplete/Autocomplete';
import { DatePicker } from 'antd';
import React, { FC } from 'react';
import ContentWrapper from './style';
import { useRouter } from 'next/router';

interface Props {
  navbarData?: any;
}

const SearchBus: FC<Props> = ({ navbarData }) => {
  const { asPath, pathname } = useRouter();
  return (
    <ContentWrapper>
      <div className="px-2">
        <form
          className={`px-2 py-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4
          ${asPath === '/bus' ? 'md:px-12' : 'md:px-12'} 
          `}
        >
          <Autocomplete
            data={navbarData.generalList}
            placeholder="Хаанаас: хот байршил..."
          />

          <Autocomplete
            data={navbarData.generalList}
            placeholder="Хаашаа: хот байршил..."
          />

          <DatePicker placeholder="Он, сар, өдөр" />

          <button className="bg-button text-white font-bold py-2 px-4 rounded-2xl h-14 w-full">
            Хайх
          </button>
        </form>
      </div>
    </ContentWrapper>
  );
};

export default SearchBus;
