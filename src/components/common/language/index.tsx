import React, { useState } from 'react';
import { Listbox } from '@headlessui/react';
import s from './language.module.scss';
import { CheckIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

const languages = [
  { name: 'Mongolia', src: '/assets/flagMongolia.png', route: 'mn' },
  { name: 'English(UK)', src: '/assets/flagEng.png', route: 'en' },
  { name: 'China', src: '/assets/flagChina.png', route: 'zh' },
];
export default function Language(props) {
  const router = useRouter();
  const { locale } = router;
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isSelected, setIsSelected] = useState(false);

  // console.log(locale);

  const onClick = () => {
    setIsSelected(!isSelected);
  };

  const select = () => {
    setIsSelected(!isSelected);
  };

  const changeLanguage = value => {
    // console.log(value);
    // const locale = value.route;
    // router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <Listbox value={selectedLanguage} onChange={setSelectedLanguage}>
      <div className={s.body} onClick={onClick}>
        <Listbox.Button className={s.listboxButton}>
          <img className="rounded" src={selectedLanguage.src} width="34" />
          {isSelected ? (
            <ChevronUpIcon className={`${props.isBlack ? s.icon1 : s.icon} `} />
          ) : (
            <ChevronDownIcon
              className={`${props.isBlack ? s.icon1 : s.icon} `}
            />
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
                    <img className="rounded" src={language.src} width="34" />
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
