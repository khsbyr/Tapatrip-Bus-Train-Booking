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
  const activePath = getRoute(router);

  function getRoute(router: any) {
    switch (router.route) {
      case '/train':
        return '5';
      case '/tour':
        return '3';
      case '/bus':
        return '4';
      case 'https://tapatrip.com/':
        return '1';
      case 'https://tapatrip.com/':
        return '2';
      default:
        return '4';
    }
  }

  const handleTabChange = key => {
    const route =
      key == 5
        ? '/train'
        : key == 4
        ? '/bus'
        : key == 1
        ? '/flight'
        : key == 2
        ? '/hotel'
        : key == 3;
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
              disabled={menu.id === 3 ? true : false}
              key={menu.id}
            />
          ))}
        </Tabs>
        {/* <SearchInput startLocations={startLocations} /> */}
      </div>
    </ContentWrapper>
  );
};

export default SearchPanel;
