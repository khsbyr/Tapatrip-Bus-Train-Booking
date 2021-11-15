import { Input, Button, Popover } from 'antd';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentDuplicateIcon,
  DuplicateIcon,
} from '@heroicons/react/outline';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { CheckIcon } from '@heroicons/react/solid';
import banks from '@data/bankInformation.json';
import s from './PayTransfer.module.scss';
import { useGlobalStore } from '@context/globalStore';

export default function Payment() {
  const [selected, setSelected] = useState(banks[0]);
  const [isSelected, setIsSelected] = useState(false);
  const { booking, setBooking } = useGlobalStore();
  console.log(booking);
  const onClick = () => {
    setIsSelected(!isSelected);
  };
  const select = () => {
    setIsSelected(!isSelected);
  };
  const [copyOrderNumber, setCopyOrderNumber] = useState(
    <DuplicateIcon className="text-secondary h-6 w-6" />
  );
  const copyToOrderNumber = () => {
    navigator.clipboard.writeText('num');
    setCopyOrderNumber(<CheckIcon className="text-secondary h-6 w-6" />);
  };
  const [copyAccNumber, setCopyAccNumber] = useState(
    <DuplicateIcon className="text-secondary h-6 w-6" />
  );
  const copyToAccNumber = bank => {
    navigator.clipboard.writeText(bank.accountNumber);
    setCopyAccNumber(<CheckIcon className="text-secondary h-6 w-6" />);
  };
  const [copyPhoneNumber, setCopyPhoneNumber] = useState(
    <DuplicateIcon className="text-secondary h-6 w-6" />
  );
  const copyToPhoneNumber = () => {
    navigator.clipboard.writeText('9999999');
    setCopyPhoneNumber(<CheckIcon className="text-secondary h-6 w-6" />);
  };
  const [copyAccName, setCopyAccName] = useState(
    <DuplicateIcon className="text-secondary h-6 w-6" />
  );
  const copyToAccName = bank => {
    navigator.clipboard.writeText(bank.accountName);
    setCopyAccName(<CheckIcon className="text-secondary h-6 w-6" />);
  };

  return (
    <>
      <div className={s.root}>
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <button className="w-full" onClick={onClick}>
              <Listbox.Button className="w-full py-4 pl-3 text-left text-cardDate bg-bg rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500">
                <span className="block truncate font-medium">
                  {selected.name}
                </span>
                <span className={s.ListBoxIcon}>
                  {isSelected ? (
                    <ChevronUpIcon className="text-secondary h-6 w-6" />
                  ) : (
                    <ChevronDownIcon className="text-secondary h-6 w-6" />
                  )}
                </span>
              </Listbox.Button>
            </button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options onClick={select} className={s.ListBoxOptions}>
                {banks.map((bank, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `${active ? 'bg-bg' : 'bg-white'}
                          cursor-default select-none font-medium text-cardDate relative py-2 pl-10 pr-4`
                    }
                    value={bank}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? '' : ''
                          } block truncate text-sm sm:text-base`}
                        >
                          {bank.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${active ? '' : ''}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2">
          <div className="space-y-3 sm:pr-2">
            <div className="space-y-2">
              <h1 className="text-cardDate ml-2">Захиалгын дугаар</h1>
              <p className="flex justify-between items-center bg-bg rounded-lg py-3 p-2">
                <h1 className="text-cardDate text-sm sm:text-base">
                  {booking.refNumber}
                </h1>
                <button onClick={() => copyToOrderNumber()}>
                  {copyOrderNumber}
                </button>
              </p>
            </div>
            <div className="space-y-2">
              <h1 className="text-cardDate ml-2">Дансны дугаар</h1>
              <p className="flex justify-between items-center bg-bg rounded-lg py-3 p-2">
                <h1 className="text-cardDate text-sm sm:text-base">
                  {banks[selected.id].accountNumber}
                </h1>
                <button onClick={() => copyToAccNumber(banks[selected.id])}>
                  {copyAccNumber}
                </button>
              </p>
            </div>
          </div>
          <div className="space-y-3 sm:pl-2">
            <div className="space-y-2">
              <h1 className="text-cardDate ml-2">Холбогдох утас</h1>
              <p className="flex justify-between items-center bg-bg rounded-lg py-3 p-2">
                <h1 className="text-cardDate text-sm sm:text-base lg:pr-4">
                  Холбогдох утас
                </h1>
                <button onClick={copyToPhoneNumber}>{copyPhoneNumber}</button>
              </p>
            </div>
            <div className="space-y-2">
              <h1 className="text-cardDate ml-2">Хүлээн авагч</h1>
              <p className="flex items-center justify-between bg-bg rounded-lg py-3 p-2">
                <h1 className="text-cardDate text-sm sm:text-base lg:pr-4">
                  {banks[selected.id].accountName}
                </h1>
                <button onClick={() => copyToAccName(banks[selected.id])}>
                  {copyAccName}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
