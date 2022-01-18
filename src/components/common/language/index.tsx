import React, { useState } from 'react';
import { Listbox } from '@headlessui/react';
import s from './language.module.scss';
import { CheckIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import { useUI } from '@context/uiContext';

const languages = [
  { name: 'Mongolia', src: '/assets/flagMongolia.png', route: 'mn' },
  { name: 'English(UK)', src: '/assets/flagEng.png', route: 'en' },
  { name: 'China', src: '/assets/flagChina.png', route: 'zh' },
];
export default function Language(props) {
  const { openLanguage, closeLanguage, displayLanguage } = useUI();
  const router = useRouter();
  const { locale } = router;
  const index = languages.findIndex(item => item.route === locale);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[index]);

  const changeLanguage = value => {
    const locale = value.route;
    const index = languages.findIndex(item => item.route === locale);
    setSelectedLanguage(languages[index]);
    AuthTokenStorageService.setLocale(languages[index].route);
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <Listbox value={selectedLanguage} onChange={changeLanguage}>
      <div
        className={s.body}
        onClick={() => (displayLanguage ? closeLanguage() : openLanguage())}
      >
        <Listbox.Button className={s.listboxButton}>
          <img className="rounded-sm" src={selectedLanguage.src} width="34" />
          {displayLanguage ? (
            <ChevronDownIcon
              className={`${props.isBlack ? s.icon1 : s.icon} `}
            />
          ) : (
            <ChevronUpIcon className={`${props.isBlack ? s.icon1 : s.icon} `} />
          )}
        </Listbox.Button>
        <Listbox.Options
          onClick={() => (displayLanguage ? closeLanguage() : openLanguage())}
          className={s.listboxOption}
        >
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
                    <img className="rounded-sm" src={language.src} width="32" />
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
