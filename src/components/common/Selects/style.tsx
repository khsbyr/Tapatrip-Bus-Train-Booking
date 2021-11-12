import styled from 'styled-components';

const ContentWrapper = styled.div`
  .ant-select-selector {
    background-color: transparent !important;
    border: none !important;
  }
  .ant-select-selector:focus {
    border: 2px solid green !important;
  }
  .ant-select-arrow {
    color: white !important;
    margin-top: -8px;
  }
`;

export default ContentWrapper;
