import React, { FC } from 'react';
import { Carousel } from 'antd';
import ContentWrapper from './style';
interface Props {
  data?: any;
}

const Tips: FC<Props> = ({ data }) => {
  return (
    <div className="default-container">
      <h1
        className="font-bold text-2xl max-w-7xl mx-auto mt-6 px-6"
        style={{ color: '#0A3761' }}
      >
        Аялалын зөвлөмж
      </h1>
      <div className="px-2">
        <div className="grid grid-cols-1 gap-3 my-6 md:grid-cols-3 md:gap-8 lg:grid-cols-3 max-w-7xl mx-auto md:my-6 ">
          <div className="bg-white h-auto rounded-lg shadow-xl ">
            <img
              className="object-contain md:object-scale-down rounded-t-lg"
              src={`assets/Travel1.png`}
            />
            <div className="items-center my-3 mx-6 flex">
              <p className="font-normal text-sm">
                i know some people get overwhelmed by the idea of planning a
                trip by themselves. You feel like there's so much to think...
              </p>
            </div>
            <div className="m-3 flow-root">
              <button className="bg-button text-white font-normal py-2 px-4 rounded-lg h-10 w-40 float-right align-middle">
                Дэлгэрэнгүй
              </button>
            </div>
          </div>
          <div className="bg-white h-auto rounded-lg shadow-xl ">
            <img
              className="object-contain md:object-scale-down rounded-t-lg"
              src={`assets/Travel1.png`}
            />
            <div className="items-center my-3 mx-6 flex">
              <p className="font-normal text-sm">
                i know some people get overwhelmed by the idea of planning a
                trip by themselves. You feel like there's so much to think...
              </p>
            </div>
            <div className="m-3 flow-root">
              <button className="bg-button text-white font-normal py-2 px-4 rounded-lg h-10 w-40 float-right align-middle">
                Дэлгэрэнгүй
              </button>
            </div>
          </div>
          <div className="bg-white h-auto rounded-lg shadow-xl">
            <img
              className="object-contain md:object-scale-down rounded-t-lg"
              src={`assets/Travel1.png`}
            />
            <div className="items-center my-3 mx-6 flex">
              <p className="font-normal text-sm">
                i know some people get overwhelmed by the idea of planning a
                trip by themselves. You feel like there's so much to think...
              </p>
            </div>
            <div className="m-3 flow-root">
              <button className="bg-button text-white font-normal py-2 px-4 rounded-lg h-10 w-40 float-right align-middle">
                Дэлгэрэнгүй
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;
