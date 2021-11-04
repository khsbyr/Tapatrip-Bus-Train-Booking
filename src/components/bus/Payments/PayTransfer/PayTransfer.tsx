import banks from '@data/bankInformation.json';
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentDuplicateIcon,
  DuplicateIcon,
} from '@heroicons/react/outline';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

interface Props {
  banks?: any;
}

export default function PayTransfer({ banks }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(banks[0]);
  return (
    <div className="-ml-6 w-full">
      <Listbox value={selected} onChange={setSelected}>
        <button className="w-full" onClick={() => setIsOpen(!isOpen)}>
          <Listbox.Button className="relative w-full py-4 pl-3 text-left text-cardDate bg-bg rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500">
            <span className="block truncate">{selected.name}</span>

            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              {!isOpen ? (
                <ChevronDownIcon className="text-secondary h-6 w-6" />
              ) : (
                <ChevronUpIcon className="text-secondary h-6 w-6" />
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
          <Listbox.Options className="z-10 absolute w-full py-2 font-normal mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {banks.map((bank, i) => (
              <Listbox.Option
                key={i}
                className={({ active }) =>
                  `${active ? 'bg-bg' : 'text-cardDate'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                }
                value={bank}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? 'text-cardDate' : 'text-cardDate'
                      } block truncate`}
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
      </Listbox>
      {banks.map(bank => (
        <>
          <div className="z-0 grid mt-4 sm:grid-cols-2">
            <div className="w-full space-y-3 sm:pr-3 lg:pr-3">
              <h1 className="px-2 text-cardDate">Захиалгын дугаар</h1>
              <p className="flex">
                <label htmlFor="">12345678</label>
              </p>
            </div>
            <div className="w-full space-y-3 sm:pl-3 lg:pl-3">
              <h1 className="px-2 text-cardDate font-normal"></h1>
            </div>
          </div>
          <div className="flex flex-wrap py-2 mt-2 font-normal sm:grid grid-cols-2">
            <div className="w-full space-y-3 sm:pr-3 lg:pr-3">
              <h1 className="px-2 text-cardDate font-normal">Дансны дугаар</h1>
            </div>
            <div className="w-full space-y-3 sm:pl-3 lg:pl-3">
              <h1 className="px-2 text-cardDate font-normal">Хүлээн авагч</h1>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
