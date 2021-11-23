import styled from 'styled-components';

const ContentWrapper = styled.div`
  margin-top: 0px;
  .ant-modal {
    width: 100%;
  }
  .ant-input {
    padding: 0.7rem;
    border: none;
    background-color: #f1f2f6;
    color: #0a3761;
    font-size: 1rem;
    border-radius: 0.5rem;
  }

  .ant-form-item-has-error .ant-input {
    background-color: #f1f2f6 !important;
  }
`;

export default ContentWrapper;
