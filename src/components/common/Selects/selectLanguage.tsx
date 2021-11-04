import mngIcon from 'public/assets/flagMongolia.png';
import enIcon from 'public/assets/flagEng.png';
import chinaIcon from 'public/assets/flagChina.png';
import React, { FC, useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import Image from 'next/image';
const languages = [
  { name: 'Mongolia', src: mngIcon },
  { name: 'English(UK)', src: enIcon },
  { name: 'China', src: chinaIcon },
];

export default function selectLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  return (
    <Listbox value={selectedLanguage} onChange={setSelectedLanguage}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
          <span className="block truncate">
            <Image
              className="rounded"
              src={selectedLanguage.src}
              width="26"
              height="13"
            />
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDownIcon
              className="w-5 h-5 text-white"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-40 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {languages.map((language, personIdx) => (
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
                value={language}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? 'font-medium' : 'font-normal'
                      } block truncate flex justify-between`}
                    >
                      <label className="" htmlFor="">
                        {language.name}
                      </label>
                      <p>
                        <Image
                          className="rounded"
                          src={language.src}
                          width="26"
                          height="13"
                        />
                      </p>
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
      </div>
    </Listbox>
  );
}
