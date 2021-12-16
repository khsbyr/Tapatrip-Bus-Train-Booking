import { MenuIcon, XIcon } from '@heroicons/react/solid';
import React, { FC, useState, useEffect } from 'react';
import OrderCheck from '@components/bus/orderCheck';
import { Transition } from '@headlessui/react';
import SearchInput from '@components/bus/searchInput';
import Link from 'next/link';
import Profile from '@components/common/navbar/profile';
import SelectLanguage from '@components/common/language';
import { useTranslation } from 'next-i18next';
import { useGlobalStore } from '@context/globalStore';
import { useUI } from '@context/uiContext';
import styles from '@components/common/navbar/navbar.module.scss';

interface Props {
  navbarData?: any;
  startLocations?: any;
}

export default function BusNavbar({ startLocations }) {
  const { t } = useTranslation(['common']);
  const { openLoadingLogin, displayLoadingLogin } = useUI();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useGlobalStore();
  const isAuth = user ? true : false;

  return (
    <div>
      <nav
        className={`relative md:relative w-full bg-white md:h-auto md:top-0 z-10 shadow-lg `}
      >
        <div className="max-w-7xl mx-auto md:mt-3">
          <div className=" flex items-center justify-between h-12">
            <div className="flex items-center flex-shrink-0 ">
              <div className="ml-2 mt-5">
                <Link href="/bus">
                  <a>
                    <img
                      src="/assets/svgIcons/tapatripBlue.svg"
                      alt="Logo"
                      className="w-40"
                    />{' '}
                  </a>
                </Link>
              </div>
            </div>

            <div className="w-32 text-gray-700"></div>

            <div className="flex items-center ">
              <div className="hidden lg:block">
                <div className="ml-10 flex items-center space-x-5">
                  <OrderCheck />
                  <div className="z-20">
                    <SelectLanguage isBlack={true} />
                  </div>
                  <div>
                    {isAuth ? (
                      <Profile data={user} />
                    ) : (
                      <a href="/auth/login">
                        <button
                          onClick={() => openLoadingLogin()}
                          className="bg-button text-white font-medium py-2 px-4 rounded-lg h-auto w-40 hover:bg-red-500"
                        >
                          {displayLoadingLogin === true ? (
                            <div className={styles.ldsDualRing}></div>
                          ) : (
                            t('login')
                          )}
                        </button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className=" inline-flex items-center justify-center p-2 rounded-md text-gray-400 mr-2"
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
          <SearchInput startLocations={startLocations} />
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
              className="flex justify-center px-6 py-3 lg:hidden bg-white rounded-xl shadow-lg"
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
                    <a href="/auth/login">
                      <button
                        onClick={() => openLoadingLogin()}
                        className="bg-button text-white font-medium py-2 px-4 rounded-lg h-auto w-56 hover:bg-red-500"
                      >
                        {displayLoadingLogin === true ? (
                          <div className={styles.ldsDualRing}></div>
                        ) : (
                          t('login')
                        )}
                      </button>
                    </a>
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
