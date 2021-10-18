import { Tab } from '@headlessui/react';
import React, { FC } from 'react';

interface Props {
  navbarData?: any;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Search: FC<Props> = ({ navbarData }) => {
  return (
    <div className="relative bg-white shadow-md max-w-7xl mx-auto rounded-lg md:-mt-32 h-auto mt-6">
      <div className="w-full max-w-7xl mx-auto px-2 py-4 sm:px-0">
        <Tab.Group defaultIndex={3}>
          <Tab.List className="flex justify-around">
            {navbarData.generalList.map(z => (
              <Tab
                disabled={z.text === 'Автобус' ? false : true}
                className={({ selected }) =>
                  classNames(
                    selected
                      ? 'border-b-2 border-selected p-3 text-selected'
                      : 'text-secondary hover:bg-white/[0.12] hover:text-selected'
                  )
                }
              >
                <img src={z.icon} className="mb-1" />
                {z.text}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel></Tab.Panel>
            <Tab.Panel></Tab.Panel>
            <Tab.Panel></Tab.Panel>
            <Tab.Panel>
              <img src="/assets/Map mongolia.png" className="mt-6 px-12" />
            </Tab.Panel>
            <Tab.Panel></Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Search;
