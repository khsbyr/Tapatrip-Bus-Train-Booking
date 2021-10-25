import SearchBus from '@components/Search-Bus/SearchBus';
import React, { FC } from 'react';
import { Tabs } from 'antd';
import ContentWrapper from './style';
import Busss from '/assets/Bus.svg';
import Image from 'next/image';

const { TabPane } = Tabs;

interface Props {
  navbarData?: any;
}

const Search: FC<Props> = ({ navbarData }) => {
  return (
    <ContentWrapper>
      <div className="px-2">
        <div className="bg-white shadow-md max-w-7xl mx-auto rounded-lg h-auto relative">
          <div className="w-full max-w-7xl mx-auto px-2 py-4 sm:px-0">
            {/* <Tabs navbarData={navbarData} /> */}
            <Tabs defaultActiveKey="Автобус" centered tabBarGutter={160}>
              {navbarData.generalList.map(z => (
                <TabPane tab={<span>{z.text}</span>} key={z.text} />
              ))}
            </Tabs>
            <SearchBus navbarData={navbarData} />
            {/* <img src="/assets/Map mongolia.png" className="px-12" /> */}
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Search;
