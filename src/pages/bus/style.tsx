import styled from 'styled-components';

const ContentWrapper = styled.div`
  .anticon {
    display: none !important;
  }

  .ant-steps-item-title {
    color: white !important;
    font-weight: 600 !important;
  }

  .ant-steps-navigation .ant-steps-item::before {
    background-color: white !important;
    display: none;
  }

  .ant-steps-navigation .ant-steps-item {
    margin-top: 3px;
  }

  .ant-steps-navigation .ant-steps-item::after {
    border: 2px solid white;
    border-bottom: none;
    border-left: none;
    content: '';
  }

  .ant-steps-item-wait
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title {
    color: #adadad !important;
  }
`;

export default ContentWrapper;
