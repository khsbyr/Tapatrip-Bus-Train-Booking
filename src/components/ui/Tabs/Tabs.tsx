import { BookOpenIcon } from '@heroicons/react/solid';
import React, { FC } from 'react';

interface Props {
  navbarData: any;
}

const Tabs: FC<Props> = ({ navbarData }) => {
  const [openTab, setOpenTab] = React.useState('Автобус');

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            {navbarData.generalList.map(z => (
              <li className="-mb-px mr-2 last:mr-0 flex-auto flex items-center justify-center ">
                <a
                  className={
                    'text-xs font-bold uppercase px-5 py-3  block leading-normal ' +
                    (openTab === z.text
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : 'text-direction bg-white')
                  }
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(z.text);
                  }}
                  data-toggle="tab"
                  href={z.route}
                  role="tablist"
                >
                  {/* <img
                    src={'/assets/plane-solid.svg'}
                    className="text-blue-300"
                  /> */}
                  <BookOpenIcon className="w-10 h-10 ml-2" />
                  {z.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Tabs;
