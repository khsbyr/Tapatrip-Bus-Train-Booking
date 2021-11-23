import React, { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
const rates = [
  { name: 'MNT', icon: '₮' },
  { name: 'USD', icon: '$' },
  { name: 'CN¥', icon: '¥' },
];

export default function selectLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState(rates[0]);
  const [isSelected, setIsSelected] = useState(false);
  const onClick = () => {
    setIsSelected(!isSelected);
  };
  const select = () => {
    setIsSelected(!isSelected);
  };
  return (
    <Listbox value={selectedLanguage} onChange={setSelectedLanguage}>
      <button className="relative mt-1" onClick={onClick}>
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
          <span className="block truncate text-base text-white">
            {selectedLanguage.icon}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            {isSelected ? (
              <ChevronUpIcon className="text-white h-6 w-6" />
            ) : (
              <ChevronDownIcon className="text-white h-6 w-6" />
            )}
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            onClick={select}
            className="absolute w-32 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {rates.map((rate, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `${
                    active
                      ? 'text-blue-500 bg-amber-100 bg-bg'
                      : 'text-gray-900'
                  }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                }
                value={rate}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? 'font-medium' : 'font-normal'
                      } block truncate justify-between text-sm text-cardDate font-medium`}
                    >
                      <label className="" htmlFor="">
                        {rate.name}
                      </label>
                      <label className="" htmlFor="">
                        {rate.icon}
                      </label>
                    </span>
                    {selected ? (
                      <span
                        className={`${
                          active ? 'text-amber-500' : 'text-blue-500'
                        }
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
      </button>
    </Listbox>
  );
}
