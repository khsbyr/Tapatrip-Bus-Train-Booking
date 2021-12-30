import { MenuIcon, XIcon, PhoneIcon } from '@heroicons/react/solid';
import React, { FC, useState } from 'react';
import { Transition } from '@headlessui/react';
import OrderCheck from '@components/bus/orderCheck';
import styles from './navbar.module.scss';
import SelectLanguage from '@components/common/language';
import Link from 'next/link';
import Profile from './profile';
import { useTranslation } from 'next-i18next';
import { useGlobalStore } from '@context/globalStore';
import OnlineHelpModal from '@components/common/onlineHelpModal';
import { useUI } from '@context/uiContext';

interface Props {
  navbarData?: any;
}
const Navbar: FC<Props> = ({ navbarData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const { user } = useGlobalStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { openLoadingLogin, displayLoadingLogin } = useUI();

  const isAuth = user ? true : false;

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', changeBackground);
  }

  const handleTelcocom = () => {
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=300,height=600,left=1340,top=220`;
    window.open(
      'https://my.telcocom.mn/callus/#!#%2FCE05E5603B1C11EC8428FFD132F2D921',
      'Tapatrip',
      params
    );
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <nav
        className={`absolute top-5 md:mt-0 md:fixed w-screen 
          ${navbar ? 'bg-white' : 'bg-none'}
          md:h-20 md:top-0 z-10 ${navbar ? 'shadow-lg' : 'shadow-none'}`}
      >
        <div className={styles.navbar}>
          <div className={styles.navbarBody}>
            <div className="flex items-center">
              <div className="flex-shrink-0 cursor-pointer">
                <Link href="/">
                  <img
                    src={`${
                      navbar
                        ? '/assets/svgIcons/tapatripBlue.svg'
                        : '/assets/svgIcons/tapatripWhite.svg'
                    } `}
                    alt="Logo"
                    className={styles.logo}
                  />
                </Link>
              </div>

              <div
                className={`${
                  navbar ? 'block' : 'hidden'
                } h-8 bg-gray-200 w-px ml-10`}
              />

              <div className={styles.menuBody}>
                {navbarData.generalList.map(menu => (
                  <a
                    key={menu.id}
                    className={`${
                      navbar ? 'text-gray-700' : 'text-white'
                    }  hover:text-gray-300 px-1 py-2 rounded-md text-sm font-light hidden md:block`}
                    href={`${menu.route}`}
                    target={
                      menu.id === 2 || menu.id === 1 ? '_blank' : '_parent'
                    }
                  >
                    {t(`${menu.text}`)}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-5">
              <div
                className={`${
                  navbar ? 'hidden' : 'lg:flex items-center space-x-5'
                } hidden`}
              >
                <OrderCheck />
                <SelectLanguage isBlack={false} />
              </div>
              <div className="hidden lg:flex items-center">
                <a href="tel:97675154444">
                  <div
                    className={`${
                      navbar ? 'text-cardDate' : 'text-white'
                    } flex text-base font-bold cursor-pointer mr-5 hover:bg-onlineSupport hover:text-white hover:rounded px-3 py-2`}
                  >
                    <PhoneIcon className="w-4" />
                    <p className="pl-2">7515 4444</p>
                  </div>
                </a>
                <div className={styles.loginBody}>
                  {isAuth ? (
                    <Profile data={user} />
                  ) : (
                    <a href="/auth/login">
                      <button
                        className={styles.loginButton}
                        onClick={() => openLoadingLogin()}
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

            <div className="-mr-2 flex space-x-5 lg:hidden">
              <div className="flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-8 w-8 bg-onlineSupport rounded-lg"></span>
                <button
                  onClick={() => handleTelcocom()}
                  className="z-10 flex text-xs font-thin cursor-pointer text-white bg-onlineSupport p-2 rounded-lg"
                >
                  <PhoneIcon className="w-6" />
                </button>
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className={styles.mobileButton}
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                {!isOpen ? (
                  <MenuIcon
                    className={`${
                      navbar ? 'h-6 w-6 text-cardDate' : 'h-6 w-6 text-cardDate'
                    } `}
                  />
                ) : (
                  <XIcon
                    className={`${
                      navbar ? 'h-6 w-6 text-cardDate' : 'h-6 w-6 text-cardDate'
                    } `}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="hidden max-w-7xl mx-auto justify-end pr-4 lg:flex">
          <div className="flex justify-center items-center mt-7">
            <span className="animate-ping absolute inline-flex h-7 w-28 bg-green-200 rounded-lg"></span>
            <span className="animate-ping absolute inline-flex h-7 w-28 bg-onlineSupport rounded-lg z-8"></span>
            <button className="z-10 flex text-xs font-thin cursor-pointer text-white bg-onlineSupport p-3 rounded-lg">
              <PhoneIcon className="w-4" />
              <p className="pl-1 w-36 text-sm" onClick={() => handleTelcocom()}>
                {t('onlineHelp')}
              </p>
            </button>
          </div>
        </div>

        <Transition
          show={isOpen}
          className="flex justify-end w-full px-2 absolute top-16"
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
                <div className="flex flex-wrap">
                  <h1 className="text-cardDate font-medium pr-4">
                    {t('chooselanguage')}
                  </h1>
                  <SelectLanguage />
                </div>
                <OrderCheck />
                <a href="tel:97675154444">
                  <div className="flex justify-center items-center text-base sm:text-lg mt-4 font-bold px-4 py-2 cursor-pointer text-cardDate hover:bg-onlineSupport hover:text-white hover:rounded">
                    <PhoneIcon className="w-4 sm:w-5" />
                    <p className="pl-2">(976)-7514-4444</p>
                  </div>
                </a>
                <hr />

                <div className={styles.loginBody}>
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
      {isModalVisible && (
        <OnlineHelpModal isModalVisible={isModalVisible} close={closeModal} />
      )}
    </div>
  );
};

export default Navbar;
