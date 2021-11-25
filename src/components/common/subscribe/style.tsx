import styled from 'styled-components';

const ContentWrapper = styled.div`
  .ant-input {
    background-color: transparent !important;
    border: none;
  }
  .ant-input:focus,
  .ant-input-focused {
    border-color: transparent !important;
    outline: none !important;
    box-shadow: none;
  }
`;

export default ContentWrapper;
