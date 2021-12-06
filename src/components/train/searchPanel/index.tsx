import React, { FC } from 'react';
import { Tabs } from 'antd';
import ContentWrapper from './style';
import style from './searchPanel.module.scss';
import SearchInput from '@components/train/searchInput';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const { TabPane } = Tabs;

interface Props {
  navbarData?: any;
  startLocations?: any;
}

const SearchPanel: FC<Props> = ({ navbarData, startLocations = '' }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const activePath =
    router.route == '/travel' ? '3' : router.route == '/train' ? '5' : '4';

  const handleTabChange = key => {
    const route = key == 4 ? 'bus' : key == 3 ? '/travel' : '/train';
    router.push(`/${route}`);
  };

  return (
    <ContentWrapper>
      <div className={style.searchBody}>
        <Tabs
          activeKey={activePath}
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
                  <span className="text">{t(`${menu.text}`)}</span>
                </div>
              }
              disabled={
                menu.id !== 4 && menu.id !== 3 && menu.id !== 5 ? true : false
              }
              key={menu.id}
            />
          ))}
        </Tabs>
        <SearchInput startLocations={startLocations} />
      </div>
    </ContentWrapper>
  );
};

export default SearchPanel;
