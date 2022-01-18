import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ContentWrapper from './style';

const dateFormat = 'YYYY-MM-DD';

const LastSearch = () => {
  const [lastSearch, setLastSearch] = useState([]);
  const router = useRouter();
  const currentDate = moment().endOf('day').format(dateFormat).toString();

  const lastElements = lastSearch?.slice(-4);

  const endDate = moment(currentDate)
    .add(7, 'days')
    .format(dateFormat)
    .toString();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLastSearch(JSON.parse(localStorage.getItem('lastSearch')));
    }
  }, []);

  const search = result => {
    const params = {
      endLocation: result.endLocation,
      date: currentDate,
      endDate: endDate,
      startLocationName: result.startLocationName,
      endLocationName: result.endLocationName,
      stopLocationName: result.stopLocationName,
    };
    const ubParams = {
      startLocation: result.startLocation,
      stopLocation: result.endLocation,
      date: currentDate,
      endDate: endDate,
      startLocationName: result.startLocationName,
      endLocationName: result.endLocationName,
      stopLocationName: result.stopLocationName,
    };

    router.push({
      pathname: '/bus/orders',
      query: result.isUlaanbaatar ? ubParams : params,
    });
  };

  return (
    <ContentWrapper>
      <div className="max-w-7xl mx-auto px-2 mt-10 space-y-3">
        <div>
          <h1 className="text-lg text-trainTicket">Таны сүүлийн хайлтууд</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[...lastElements]?.reverse().map(result => (
            <div
              className="bg-white h-auto rounded-lg p-4 shadow-md cursor-pointer"
              onClick={() => search(result)}
            >
              <div className="flex">
                <img src="/assets/svgIcons/timeline.svg" className="h-8" />
                <div className="space-y-2 -mt-1 ml-3">
                  <h1 className="font-semibold text-gray-500 text-xs">
                    {result.startLocationName}{' '}
                    {result.stopLocationName
                      ? `/${result.stopLocationName}/`
                      : ''}
                  </h1>
                  <h1 className="font-semibold text-gray-700 text-xs">
                    {result.endLocationName}
                  </h1>
                </div>
              </div>
              <div className="bg-gray-300 h-px my-2" />
              <div>
                <h1 className="font-semibold text-gray-400 text-xs ml-4">
                  {result.time}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContentWrapper>
  );
};

export default LastSearch;
