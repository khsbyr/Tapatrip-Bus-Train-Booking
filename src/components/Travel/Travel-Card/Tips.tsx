import React, { FC, useState } from 'react';
import { Carousel } from 'antd';
import ContentWrapper from './style';
import TravelTipsModal from '@components/travel/TravelTipsModal';
interface Props {
  title: string;
  image: string;
  description: string;
}

const Tips: FC<Props> = ({ title, description, image }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="bg-white h-auto rounded-lg shadow-xl ">
        <img
          className="object-contain md:object-scale-down rounded-t-lg"
          src={image}
        />
        <div className="items-center my-3 mx-6 flex">
          <div
            className="font-normal text-sm"
            dangerouslySetInnerHTML={{
              __html: description.substring(0, 200),
            }}
          />
        </div>
        <div className="m-3 flow-root">
          <button
            className="bg-button text-white font-normal py-2 px-4 rounded-lg h-10 w-40 float-right align-middle"
            onClick={() => showModal()}
          >
            Дэлгэрэнгүй
          </button>
        </div>
      </div>
      {visible && (
        <TravelTipsModal
          title={title}
          description={description}
          image={image}
          isModalVisible={visible}
          close={closeModal}
        />
      )}
    </>
  );
};

export default Tips;
