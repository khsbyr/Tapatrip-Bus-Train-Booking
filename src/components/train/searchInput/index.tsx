import React, { useState } from 'react';
import { AutoComplete, DatePicker, message } from 'antd';
import { useApolloClient } from '@apollo/client';
import {
  BUS_LOCATION_ENDS_QUERY,
  BUS_ALL_LOCATION_STOPS_QUERY,
} from '@graphql/queries';
import { useGlobalStore } from '@context/globalStore';
import ContentWrapper from './style';
import style from './searchBus.module.scss';

import { useRouter } from 'next/router';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/mn_MN';
import 'moment/locale/mn';
import { useTranslation } from 'next-i18next';
const dateFormat = 'YYYY-MM-DD';

export default function SearchInput() {
  const { t } = useTranslation();
  const { Option } = AutoComplete;

  return (
    <ContentWrapper>
      <div className={style.container}>
        <div className={style.startLocation}>
          <AutoComplete
            allowClear
            notFoundContent={t('warningResult')}
            placeholder={t('startCity')}
          >
            <Option key={1} value={'location.name'}>
              <div className="flex items-center">
                <img
                  className="w-7 h-7 text-direction pr-3"
                  src="../../assets/svgIcons/stopLocation.svg"
                />
                {'location.name'}
              </div>
            </Option>
            <Option key={1} value={'location.name'}>
              <div className="flex items-center">
                <img
                  className="w-7 h-7 text-direction pr-3"
                  src="../../assets/svgIcons/stopLocation.svg"
                />
                {'location.name'}
              </div>
            </Option>
          </AutoComplete>
          <img
            className={style.currentIcon}
            src="../../assets/svgIcons/currentLocation.svg"
          />
        </div>

        <div className={style.startLocation}>
          <AutoComplete
            allowClear
            notFoundContent={t('warningResult')}
            placeholder={t('endCity')}
          >
            <Option key={1} value={'location.name'}>
              <div className="flex items-center">
                <img
                  className="w-7 h-7 text-direction pr-3"
                  src="../../assets/svgIcons/stopLocation.svg"
                />
                {'location.name'}
              </div>
            </Option>

            <Option key={1} value={'location.name'}>
              <div className="flex items-center">
                <img
                  className="w-7 h-7 text-direction pr-3"
                  src="../../assets/svgIcons/stopLocation.svg"
                />
                {'location.name'}
              </div>
            </Option>

            <Option key={1} value={'location.name'}>
              <div className="flex items-center">
                <img
                  className="w-7 h-7 text-direction pr-3"
                  src="../../assets/svgIcons/stopLocation.svg"
                />
                {'location.name'}
              </div>
            </Option>
          </AutoComplete>
          <img
            className={style.currentIcon}
            src="../../assets/svgIcons/stopLocation.svg"
          />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
          <DatePicker
            format={dateFormat}
            placeholder={t('selectDate')}
            locale={locale}
          />
          <button className={style.searchButton}>{t('searchButton')}</button>
        </div>
        <button className={style.searchButtonHide}>{t('searchButton')}</button>
      </div>
    </ContentWrapper>
  );
}
