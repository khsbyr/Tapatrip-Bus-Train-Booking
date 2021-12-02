import {
  LogoutIcon,
  DocumentIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/outline';
import { UserCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const onClick = () => {
    setIsSelected(!isSelected);
  };

  const select = () => {
    setIsSelected(!isSelected);
  };
  return (
    <div className="">
      <div onClick={onClick}>
        <button
          className="flex items-center text-base rounded border border-profile bg-profile hover:border hover:bg-white text-cardDate hover:text-blue-600 py-2 px-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src="/assets/profile1.png"
            alt=""
            width="30"
            className="rounded-full"
          />
          <p className="px-2 pr-4 text-sm">99331137</p>
          {isSelected ? (
            <ChevronUpIcon className="h-4" />
          ) : (
            <ChevronDownIcon className="h-4" />
          )}
        </button>
      </div>

      <div
        className={`${
          !isOpen
            ? 'hidden'
            : 'bg-white absolute block rounded shadow-lg p-3 z-20 text-sm text-cardDate w-60 lg:-ml-20'
        }`}
        onClick={select}
      >
        <a
          className="flex items-center rounded p-4 hover:bg-bg border-b border-dotted hover:text-cardDate"
          href=""
        >
          {/* <UserCircleIcon className="pr-2 h-5" /> */}
          Хэрэглэгчийн хэсэг
        </a>
        <a
          className="flex items-center p-4 hover:bg-bg rounded border-b border-dotted hover:text-cardDate"
          href=""
        >
          {/* <DocumentIcon className="pr-2 h-5" /> */}
          Миний захиалгууд
        </a>
        <a
          className="flex items-center hover:bg-red-100 rounded p-4 hover:text-cardDate"
          href=""
        >
          {/* <LogoutIcon className="pr-2 h-5" /> */}
          Системээс гарах
        </a>
      </div>
    </div>
    // <div className="flex items-end rounded-lg bg-button text-white px-3 py-2">
    //   <UserCircleIcon className="text-white pr-2 h-5" />
    //   Enkhbayar
    // </div>
  );
}
