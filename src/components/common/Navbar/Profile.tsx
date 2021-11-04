import { UserCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';
export default function Profile() {
  const [isOpen, serIsOpen] = useState(0);
  return (
    <div className="">
      <button className="flex items-center text-base bg-blue-500 rounded-xl p-1">
        <h1 className="text-white font-medium px-2 border-r-2">User Name</h1>
        <UserCircleIcon className="text-white px-2 h-6" />
      </button>
    </div>
  );
}
