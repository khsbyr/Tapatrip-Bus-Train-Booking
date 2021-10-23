import SearchBus from '@components/Search-Bus/SearchBus';
import React, { FC } from 'react';
import Tabs from '../ui/Tabs/Tabs';

interface Props {
  navbarData?: any;
}

const Search: FC<Props> = ({ navbarData }) => {
  return (
    <div className="px-2">
      <div className="bg-white shadow-md max-w-7xl mx-auto rounded-lg h-auto relative">
        <div className="w-full max-w-7xl mx-auto px-2 py-4 sm:px-0">
          <Tabs navbarData={navbarData} />
          <SearchBus navbarData={navbarData} />
          {/* <img src="/assets/Map mongolia.png" className="px-12" /> */}
        </div>
      </div>
    </div>
  );
};

export default Search;
