import Datepicker from '@components/ui/Datepicker/Datepicker';
import {
  LocationMarkerIcon,
  MailIcon,
  MapIcon,
  StopIcon,
} from '@heroicons/react/solid';
import React, { FC } from 'react';
import s from './SearchBus.module.scss';

interface Props {
  navbarData?: any;
}

const SearchBus: FC<Props> = () => {
  return (
    <div>
      <form className={s.form}>
        {/* <div className="grid grid-cols-3 gap-x-10  "> */}
        <div className="flex items-center rounded-2xl py-1 h-14 bg-bg w-full">
          <LocationMarkerIcon
            className="w-8 h-8 ml-4"
            style={{ color: '#8AB1D5' }}
          />
          <input
            className="appearance-none bg-transparent w-full ml-2 py-1 px-2 placeholder-primary border-none"
            type="text"
            placeholder="Хаанаас: хот байршил..."
            aria-label="Full name"
          />
        </div>

        <div className="flex items-center  rounded-2xl py-1 h-14 bg-bg w-full">
          <LocationMarkerIcon
            className="w-8 h-8 ml-4"
            style={{ color: '#8AB1D5' }}
          />
          <input
            className="appearance-none bg-transparent w-full ml-2 py-1 px-2 placeholder-primary border-none"
            type="text"
            placeholder="Хаашаа: хот байршил..."
            aria-label="Full name"
          />
        </div>

        <div className="flex items-center  rounded-2xl py-1 h-14 bg-bg w-full">
          <LocationMarkerIcon
            className="w-8 h-8 ml-4"
            style={{ color: '#8AB1D5' }}
          />
          <input
            className="appearance-none bg-transparent w-full ml-2 py-1 px-2 placeholder-primary border-none"
            type="text"
            placeholder="Явах өдөр..."
            aria-label="Full name"
          />
        </div>

        <button className="bg-button text-white font-bold py-2 px-4 rounded-2xl h-14 w-full">
          Хайх
        </button>
        {/* </div> */}
      </form>
    </div>
  );
};

export default SearchBus;
