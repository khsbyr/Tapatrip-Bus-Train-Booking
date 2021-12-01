import styled from 'styled-components';

const ContentWrapper = styled.div`
  .ant-radio-checked .ant-radio-inner {
    border-color: #8ab1d5 !important;
  }
  .ant-statistic-content-value {
    color: white;
    font-size: 22px;
    font-weight: 500;
  }
  .ant-radio-inner::after {
    background-color: #0a3761 !important;
  }
  /* .ant-radio-inner {
    visibility: hidden;
  } */
`;

export default ContentWrapper;
