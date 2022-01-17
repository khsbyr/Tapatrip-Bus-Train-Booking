import React, { useState, useEffect } from 'react';
import { ArrowRightIcon } from '@heroicons/react/solid';
import ContentWrapper from './style';
import { useRouter } from 'next/router';
import { result } from 'lodash';

const LastSearch = () => {
  const [lastSearch, setLastSearch] = useState([]);
  const router = useRouter();
  const current = new Date();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLastSearch(JSON.parse(localStorage.getItem('lastSearch')));
    }
  }, []);

  const search = result => {
    const params = {
      startStation: result.startStation,
      endStation: result.endStation,
      date: `${current.getFullYear()}-${
        current.getMonth() + 1
      }-${current.getDate()}`,
      startName: result.startStationName,
      endName: result.endStationName,
    };

    router.push({
      pathname: '/train/orders',
      query: params,
    });
  };

  return (
    <ContentWrapper>
      <div className="max-w-7xl mx-auto px-2 mt-10 space-y-3">
        <div>
          <h1 className="text-lg text-trainTicket">Сүүлчийн хайлтууд</h1>
        </div>
        <div className="overflow-x-auto flex gap-4" id="style-1">
          {[...lastSearch]?.reverse().map(result => (
            <div
              className="w-auto h-16 bg-white flex-shrink-0 rounded-lg flex items-center px-4 cursor-pointer border"
              onClick={() => search(result)}
            >
              <div>
                <img
                  src="/assets/trainImages/wagon.svg"
                  className="flex-shrink-0 w-12 h-12 mr-4"
                />
              </div>

              <div className="flex gap-2">
                <p className="text-sm text-trainTicket">
                  {result.startStationName}
                </p>
                <ArrowRightIcon className="w-5 h-5 text-trainTicket" />
                <p className="text-sm text-trainTicket">
                  {result.endStationName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContentWrapper>
  );
};

export default LastSearch;
