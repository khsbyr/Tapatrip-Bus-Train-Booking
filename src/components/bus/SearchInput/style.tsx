import styled from 'styled-components';

const ContentWrapper = styled.div`
  .ant-picker {
    border: none !important;
    background-color: #f1f2f6 !important;
    width: 100% !important;
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

  .ant-select {
    color: #177ad6 !important;
    width: 100% !important;
    height: 3.5rem !important;
    background-image: 'assets/svgIcons/stopLocation.svg' !important;
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
    margin-left: 30px !important;
  }

  .ant-select-selection-search {
    top: 12px !important;
    left: 40px !important;
  }

  .ant-select-selection-placeholder {
    color: #8ab1d5;
    margin-top: -1px !important;
    margin-left: 30px !important;
  }

  .ant-select-clear {
    background-color: transparent !important;
  }

  .ant-select-single.ant-select-sm:not(.ant-select-customize-input)
    .ant-select-selector::after,
  .ant-select-single.ant-select-sm:not(.ant-select-customize-input)
    .ant-select-selector
    .ant-select-selection-item,
  .ant-select-single.ant-select-sm:not(.ant-select-customize-input)
    .ant-select-selector
    .ant-select-selection-placeholder {
    padding-top: 19px;
  }
`;

export default ContentWrapper;
