import { Steps, Button, message } from 'antd';
import s from './style/about.module.scss';
import React from 'react';
import { Checkbox } from 'antd';
import travelData from '@data/getTravelData.json';
import SelectSeats from '@components/SelectSeats';
import PassengerInfo from '@components/PassengerInfo';
import Payments from '@components/Payments';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Step } = Steps;
export const getStaticProps = async () => {
  const res = travelData;

  return {
    props: { travelData: res },
  };
};

const AppSteps = travelData => {
  const steps = [
    {
      title: 'Суудал сонгох',
      content: <SelectSeats travelData={travelData} />,
      button: 'Зорчигчийн мэдээлэл оруулах',
    },
    {
      title: 'Зорчигчийн мэдээлэл',
      content: <PassengerInfo />,
      button: 'Төлбөр төлөх',
    },
    {
      title: 'Төлбөр төлөх',
      content: <Payments />,
      button: 'Дуусгах',
    },
  ];
  const [current, setCurrent] = React.useState(0);
  const onChange = current => {
    console.log('onChange:', current);
    setCurrent(current);
  };
  const next = () => {
    setCurrent(current + 1);
  };

  return (
    <>
      <div className={s.typography}>
        <Steps current={current} onChange={onChange}>
          {steps.map(item => (
            <Step
              key={item.title}
              title={item.title}
              className="text-xs text-white"
            />
          ))}
        </Steps>
      </div>

      <div className={s.box}>
        <div className={s.typography}>
          <div className="flex flex-wrap w-full">
            <div className="w-full md:w-3/5 lg:w-2/3">
              {steps[current].content}
            </div>
            <div className="w-full md:w-2/5 lg:w-1/3">
              <div className={s.right}>
                {current === 0 && (
                  <div className={s.selectedSeats}>
                    <div className={s.direct}>
                      <div className={s.direction}>
                        <p className="text-xs text-green-400 font-bold">
                          ХЯМД, ХУРДАН
                        </p>
                        <p className="flex text-xl font-bold md:text-xs lg:text-xl">
                          <p>10.19 8:25AM</p>{' '}
                          <ArrowRightOutlined className="flex items-center" />{' '}
                          <p>11.30PM</p>
                        </p>
                        <p className="text-xs">3цаг 20минут, 1 зогсолт</p>
                      </div>
                      <div className={s.direction1}>
                        <p className="font-bold">Улаанбаатар -с Дархан</p>
                        <p className="font-bold">Чиглэл</p>
                      </div>
                    </div>
                    <div className={s.order}>
                      <div className="flex grid grid-cols-2">
                        <p className="flex justify-start">Сонгогдсон суудал</p>
                        <p className="flex justify-end">1, 8</p>
                      </div>
                      <div className="flex grid grid-cols-2">
                        <p className="flex justify-start">Тасалбар(2том хүн)</p>
                        <p className="flex justify-end">15'000 ₮</p>
                      </div>
                      <div className="flex grid grid-cols-2 font-bold">
                        <p className="flex justify-start">Нийт үнэ</p>
                        <p className="flex justify-end">15'000 ₮</p>
                      </div>
                    </div>
                    <button className={s.button} onClick={() => next()}>
                      {steps[current].button}
                    </button>
                  </div>
                )}
                {current === 1 && (
                  <div className={s.selectedSeats}>
                    <div className={s.direct}>
                      <div className={s.direction}>
                        <p className="text-xs text-green-400 font-bold">
                          ХЯМД, ХУРДАН
                        </p>
                        <p className="flex text-xl font-bold">
                          <p>10.19 8:25AM</p>{' '}
                          <ArrowRightOutlined className="flex items-center" />{' '}
                          <p>11.30PM</p>
                        </p>
                        <p className="text-xs">3цаг 20минут, 1 зогсолт</p>
                      </div>
                      <div className={s.direction1}>
                        <p className="font-bold">Улаанбаатар -с Дархан</p>
                        <p className="font-bold">Чиглэл</p>
                      </div>
                    </div>
                    <div className={s.order}>
                      {/* <div className="flex grid grid-cols-2">
                        <p className="flex justify-start">Сонгогдсон суудал</p>
                        <p className="flex justify-end">1, 8</p>
                      </div> */}
                      <div className="flex grid grid-cols-2">
                        <p className="flex justify-start">Тасалбар(2том хүн)</p>
                        <p className="flex justify-end">15'000 ₮</p>
                      </div>
                      <div className="flex grid grid-cols-2 font-bold">
                        <p className="flex justify-start">Нийт үнэ</p>
                        <p className="flex justify-end">15'000 ₮</p>
                      </div>
                    </div>
                    <Checkbox className="font-normal text-blue-900">
                      <p>
                        Аялалын мэдээлэл болон бусад шинэчлэлийг имэйлээр
                        илгээнэ үү.
                      </p>
                    </Checkbox>
                    <button className={s.button} onClick={() => next()}>
                      {steps[current].button}
                    </button>
                  </div>
                )}
                {current === steps.length - 1 && (
                  <div className={s.selectedSeats}>
                    <div className={s.direct}>
                      <div className={s.direction}>
                        <p className="text-xs text-green-400 font-bold">
                          ХЯМД, ХУРДАН
                        </p>
                        <p className="flex text-xl font-bold md:text-xs lg:text-xl">
                          <p>10.19 8:25AM</p>{' '}
                          <ArrowRightOutlined className="flex items-center" />{' '}
                          <p>11.30PM</p>
                        </p>
                        <p className="text-xs">3цаг 20минут, 1 зогсолт</p>
                      </div>
                      <div className={s.direction1}>
                        <p className="font-bold">Улаанбаатар -с Дархан</p>
                        <p className="font-bold">Чиглэл</p>
                      </div>
                    </div>
                    <div className={s.order}>
                      {/* <div className="flex grid grid-cols-2">
                        <p className="flex justify-start">Сонгогдсон суудал</p>
                        <p className="flex justify-end">1, 8</p>
                      </div> */}
                      <div className="flex grid grid-cols-2">
                        <p className="flex justify-start">Тасалбар(2том хүн)</p>
                        <p className="flex justify-end">15'000 ₮</p>
                      </div>
                      <div className="flex grid grid-cols-2 font-bold">
                        <p className="flex justify-start">Нийт үнэ</p>
                        <p className="flex justify-end">15'000 ₮</p>
                      </div>
                    </div>
                    <button
                      className={s.button}
                      onClick={() => message.success('Processing complete!')}
                    >
                      {steps[current].button}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppSteps;
