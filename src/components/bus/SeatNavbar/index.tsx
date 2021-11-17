import { MenuIcon, XIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import style from './SeatNavbar.module.scss';
import OrderCheck from '@components/bus/OrderCheck';
import SelectLanguage from '@components/common/Selects/selectLanguage';
import Link from 'next/link';
interface Props {
  navbarData?: any;
}

export default function SeatNav({ navbarData }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav
        className={`relative w-full bg-white md:h-auto md:top-0 z-10 shadow-lg `}
      >
        <div className="max-w-7xl mx-auto py-4">
          <div className="flex items-center justify-around md:justify-between h-12">
            <div className="flex items-center ">
              <div className="flex-shrink-0">
                <a href="/">
                  <img src="../../assets/svgIcons/NewLogo.svg" alt="Logo" />
                </a>
              </div>
              <div className="hidden">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navbarData.generalList.map(z => (
                    <a
                      className={`${'text-white'} hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium`}
                      href={`${z.route}`}
                      key={z.id}
                    >
                      {z.text}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-32 text-gray-700"></div>

            <div className="flex items-center ">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <OrderCheck />
                  <SelectLanguage />

                  <div>
                    <Link href="/login">
                      <a>
                        <button className="bg-button text-white font-medium py-2 px-4 rounded-lg h-auto w-56 hover:bg-red-500">
                          Нэвтрэх
                        </button>
                      </a>
                    </Link>
                  </div>
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
                {console.log(ref)}
                <div className="flex">
                  <h1 className="text-cardDate font-medium pr-4">Хэл сонгох</h1>
                  <SelectLanguage />
                </div>
                <div>
                  <OrderCheck />
                </div>
                <div>
                  <Link href="/login">
                    <a>
                      <button className="bg-button text-white font-medium py-2 px-4 rounded-lg h-auto w-56 hover:bg-red-500">
                        Нэвтрэх
                      </button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}
