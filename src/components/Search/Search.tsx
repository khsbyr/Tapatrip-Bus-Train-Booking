import SearchBus from '@components/Search-Bus/SearchBus';
import React, { FC } from 'react';
import { Tabs } from 'antd';
import ContentWrapper from './style';
import style from './Search.module.scss';
import SearchTravel from '@components/Search-Travel/SearchTravel';
const { TabPane } = Tabs;

interface Props {
  navbarData?: any;
}

const Search: FC<Props> = ({ navbarData, type }) => {
  return (
    <ContentWrapper>
      <div className={style.searchBody}>
        <Tabs defaultActiveKey="Аялал" centered tabBarGutter={160}>
          {navbarData.generalList.map(z => (
            <TabPane
              tab={
                <span>
                  <img className="w-8 h-8" src={z.icon} />
                  {z.text}
                </span>
              }
              key={z.text}
            />
          ))}
        </Tabs>
        {type === 'TRAVEL' ? (
          <>
            <SearchTravel navbarData={navbarData} />
          </>
        ) : (
          <SearchBus navbarData={navbarData} />
        )}
      </div>
    </ContentWrapper>
  );
};

export default Search;
