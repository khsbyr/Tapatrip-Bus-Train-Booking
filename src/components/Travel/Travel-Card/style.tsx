import styled from 'styled-components';

const ContentWrapper = styled.div`
  .ant-tabs-top > .ant-tabs-nav::before,
  .ant-tabs-top > div > .ant-tabs-nav::before {
    border: none !important;
    background-color: #red;
  }

  .ant-tabs-tab {
    color: #8ab1d5 !important;
    font-weight: 500 !important;
  }
  .carouselImage {
    border-radius: 12px;
  }
`;

export default ContentWrapper;
