import React, { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';
import OrderCheck from '@components/bus/orderCheck';
import SelectLanguage from '@components/common/language';
import { useTranslation } from 'next-i18next';
import Profile from '@components/common/navbar/profile';
import { useGlobalStore } from '@context/globalStore';
import AuthService from '@services/auth';
import { useUI } from '@context/uiContext';
import styles from '@components/common/navbar/navbar.module.scss';
import NavData from '@data/navData.json';
import s from './seatNavbar.module.scss';
import { useRouter } from 'next/router';

export default function SeatNav() {
  const { openLoadingLogin, displayLoadingLogin } = useUI();
  const { t } = useTranslation(['common']);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useGlobalStore();
  const isAuth = user ? true : false;
  const handleLogout = () => {
    AuthService.logout();
  };
  const router = useRouter();

  return (
    <div>
      <nav
        className={`relative w-full bg-white md:h-auto md:top-0 z-10 shadow-lg`}
      >
        <div className="max-w-7xl mx-auto py-4">
          <div className="flex items-center justify-around md:justify-between h-12">
            <div className="flex items-center">
              <div className="flex-shrink-0 cursor-pointer">
                <a href="https://bus.tapatrip.com/">
                  <img
                    src="/assets/svgIcons/tapatripBlue.svg"
                    alt="Logo"
                    className="w-40"
                  />
                </a>
              </div>

              <div className="h-8 bg-gray-200 w-px mx-12 hidden md:block"></div>

              <div className="text-gray-700 hidden md:block">
                <ul className="flex">
                  {NavData.generalList.map(menu => (
                    <li className={s.li} key={menu.id}>
                      <a
                        href={`${menu.route}`}
                        target={
                          menu.id === 2 || menu.id === 1 ? '_parent' : '_parent'
                        }
                      >
                        {t(`${menu.text}`)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center ">
              <div className="hidden lg:block">
                <div className="ml-10 flex items-center space-x-4">
                  {/* {router.route !== '/tour' ? <OrderCheck /> : ''} */}
                  <SelectLanguage isBlack={true} />
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

            <div className="-mr-2 flex lg:hidden">
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
