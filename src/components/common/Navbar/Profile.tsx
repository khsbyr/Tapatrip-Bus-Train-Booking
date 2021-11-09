import { UserCircleIcon, LogoutIcon } from '@heroicons/react/solid';
import { useState } from 'react';
export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:px-2">
      <button
        className="flex items-center text-base bg-register md:bg-blue-500 rounded-xl p-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h1 className="text-white font-medium px-2 border-r-2">User Name</h1>
        <UserCircleIcon className="text-white px-2 h-6" />
      </button>
      <div
        className={`${
          !isOpen
            ? 'hidden'
            : 'bg-white absolute block rounded shadow-md py-2 w-36'
        }`}
      >
        <a
          className="flex items-center text-base font-medium px-4 py-2 text-cardDate hover:bg-bg hover:text-cardDate"
          href=""
        >
          <UserCircleIcon className="text-cardDate pr-2 h-6" />
          Профайл
        </a>
        <a
          className="flex items-center text-base font-medium px-4 py-2 text-cardDate hover:bg-bg hover:text-cardDate"
          href=""
        >
          <LogoutIcon className="text-cardDate pr-2 h-6" />
          Гарах
        </a>
      </div>
    </div>
  );
}
