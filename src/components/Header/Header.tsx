import React, { FC } from 'react';

interface Props {
  navbarData?: any;
}

const Header: FC<Props> = () => {
  return (
    <div className="hidden  md:block ">
      <img
        src="assets/Header.png"
        alt="Logo"
        className="h-96 object-cover mx-auto"
      />
      <div className="hidden md:block md:mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-60">
        <h1 className=" text-white text-4xl font-bold">Аяллын цогц шийдэл</h1>
        <p className=" text-white  font-light mt-2">
          Тийз захиалгын онлайн платформ
        </p>
      </div>
    </div>
  );
};

export default Header;
