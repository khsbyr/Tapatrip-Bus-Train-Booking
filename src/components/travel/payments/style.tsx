import styled from 'styled-components';

const PaymentWrapper = styled.div`
  .ant-select .ant-select-selector {
    height: 36px;
    display: inline-flex;
  }
  .translate {
    margin-top: 20px;
    .data-label {
      font-size: 14px;
      font-weight: 500;
    }

    .data-subLabel {
      font-size: 10px;
      margin-left: 5px;
      color: #5aa0e1;
    }

    .data-value {
      margin-top: 10px;
      border-radius: 3px;
      padding: 5px 15px 5px 15px;
      font-size: 16px;
    }
  }
`;
export default PaymentWrapper;
