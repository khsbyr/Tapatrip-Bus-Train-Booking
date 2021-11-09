import { Input, Button, Popover } from 'antd';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentDuplicateIcon,
  DuplicateIcon,
} from '@heroicons/react/outline';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import banks from '@data/bankInformation.json';
import s from './PayTransfer.module.scss';
export default function Payment() {
  const [selected, setSelected] = useState(banks[0]);
  const [isSelected, setIsSelected] = useState(false);
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
    navigator.clipboard.writeText('Захиалгын дугаар');
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
    navigator.clipboard.writeText('Холбогдох утас');
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
    <div className="w-full -ml-6 text-base">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <button className="w-full" onClick={onClick}>
            <Listbox.Button className="relative w-full py-4 pl-3 text-left text-cardDate bg-bg rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500">
              <span className="block truncate font-medium">
                {selected.name}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
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
            <Listbox.Options
              onClick={select}
              className="z-10 absolute w-full py-2 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
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
                      <span className={`${selected ? '' : ''} block truncate`}>
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
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2">
          <div className="space-y-3 sm:pr-2 text-base">
            <div className="space-y-2">
              <h1 className="text-cardDate ml-2">Захиалгын дугаар</h1>
              <p className="flex justify-between items-center bg-bg rounded-lg py-3 p-2">
                <label className="text-cardDate" htmlFor="firstName">
                  00112233
                </label>
                <button onClick={() => copyToOrderNumber()}>
                  {copyOrderNumber}
                </button>
              </p>
            </div>
            <div className="space-y-2">
              <h1 className="text-cardDate ml-2">Дансны дугаар</h1>
              <p className="flex justify-between items-center bg-bg rounded-lg py-3 p-2">
                <label className="text-cardDate" htmlFor="firstName">
                  {banks[selected.id].accountNumber}
                </label>
                <button onClick={() => copyToAccNumber(banks[selected.id])}>
                  {copyAccNumber}
                </button>
              </p>
            </div>
          </div>
          <div className="space-y-3 sm:pl-2 mt-4 sm:mt-0">
            <div className="space-y-2">
              <h1 className="text-cardDate ml-2">Холбогдох утас</h1>
              <p className="flex justify-between items-center bg-bg rounded-lg py-3 p-2">
                <label className="text-cardDate text-base" htmlFor="firstName">
                  Холбогдох утас
                </label>
                <button onClick={copyToPhoneNumber}>{copyPhoneNumber}</button>
              </p>
            </div>
            <div className="space-y-3 w-full">
              <h1 className="text-cardDate ml-2">Хүлээн авагч</h1>
              <div className="flex bg-bg rounded-lg py-3 p-2">
                {/* <label className="text-cardDate" htmlFor="firstName"> */}
                {banks[selected.id].accountName}{' '}
                <DuplicateIcon className="text-secondary h-7 w-7" />
                {/* </label> */}
                {/* <button onClick={() => copyToAccName(banks[selected.id])}>
                  {copyAccName}
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </Listbox>
    </div>
  );
}
