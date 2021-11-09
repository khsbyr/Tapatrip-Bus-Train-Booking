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
    display: none !important;
  }

  .ant-steps-navigation .ant-steps-item::after {
    border: 2px solid white !important;
    border-bottom: none !important;
    border-left: none !important;
    margin-left: -4px !important;
    margin-top: -10px !important;
    width: 10px !important;
    height: 10px !important;
  }
  @media only screen and (max-width: 576px) {
    .ant-steps-navigation .ant-steps-item::after {
      border: 2px solid white !important;
      border-bottom: none !important;
      border-left: none !important;
      margin-left: -10px !important;
      margin-top: -20px !important;
    }
  }
  @media only screen and (min-width: 768px) {
    .ant-steps-item-title {
      font-size: 16px !important;
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
