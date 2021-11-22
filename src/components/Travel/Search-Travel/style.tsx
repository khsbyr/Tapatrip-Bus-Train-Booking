import styled from 'styled-components';

const ContentWrapper = styled.div`
  .carouselImage {
    border-radius: 12px;
  }
  .ant-tabs-top > .ant-tabs-nav::before,
  .ant-tabs-top > div > .ant-tabs-nav::before {
    border: none !important;
    background-color: red;
  }

  .ant-tabs-tab {
    color: #8ab1d5 !important;
    font-weight: 500 !important;
    .tab-title {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      svg {
        rect,
        circle,
        path {
          fill: #8ab1d4;
        }
      }
    }
  }

  .ant-tabs-tab-active {
    .tab-title {
      svg {
        rect,
        circle,
        path {
          fill: #177ad6;
        }
      }
      .text {
        color: #177ad6;
      }
    }
  }
`;

export default ContentWrapper;
