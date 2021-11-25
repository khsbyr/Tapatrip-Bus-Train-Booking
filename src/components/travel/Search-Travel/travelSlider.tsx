import { Carousel } from 'antd';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import ContentWrapper from './style';

interface Props {
  bannerItems?: any;
}

const TravelSlider: FC<Props> = ({ bannerItems }) => {
  const { asPath, pathname } = useRouter();

  return (
    <ContentWrapper>
      <div className="border">
        <Carousel
          arrows
          dots={true}
          slidesToShow={1}
          draggable={true}
          swipeToSlide={true}
          touchThreshold={50}
          focusOnSelect={true}
        >
          {bannerItems.result.map(bannerItem => (
            <img
              className={`${bannerItem.title} max-h-96`}
              src={`${bannerItem.web_picture}`}
            />
          ))}
        </Carousel>
      </div>
    </ContentWrapper>
  );
};

export default TravelSlider;
