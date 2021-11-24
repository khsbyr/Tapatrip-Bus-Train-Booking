import { MenuIcon, XIcon, PhoneIcon } from '@heroicons/react/solid';
import React, { FC, useState } from 'react';
import { Transition } from '@headlessui/react';
import OrderCheck from '@components/bus/OrderCheck';
import styles from './navbar.module.scss';
import SelectLanguage from '@components/common/Language';
import Link from 'next/link';

interface Props {
  navbarData?: any;
}

const Navbar: FC<Props> = ({ navbarData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [openTab, setOpenTab] = React.useState(4);
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
              <div className="flex-shrink-0">
                <Link href="/bus">
                  <a>
                    <img
                      src={`${
                        navbar
                          ? '/assets/svgIcons/NewLogo.svg'
                          : '/assets/svgIcons/NewLogoWhite.svg'
                      } `}
                      alt="Logo"
                      className={styles.logo}
                    />
                  </a>
                </Link>
              </div>
              <div className={`${navbar ? 'hidden' : 'lg:block'} hidden`}>
                <div className={styles.menuBody}>
                  {navbarData.generalList.map(menu => (
                    <a
                      key={menu.id}
                      className={styles.menu}
                      href={`${menu.route}`}
                    >
                      {menu.text}
                    </a>
                  ))}
                  <div className="flex items-center space-x-5 justify-center lg:pl-5 xl:pl-10">
                    <OrderCheck />
                    <SelectLanguage isBlack={false} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden lg:flex items-center">
                <div
                  className={`${
                    navbar ? 'text-cardDate' : 'text-white'
                  } flex text-lg font-bold cursor-pointer pr-5`}
                >
                  <PhoneIcon className="w-5" />
                  <p className="pl-2">7515-4444</p>
                </div>
                <div className={styles.loginBody}>
                  <a href="/auth/login">
                    <button className={styles.loginButton}>Нэвтрэх</button>
                  </a>
                </div>
              </div>
            </div>

            <div className="-mr-2 flex lg:hidden">
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
                      navbar ? 'h-6 w-6 text-cardDate' : 'h-6 w-6 text-white'
                    } `}
                  />
                ) : (
                  <XIcon
                    className={`${
                      navbar ? 'h-6 w-6 text-cardDate' : 'h-6 w-6 text-white'
                    } `}
                  />
                )}
              </button>
            </div>
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
                <div className="flex">
                  <h1 className="text-cardDate font-medium pr-4">Хэл сонгох</h1>
                  <SelectLanguage />
                </div>
                <OrderCheck />
                <div>
                  <Link href="/auth/login">
                    <a>
                      <button className="bg-button text-white font-medium py-2 px-4 rounded-lg h-auto w-56 hover:bg-red-500">
                        Нэвтрэх
                      </button>
                    </a>
                  </Link>
                </div>
                <div className="flex items-center text-base sm:text-lg font-bold px-4 cursor-pointer text-cardDate">
                  <PhoneIcon className="w-4 sm:w-5" />
                  <p className="pl-2">(976)-7514-4444</p>
                </div>
              </div>
            </div>
          )}
        </Transition>

        <nav className={styles.bottomMenu}>
          {navbarData.generalList.map(menu => (
            <div key={menu.id}>
              <a
                className={
                  'text-xs pt-3 rounded-full block leading-normal ' +
                  (openTab === menu.id
                    ? 'text-selected'
                    : 'text-mobileNav bg-white cursor-default pointer-events-none')
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(menu.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="-5 0 60 45"
                  fill={openTab === menu.id ? 'white' : '#BCC4CC'}
                  className={
                    openTab === menu.id
                      ? 'bg-blue-600 rounded-full p-1.5'
                      : '#BCC4CC'
                  }
                >
                  <g>
                    {menu.path.map(value => (
                      <path key={value} d={value} />
                    ))}
                  </g>
                </svg>
                <span>{menu.text}</span>
              </a>
            </div>
          ))}
        </nav>
      </nav>
    </div>
  );
};

export default Navbar;
