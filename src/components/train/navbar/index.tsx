import OrderCheck from '@components/bus/orderCheck';
import SelectLanguage from '@components/common/language';
import SearchInput from '@components/train/searchInput';
import { Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import TrainService from '@services/train';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useGlobalStore } from '@context/globalStore';
import Profile from '@components/common/navbar/profile';
import { useUI } from '@context/uiContext';
import { useRouter } from 'next/router';
import LoadingRing from '@components/common/loadingRing';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import AuthService from '@services/auth';
import isEmpty from '@utils/isEmpty';
import { message } from 'antd';

export default function TrainNavbar({ navbarData }) {
  const { t } = useTranslation(['common']);
  const [isOpen, setIsOpen] = useState(false);
  const [stationData, setStationData] = useState([]);
  const [endStationData, setEndStationData] = useState([]);
  const { user, setUser } = useGlobalStore();
  const isAuth = AuthTokenStorageService.getAccessToken() ? true : false;
  const { displayLoadingLogin } = useUI();
  const router = useRouter();
  const { startStation } = router.query;

  useEffect(() => {
    async function getTrainStations() {
      try {
        const res = await TrainService.getTrainStations();
        if (res && res.status === 200) {
          setStationData(res.result);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getTrainStations();

    async function getEndStations() {
      let params = `?from_station=${startStation}`;
      try {
        const res = await TrainService.getEndStations(params);
        if (res && res.status === 200) {
          setEndStationData(res.result);
          if (!res.result[0]) {
            message.warning(t('notFoundTrain'));
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    getEndStations();

    async function loadUserFromCookies() {
      const token =
        AuthTokenStorageService.getAccessToken() &&
        AuthTokenStorageService.getAccessToken() != 'false'
          ? AuthTokenStorageService.getAccessToken()
          : '';
      if (token) {
        try {
          const res = await AuthService.getCurrentUser(token);
          if (res && res?.status === 200) {
            if (!isEmpty(res?.result?.user)) {
              setUser(res?.result?.user);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    loadUserFromCookies();
  }, []);

  const login = () => {
    router.push({
      pathname: `/auth/login`,
      query: { from: router.pathname },
    });
  };

  return (
    <div>
      <nav
        className={`relative md:relative w-full bg-white md:h-auto md:top-0 z-10 shadow-lg `}
      >
        <div className="max-w-7xl mx-auto md:mt-3">
          <div className=" flex items-center justify-between h-12">
            <div className="flex items-center flex-shrink-0 ">
              <div className="ml-2 mt-5">
                <Link href="/train">
                  <a>
                    <img
                      src="/assets/svgIcons/NewLogo.svg"
                      alt="Logo"
                      className="w-full h-full"
                    />{' '}
                  </a>
                </Link>
              </div>
              <div className="hidden">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navbarData.generalList.map(data => (
                    <a
                      className={`${'text-white'} hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium`}
                      href={`${data.route}`}
                      key={data.id}
                    >
                      {data.text}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-32 text-gray-700"></div>

            <div className="flex items-center ">
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-5">
                  <OrderCheck />
                  <div className="z-20">
                    <SelectLanguage isBlack={true} />
                  </div>
                  <div>
                    {isAuth ? (
                      <Profile data={user} />
                    ) : (
                      <button
                        onClick={login}
                        className="bg-button text-white font-medium py-2 px-4 rounded-lg h-auto w-56 hover:bg-red-500"
                      >
                        {displayLoadingLogin === true ? (
                          <LoadingRing />
                        ) : (
                          t('login')
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className=" inline-flex items-center justify-center p-2 rounded-md text-gray-400 "
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                {!isOpen ? (
                  <MenuIcon className="h-6 w-6" />
                ) : (
                  <XIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
          <SearchInput stationData={stationData} endStation={endStationData} />
        </div>

        <Transition
          show={isOpen}
          className="flex justify-end w-full px-2 absolute top-14"
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {ref => (
            <div
              className="flex justify-center px-6 py-3 md:hidden bg-white rounded-xl shadow-lg"
              id="mobile-menu"
            >
              <div ref={ref} className="p-3 space-y-4">
                <div className="flex">
                  <h1 className="text-cardDate font-medium pr-4">
                    {t('chooselanguage')}
                  </h1>
                  <SelectLanguage />
                </div>
                <div>
                  <OrderCheck />
                </div>
                <div>
                  {isAuth ? (
                    <Profile data={user} />
                  ) : (
                    <button
                      onClick={login}
                      className="bg-button text-white font-medium py-2 px-4 rounded-lg h-auto w-56 hover:bg-red-500"
                    >
                      {displayLoadingLogin === true ? (
                        <LoadingRing />
                      ) : (
                        t('login')
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}
