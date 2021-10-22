import { Steps, Button, message } from 'antd';
import s from './style/about.module.scss';
import React from 'react';
import { Checkbox } from 'antd';
import travelData from '@data/getTravelData.json';
import SelectSeats from '@components/SelectSeats';
import PassengerInfo from '@components/PassengerInfo';
import Payments from '@components/Payments';
import { ArrowRightOutlined, CaretRightOutlined } from '@ant-design/icons';

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
      <div className={s.steps}>
        <Steps current={current} onChange={onChange} size="small">
          {steps.map(item => (
            <Step
              key={item.title}
              icon={<CaretRightOutlined />}
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
                  <div className="p-2">
                    {/* // -------------------Components_0---------------------------// */}
                    <button className={s.button} onClick={() => next()}>
                      {steps[current].button}
                    </button>
                  </div>
                )}
                {current === 1 && (
                  <div className="p-2">
                    {/* // -------------------Components_1---------------------------// */}

                    <button className={s.button} onClick={() => next()}>
                      {steps[current].button}
                    </button>
                  </div>
                )}
                {current === steps.length - 1 && (
                  <div className="p-2">
                    {/* // -------------------Components_2---------------------------// */}

                    <button className={s.button}>
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
