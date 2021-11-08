import styled from 'styled-components';

const ContentWrapper = styled.div`
  /* .ant-select-selection-item {
    background-color: red;
    width: 20px;
  } */

  .ant-radio-checked .ant-radio-inner {
    border-color: #8ab1d5 !important;
    /* width: 20px;
    border-width: 2px;
    height: 20px; */
  }

  .ant-radio-inner::after {
    background-color: #0a3761 !important;
    /* width: 80%;
    height: 80%; */
    /* padding: 5.1px;
    display: flex;
    align-items: center; */
  }
`;

export default ContentWrapper;
