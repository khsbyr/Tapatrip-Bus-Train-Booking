import React, { FC } from 'react';
import { Tabs } from 'antd';
import ContentWrapper from './style';
import style from './search.module.scss';
import SearchBus from '@components/bus/SearchInput';
import { useRouter } from 'next/router';
import Link from 'next/link';

const { TabPane } = Tabs;

interface Props {
  navbarData?: any;
  startLocations?: any;
}

const Search: FC<Props> = ({ navbarData, startLocations }) => {
  const router = useRouter();

  const handleTabChange = key => {
    const route = key === 4 ? 'bus' : 'travel';
    router.push(`/${route}`);
  };
  return (
    <ContentWrapper>
      <div className={style.searchBody}>
        <Tabs
          defaultActiveKey="4"
          centered
          tabBarGutter={160}
          onChange={handleTabChange}
          className="hidden lg:block"
        >
          {navbarData.generalList.map(menu => (
            <TabPane
              tabKey={menu.id}
              tab={
                <div key={menu.id} className="tab-title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 55 40"
                  >
                    <g>
                      {menu.path.map(value => (
                        <path key={value} d={value} />
                      ))}
                    </g>
                  </svg>
                  <span className="text">{menu.text}</span>
                </div>
              }
              disabled={menu.id !== 4 && menu.id !== 3 ? true : false}
              key={menu.id}
            />
          ))}
        </Tabs>
        <SearchBus startLocations={startLocations} />
      </div>
    </ContentWrapper>
  );
};

export default Search;
