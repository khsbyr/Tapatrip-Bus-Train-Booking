import { MenuIcon, XIcon } from '@heroicons/react/solid';
import React, { FC, useState } from 'react';
import { Transition } from '@headlessui/react';
import SearchBus from '@components/bus/SearchInput';
import logoBLue from '@public/assets/svgIcons/NewLogo.svg';
import styles from '../../common/Navbar/navbar.module.scss';
import Link from 'next/link';

interface Props {
  navbarData?: any;
  startLocations?: any;
}

export default function BusNav({ navbarData, startLocations }) {
  const [isOpen, setIsOpen] = useState(false);
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
                <div className="ml-10 flex items-baseline space-x-4">
                  {navbarData.profile.map(z => (
                    <a
                      className={` text-selected
                         hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium`}
                      href={`${z.route}`}
                      key={z.id}
                    >
                      {z.text}
                    </a>
                  ))}
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
          <SearchBus startLocations={startLocations} />
        </div>

        <Transition
          show={isOpen}
          className="px-2 shadow-lg w-full absolute top-14"
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
      </nav>
    </div>
  );
}
