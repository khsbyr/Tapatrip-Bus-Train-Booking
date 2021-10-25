import styled from 'styled-components';

const ContentWrapper = styled.div`
  .ant-tabs-top > .ant-tabs-nav::before,
  .ant-tabs-top > div > .ant-tabs-nav::before {
    border: none !important;
  }

  .ant-tabs-tab {
    color: #8ab1d5 !important;
    font-weight: 500 !important;
  }
`;

export default ContentWrapper;
