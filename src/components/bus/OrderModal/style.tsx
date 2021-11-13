import styled from 'styled-components';

const ContentWrapper = styled.div`
  margin-top: 0px;
  .ant-modal {
    width: 100%;
  }
  .ant-select-selector {
    background-color: transparent !important;
    border: none !important;
  }
  .ant-select:focus {
    border: none !important;
  }
  .ant-input:hover {
    border-right: none;
  }
  .ant-input:focus {
    background-color: transparent;
  }
  .ant-modal-content {
    width: 10000;
  }
`;

export default ContentWrapper;
