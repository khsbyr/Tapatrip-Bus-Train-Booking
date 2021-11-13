import { Carousel } from 'antd';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import ContentWrapper from '../Search/style';

interface Props {
  navbarData?: any;
}

const SearchTravel: FC<Props> = ({ navbarData }) => {
  const { asPath, pathname } = useRouter();
  return (
    <ContentWrapper>
      <div className="px-2">
        <Carousel className={`md:px-2`} arrows dots={true}>
          <img className="carouselImage" src="/assets/Travel1.png" />
          <img className="carouselImage" src="/assets/Travel1.png" />
        </Carousel>
      </div>
    </ContentWrapper>
  );
};

export default SearchTravel;
