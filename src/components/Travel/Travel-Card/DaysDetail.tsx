import React, { FC, useState } from 'react';
import { Timeline } from 'antd';
import {
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
  CheckCircleIcon,
  LocationMarkerIcon,
  MapIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/solid';
interface Props {
  isLast: boolean;
  title: string;
  image: string;
  description: string;
}
const DaysDetail: FC<Props> = ({ isLast, title, image, description }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <Timeline.Item
        dot={
          isLast ? (
            <LocationMarkerIcon
              className="w-6 h-6"
              fill="rgba(241, 88, 60,1)"
            />
          ) : (
            <CheckCircleIcon className="w-6 h-6" />
          )
        }
      >
        <div className="border rounded-lg px-4 py-2 cursor-pointer">
          <div
            className=" flex justify-between"
            onClick={() => setIsActive(!isActive)}
          >
            <div className="inline-flex items-center">
              <div className="items-center">
                <h2 className="font-bold text-center">{title}</h2>
              </div>
            </div>
            {isActive ? (
              <ChevronUpIcon className="h-10" />
            ) : (
              <ChevronDownIcon className="h-10" />
            )}
          </div>
          <div className={`${!isActive ? 'hidden' : 'block'} flex`}>
            <img className="max-h-28 mr-2 mt-2 rounded-md" src={`${image}`} />
            <div
              className={'text-justify mr-2'}
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </div>
        </div>
      </Timeline.Item>
    </>
  );
};

export default DaysDetail;
