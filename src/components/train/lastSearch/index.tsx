import moment from 'moment';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const LastSearch = () => {
  const [lastSearch, setLastSearch] = useState([]);
  const router = useRouter();
  const { t } = useTranslation(['train']);

  const lastElements = lastSearch?.slice(-4);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLastSearch(JSON.parse(localStorage.getItem('lastSearchTrain')));
    }
  }, []);

  const search = result => {
    const params = {
      startStation: result.startStation,
      endStation: result.endStation,
      date: moment().format('YYYY-MM-DD').toString(),
      startName: result.startName,
      endName: result.endName,
    };

    router.push({
      pathname: '/train/orders',
      query: params,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-2 mt-10 space-y-3">
      <div>
        <h1 className="text-lg text-trainTicket">{t('lastSearches')}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {[...lastElements]?.reverse().map(result => (
          <div
            className="bg-white h-auto rounded-lg px-4 py-2 shadow-md cursor-pointer"
            onClick={() => search(result)}
          >
            <div className="flex mt-2">
              <img src="/assets/svgIcons/timeline.svg" className="h-8" />
              <div className="space-y-2 -mt-1 ml-3">
                <h1 className="text-gray-500 text-xs">{result.startName}</h1>
                <h1 className="text-gray-700 text-xs">{result.endName}</h1>
              </div>
            </div>
            <div className="bg-gray-300 h-px my-2" />
            <div>
              <h1 className=" text-gray-400 text-xs ml-4">{result.time}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastSearch;
