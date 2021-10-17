import { MenuIcon, XIcon } from '@heroicons/react/solid';
import React, { FC } from 'react';
import { Transition } from '@headlessui/react';

interface Props {
  navbarData?: any;
}

const Navbar: FC<Props> = ({ navbarData }) => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    // <div>
    //   <div className="w-full h-96">
    //     <img src="/assets/Header.png" alt="Logo" />
    //   </div>

    //   <nav className="absolute inset-x-0 top-0 flex flex-wrap items-center justify-between px-2 py-3 mb-3 w-full">
    //     <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
    //       <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
    //         <a
    //           className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
    //           href="#pablo"
    //         >
    //           <img
    //             src="/assets/logoWhite.png"
    //             alt="Logo"
    //             className="w-36 sm:w-full sm:h-full"
    //           />
    //         </a>
    //         <button
    //           className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
    //           type="button"
    //           onClick={() => setNavbarOpen(!navbarOpen)}
    //         >
    //           <MenuIcon className="w-6 h-6" />
    //         </button>
    //       </div>

    //       <div
    //         className={
    //           'lg:flex flex-grow items-center' +
    //           (navbarOpen ? ' flex' : ' hidden')
    //         }
    //         id="example-navbar-danger"
    //       >
    //         <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
    //           {navbarData.generalList.map(z => (
    //             <li className="nav-item">
    //               <a
    //                 className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
    //                 href={`${z.route}`}
    //               >
    //                 <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
    //                 <span className="ml-2 text-base">{z.text}</span>
    //               </a>
    //             </li>
    //           ))}
    //         </ul>

    //         <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
    //           {navbarData.profile.map(z => (
    //             <li className="nav-item">
    //               <a
    //                 className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
    //                 href={`${z.route}`}
    //               >
    //                 <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
    //                 <span className="ml-2 text-base">{z.text}</span>
    //               </a>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // </div>

    <div>
      <div className="w-full h-auto hidden md:block">
        <img src="/assets/Header.png" alt="Logo" />
      </div>

      <nav className="relative md:absolute top-0 w-full bg-gray-800 md:bg-opacity-0 md:top-4 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center ">
              <div className="flex-shrink-0">
                <img
                  src="/assets/logoWhite.png"
                  alt="Logo"
                  className="w-36 md:w-full md:h-full"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navbarData.generalList.map(z => (
                    <a
                      className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
                      href={`${z.route}`}
                    >
                      {z.text}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center ">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navbarData.profile.map(z => (
                    <a
                      className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
                      href={`${z.route}`}
                    >
                      {z.text}
                    </a>
                  ))}
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

          <div className="md:mt-12">
            <h1 className="hidden md:block text-white text-4xl font-bold">
              Аяллын цогц шийдэл
            </h1>
            <p className="hidden md:block text-white  font-light mt-2">
              Тийз захиалгын онлайн платформ
            </p>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {ref => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navbarData.profile.map(z => (
                  <a
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium block"
                    href={`${z.route}`}
                  >
                    {z.text}
                  </a>
                ))}
                {navbarData.generalList.map(z => (
                  <a
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    href={`${z.route}`}
                  >
                    {z.text}
                  </a>
                ))}
              </div>
            </div>
          )}
        </Transition>
      </nav>

      {/* <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <h1 className="bg-purple-200"> hi </h1>
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
          </div>
        </div>
      </main> */}
    </div>
  );
};

export default Navbar;
