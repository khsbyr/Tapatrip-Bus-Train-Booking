import React, { FC, useState, useEffect } from 'react';
import { Col, Row, Select, message } from 'antd';
import PaymentWrapper from './style';
import { ClipboardCopyIcon } from '@heroicons/react/solid';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import CurrencyFormat from 'react-currency-format';
interface Props {
  corporate?: any;
  refNumber: string;
  totalPrice: number;
}
const { Option } = Select;
const Corporate: FC<Props> = ({ corporate, refNumber, totalPrice }) => {
  const [selectedCorprate, setSelectedCorprate] = useState({});
  useEffect(() => {
    setSelectedCorprate(corporate[0]);
  }, []);

  const onChangeCorprate = value => {
    const a = corporate.filter(item => {
      return item.name === value;
    });

    let data = [];
    if (a.length > 0) {
      data = a[0];
    }

    setSelectedCorprate(data);
  };

  const selectData = corporate;
  const items = selectedCorprate ? selectedCorprate : selectData[0];
  console.log(selectData);
  return (
    <PaymentWrapper>
      <div className="grid-cols-2">
        <div className="col-span-2">
          <h2 className="font-bold text-base my-2">Choose a bank</h2>
          <Select
            defaultValue={selectData ? selectData[0].name : ''}
            className="w-full pl-1 mt-1"
            onChange={onChangeCorprate}
          >
            {selectData
              ? selectData.map((item, index) => {
                  return (
                    <Option value={item.name} key={index}>
                      <div className="inline-flex">
                        <img
                          src={item.logo}
                          alt="icon"
                          width="25"
                          className={'m-1'}
                        />
                        {item.name}
                      </div>
                    </Option>
                  );
                })
              : null}
          </Select>
        </div>
        <div className="translate">
          <div className="data-label">
            {'order_number'}
            <span className="data-subLabel">
              {
                'there_must_be_include_the_following_order_number_in_the_transaction_value'
              }
            </span>
          </div>
          <div className="data-value border-2">
            <Row justify="space-between" align="middle">
              <Col>{refNumber}</Col>
              <Col>
                {/* <CopyToClipboard
                text={refNumber}
                onCopy={() => message.success('Copied')}
              >
                <ClipboardCopyIcon
                  style={{
                    color: '#177ad6',
                    marginTop: '50%',
                    cursor: 'pointer',
                  }}
                />
              </CopyToClipboard> */}
              </Col>
            </Row>
          </div>
        </div>
        <Row justify="start" className="translate" gutter={[16, 0]}>
          <Col span={12}>
            <div className="data-label">{'Transfer_amount'}</div>
            <div className="data-value border-2">
              <CurrencyFormat
                value={totalPrice}
                displayType={'text'}
                thousandSeparator={true}
                suffix={` ₮`}
              />
            </div>
            <div className="data-label" style={{ marginTop: '20px' }}>
              {'bank'}
            </div>
            <div className="data-value border-2">{items.name}</div>
          </Col>
          <Col span={12}>
            <div className="data-label">{'Recipient'}</div>
            <div className="data-value border-2">{items.company_name}</div>
            <div className="data-label" style={{ marginTop: '20px' }}>
              {'bank_account'}
            </div>
            <div className="data-value border-2">{items.account_number}</div>
          </Col>
        </Row>
      </div>
    </PaymentWrapper>
  );
};

export default Corporate;
