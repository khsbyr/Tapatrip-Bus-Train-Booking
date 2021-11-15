import React, { useState } from 'react';
import { Listbox } from '@headlessui/react';
import s from './selectLanguage.module.scss';
import { CheckIcon } from '@heroicons/react/solid';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

const languages = [
  { name: 'Mongolia', src: '/assets/flagMongolia.png' },
  { name: 'English(UK)', src: '/assets/flagEng.png' },
  { name: 'China', src: '/assets/flagChina.png' },
];
export default function selectLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isSelected, setIsSelected] = useState(false);
  const onClick = () => {
    setIsSelected(!isSelected);
  };
  const select = () => {
    setIsSelected(!isSelected);
  };
  return (
    <Listbox value={selectedLanguage} onChange={setSelectedLanguage}>
      <div className={s.body} onClick={onClick}>
        <Listbox.Button className={s.listboxButton}>
          <img
            className="rounded"
            src={selectedLanguage.src}
            width="36"
            height="18"
          />
          {isSelected ? (
            <ChevronUpIcon className={s.icon} />
          ) : (
            <ChevronDownIcon className={s.icon} />
          )}
        </Listbox.Button>
        <Listbox.Options onClick={select} className={s.listboxOption}>
          {languages.map((language, id) => (
            <Listbox.Option
              key={id}
              className={({ active }) =>
                `${active ? 'text-blue-500 ' : ''}relative py-2 pl-10 pr-4`
              }
              value={language}
            >
              {({ selected }) => (
                <span className={s.options}>
                  {language.name}
                  <p className="mt-0.5">
                    <img
                      className="rounded"
                      src={language.src}
                      height="18"
                      width="36"
                    />
                  </p>
                  {selected ? (
                    <span className={s.checkIcon}>
                      <CheckIcon className="w-5 h-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </span>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
