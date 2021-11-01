import styled from 'styled-components';

const ContentWrapper = styled.div`
  .ant-select-selector {
    background-color: transparent !important;
    border: none !important;
  }
  .ant-select:focus {
    border: none !important;
  }
  .ant-input:hover {
    /* background-color: black; */
    border-right: none;
  }
  .ant-input:focus {
    background-color: transparent;
  }
`;

export default ContentWrapper;
