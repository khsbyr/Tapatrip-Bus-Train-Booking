import SearchBus from '@components/bus/SearchBus';
import React, { FC } from 'react';
import { Tabs } from 'antd';
import ContentWrapper from './style';
import style from './search.module.scss';
import path from 'path/posix';

const { TabPane } = Tabs;

interface Props {
  navbarData?: any;
}

const Search: FC<Props> = ({ navbarData }) => {
  return (
    <ContentWrapper>
      <div className={style.searchBody}>
        <Tabs defaultActiveKey="4" centered tabBarGutter={160}>
          {navbarData.generalList.map(menu => (
            <TabPane
              tab={
                <div className="tab-title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 55 40"
                  >
                    <g>
                      <path d={menu.path} />
                    </g>
                  </svg>
                  <span className="text">{menu.text}</span>
                </div>
              }
              key={menu.id}
            />
          ))}
        </Tabs>
        <SearchBus navbarData={navbarData} />
      </div>
    </ContentWrapper>
  );
};

export default Search;
