import {
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
} from '@heroicons/react/solid';
import React, { useState } from 'react';
import { Steps } from 'antd';
import style from './Card.module.scss';
import Link from 'next/link';

const { Step } = Steps;

export default function Card({ datas }) {
  const [isActive, setIsActive] = useState(false);
  const handleOrder = async () => {
    alert(datas.node.id);
  };
  return (
    <div className="px-2">
      <div className="max-w-7xl mx-auto">
        <div className={style.card}>
          <div className="px-20 space-y-4">
            <h1 className={style.leaveTitle}>{datas.node.leaveDate}</h1>
            <div className="flex justify-between ">
              <div className="space-y-2">
                <div className="flex space-x-4">
                  <h1 className={style.startTitle}>{datas.node.leaveDate}</h1>
                  <ArrowRightIcon className="h-7 text-direction" />
                  <h1 className={style.startTitle}>{datas.node.leaveDate}</h1>
                </div>
                <h1 className={style.timeText}>{datas.node.leaveTime}</h1>
              </div>
              <div className="space-y-2">
                <h1 className={style.priceText}>
                  {datas.node.adultTicket} MNT
                </h1>
                <h1 className="flex items-center">
                  <UserIcon className="w-4 h-4 " /> 1 зорчигчийн үнэ
                </h1>
              </div>
            </div>

            <div className={style.rowDirection}>
              <div>
                <h1 className="text-cardDate font-semibold text-md">
                  {datas.node.directionName}
                </h1>
              </div>
              <div className="flex items-center space-x-8">
                <button
                  className="text-direction font-medium flex"
                  onClick={() => setIsActive(!isActive)}
                >
                  Чиглэлийн мэдээлэл
                  {isActive ? (
                    <ChevronUpIcon className="w-6 h-6" />
                  ) : (
                    <ChevronDownIcon className="w-6 h-6" />
                  )}
                </button>
                <Link href={`/bus/orders/${datas.node.id}`}>
                  <button className={style.orderButton}>Захиалах</button>
                </Link>
              </div>
            </div>
          </div>
          <div className={style.rightRound}></div>
          <div className={style.leftRound}></div>
          <div className={style.line} style={{ top: '135px' }}></div>
          <div className={`${!isActive ? 'hidden' : 'block'}`}>
            <div className="border border-dashed "></div>
            <div className="px-20 py-5">
              <Steps progressDot direction="vertical">
                <Step
                  title={datas.node.leaveDate}
                  description={
                    datas.node.startStopName +
                    '-' +
                    datas.node.locationEnd.locationStop.location.name
                  }
                />
                <Step
                  title={datas.node.leaveDate}
                  description={
                    datas.node.locationEnd.locationEnd.name +
                    '-' +
                    datas.node.locationEnd.locationEnd.location.name
                  }
                />
              </Steps>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
