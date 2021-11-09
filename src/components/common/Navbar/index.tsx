import { MenuIcon, XIcon } from '@heroicons/react/solid';
import React, { FC, useState } from 'react';
import { Transition } from '@headlessui/react';
import OrderModal from '@components/bus/OrderModal/OrderModal';
import styles from './navbar.module.scss';
import SelectLanguage from '@components/common/Selects/selectLanguage';
import SelectRate from '@components/common/Selects/selectRate';

interface Props {
  navbarData?: any;
}

const Navbar: FC<Props> = ({ navbarData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
          className={`relative md:fixed w-screen
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
                        ? '../assets/logoBlue.png'
                        : '../assets/logoWhite.png'
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
                    <SelectRate />
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
            className="flex justify-end w-full absolute"
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {ref => (
              <div className="md:hidden bg-white" id="mobile-menu">
                <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navbarData.profile.map(data => (
                    <a
                      key={data.id}
                      className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-light block"
                      href={`${data.route}`}
                    >
                      {data.text}
                    </a>
                  ))}
                  {navbarData.generalList.map(menu => (
                    <a
                      key={menu.id}
                      className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-light"
                      href={`${menu.route}`}
                    >
                      {menu.text}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </Transition>
        </nav>
      </div>
      {isModalVisible && (
        <OrderModal isModalVisible={isModalVisible} close={closeModal} />
      )}
    </>
  );
};

export default Navbar;
