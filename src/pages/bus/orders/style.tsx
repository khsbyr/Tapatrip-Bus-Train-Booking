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
    margin-left: -4px;
    margin-top: -10px;
    width: 10px;
    height: 10px;
  }
  @media only screen and (max-width: 576px) {
    .ant-steps-navigation .ant-steps-item::after {
      border: 2px solid white;
      border-bottom: none;
      border-left: none;
      margin-left: -10px;
      margin-top: -20px;
    }
  }
  @media only screen and (min-width: 768px) {
    .ant-steps-item-title {
      font-size: 16px;
    }
  }
  .ant-steps-item-wait
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title {
    color: #8ab1d5 !important;
  }
`;

export default ContentWrapper;
