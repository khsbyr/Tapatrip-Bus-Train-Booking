import styled from 'styled-components';

const ContentWrapper = styled.div`
  .ant-picker {
    border: none !important;
    background-color: #f1f2f6 !important;
    height: 3.5rem !important;
    border-radius: 0.6rem !important;
  }
  .ant-picker-input > input::placeholder {
    color: #8ab1d5;
  }

  .ant-picker-input > input {
    color: #8ab1d5 !important;
  }

  .ant-picker-suffix {
    color: #8ab1d5 !important;
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
