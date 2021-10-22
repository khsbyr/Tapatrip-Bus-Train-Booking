import styled from 'styled-components';

const ContentWrapper = styled.div`
  width: 100%;
  .ant-select {
    width: 100% !important;
    height: 3.5rem !important;
  }

  .ant-select-selector {
    border: none !important;
    background-color: #f1f2f6 !important;
    height: 3.5rem !important;
    border-radius: 0.6rem !important;
    align-items: center !important;
  }

  .ant-select-selection-item {
    width: 100% !important;
    color: #8ab1d5 !important;
  }

  .ant-select-selection-search {
    top: 15px !important;
  }

  .ant-select-selection-placeholder {
    color: #8ab1d5;
  }

  .ant-select-clear {
    background-color: transparent !important;
  }
`;

export default ContentWrapper;
