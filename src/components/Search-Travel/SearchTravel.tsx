import Autocomplete from '@components/ui/Autocomplete/Autocomplete';
import { DatePicker, Carousel } from 'antd';
import React, { FC } from 'react';
import ContentWrapper from '../Search/style';
import { useRouter } from 'next/router';

interface Props {
  navbarData?: any;
}

const SearchTravel: FC<Props> = ({ navbarData }) => {
  const { asPath, pathname } = useRouter();
  return (
    <ContentWrapper>
      <div className="px-2">
        <form
          className={`px-2 py-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 md:px-2`}
        >
          <Autocomplete
            data={navbarData.generalList}
            placeholder="Хаашаа: Байршил, Хотын нэр"
          />

          <Autocomplete
            data={navbarData.generalList}
            placeholder="Аяллын төрөл"
          />
          <button className="bg-button text-white font-bold py-2 px-4 rounded-2xl h-14 w-full">
            Хайх
          </button>
        </form>
        <Carousel className={`md:px-2`} arrows dots={true}>
          <img className="carouselImage" src="/assets/Travel1.png" />
          <img className="carouselImage" src="/assets/Travel1.png" />
        </Carousel>
      </div>
    </ContentWrapper>
  );
};

export default SearchTravel;
