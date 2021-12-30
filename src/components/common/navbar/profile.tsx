import {
  LogoutIcon,
  DocumentIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/outline';
import { UserCircleIcon } from '@heroicons/react/solid';
import AuthService from '@services/auth';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

export default function Profile({ data }) {
  const { t } = useTranslation(['common']);
  const router = useRouter();
  const handleLogout = () => {
    AuthService.logout();
  };
  const handleUserInfo = async isActive => {
    router.push({
      pathname: isActive === false ? '/user/profile' : '/user/orders',
    });
  };
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="">
      <button
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="flex items-center justify-between text-base rounded border w-56 lg:w-40 border-profile bg-profile hover:border hover:bg-white text-cardDate hover:text-blue-600 py-2 px-3"
      >
        <p className="flex items-center border-0">
          <UserCircleIcon className="h-6" />
          <p className="px-2 pr-4 text-sm">{data?.phone}</p>
        </p>
        {!isHovering ? (
          <ChevronDownIcon className="h-4" />
        ) : (
          <ChevronUpIcon className="h-4" />
        )}
      </button>{' '}
      <div
        className={`${
          !isHovering
            ? 'hidden'
            : 'bg-white absolute block rounded shadow-lg p-3 z-20 text-sm text-cardDate w-56 lg:-ml-16'
        }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* <a
          className="flex items-center rounded p-4 hover:bg-bg border-b border-dotted hover:text-cardDate"
          onClick={() => handleUserInfo(false)}
        >
          <UserCircleIcon className="pr-2 h-5" />
          {t('customerSection')}
        </a> */}
        <a
          className="flex items-center p-4 hover:bg-bg rounded border-b border-dotted hover:text-cardDate"
          onClick={() => handleUserInfo(true)}
        >
          <DocumentIcon className="pr-2 h-5" />
          {t('myOrders')}
        </a>
        <a
          className="flex items-center hover:bg-red-100 rounded p-4 hover:text-red-400"
          href="/"
          onClick={handleLogout}
        >
          <LogoutIcon className="pr-2 h-5" />
          {t('logout')}
        </a>
      </div>
    </div>
  );
}
