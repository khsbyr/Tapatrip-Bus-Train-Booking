import { MenuIcon, XIcon } from '@heroicons/react/solid';
import React, { FC, useState } from 'react';
import { Transition } from '@headlessui/react';
// import Profile from '@components/common/Navbar/Profile';
import Image from 'next/image';
import BackgroundImage from '@public/assets/svgIcons/NewLogo.svg';

interface Props {
  navbarData?: any;
}

const Navbar3: FC<Props> = ({ navbarData }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="w-full">
        <nav
          className={`relative md:relative w-full bg-white md:h-auto md:top-0 z-10 shadow-lg `}
        >
          <div className="max-w-7xl mx-auto py-4">
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center ">
                <div className="flex-shrink-0">
                  <a href="#">
                    <Image
                      src={BackgroundImage}
                      alt="Logo"
                      className="w-36 md:w-full md:h-full px-4"
                    />
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
                <div className="hidden md:block">{/* <Profile /> */}</div>
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
            className="flex justify-end w-full  absolute"
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {ref => (
              <div className="md:hidden rounded bg-white" id="mobile-menu">
                <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <div className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium block">
                    {/* <Profile /> */}
                  </div>
                  {navbarData.profile.map(z => (
                    <a
                      className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium block"
                      href={`${z.route}`}
                      key={z.id}
                    >
                      {z.text}
                    </a>
                  ))}
                  {navbarData.generalList.map(z => (
                    <a
                      className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      href={`${z.route}`}
                      key={z.id}
                    >
                      {z.text}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </Transition>
        </nav>
      </div>
    </>
  );
};

export default Navbar3;
