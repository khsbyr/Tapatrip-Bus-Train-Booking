import { MenuIcon, XIcon } from '@heroicons/react/solid';
import React, { FC, useState } from 'react';
import { Transition } from '@headlessui/react';
import OrderModal from '@components/bus/OrderModal';
import styles from './navbar.module.scss';
import SelectLanguage from '@components/common/Selects/selectLanguage';

interface Props {
  navbarData?: any;
}

const Navbar: FC<Props> = ({ navbarData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openTab, setOpenTab] = React.useState(4);

  function checkOrder() {
    setIsModalVisible(true);
  }

  const closeModal = () => {
    setIsModalVisible(false);
  };

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
    <>
      <div>
        <nav
          className={`absolute top-5 md:mt-0 md:fixed w-screen 
          ${navbar ? 'bg-white' : 'bg-none'}
          md:h-20 md:top-0 z-10 ${navbar ? 'shadow-lg' : 'shadow-none'}`}
        >
          <div className={styles.navbar}>
            <div className={styles.navbarBody}>
              <div className="flex items-center ">
                <div className="flex-shrink-0">
                  <img
                    src={`${
                      navbar
                        ? '../assets/svgIcons/NewLogo.svg'
                        : '../assets/svgIcons/NewLogoWhite.svg'
                    } `}
                    alt="Logo"
                    className={styles.logo}
                  />
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
                    <button className={styles.orderButton} onClick={checkOrder}>
                      Захиалга шалгах
                    </button>
                    <SelectLanguage />
                  </div>
                </div>
              </div>

              <div className="flex items-center ">
                <div className="hidden md:block">
                  <div className={styles.loginBody}>
                    <button className={styles.loginButton}>Нэвтрэх</button>
                  </div>
                </div>
              </div>

              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className={styles.mobileButton}
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
            className="px-2 shadow-lg w-full absolute"
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {ref => (
              <div
                className="md:hidden bg-white w-full rounded-lg"
                id="mobile-menu"
              >
                <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navbarData.profile.map(data => (
                    <a
                      key={data.id}
                      className={styles.mobileMenu}
                      href={`${data.route}`}
                    >
                      {data.text}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </Transition>

          <nav className={styles.bottomMenu}>
            {navbarData.generalList.map(menu => (
              <div className="">
                <a
                  className={
                    'text-xs pt-3 rounded-full block leading-normal ' +
                    (openTab === menu.id
                      ? 'text-selected'
                      : 'text-mobileNav bg-white')
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
      {isModalVisible && (
        <OrderModal isModalVisible={isModalVisible} close={closeModal} />
      )}
    </>
  );
};

export default Navbar;
