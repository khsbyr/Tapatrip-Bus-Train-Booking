import { Col, Row } from 'antd';
import React, { FC } from 'react';
import { CreditCardIcon } from '@heroicons/react/outline';
// import IconsWrapper from './Banks.style';
interface Props {
  data?: any;
  callback: (arg?: any) => void;
  spaceBetween: boolean;
}
const Banks: FC<Props> = ({ data, callback, spaceBetween }) => {
  return (
    <div className="md:col-span-1 grid grid-cols-2 gap-2">
      {data &&
        data.map((item, index) => {
          return (
            <div
              key={index}
              style={{ border: '1px solid #d9d9d9' }}
              className="col-span-1 p-4 cursor-pointer"
              onClick={
                item.name === 'HIPAY' ||
                item.name === 'XACBANK' ||
                item.name === 'QPAY' ||
                item.name === 'GOLOMT' ||
                item.name === 'TDB' ||
                item.name === 'STATEBANK'
                  ? () => callback(item)
                  : null
              }
            >
              <div className="flex justify-between items-center">
                <div className="inline-flex items-center">
                  <CreditCardIcon className="h-8" />
                  <div className="text-base mx-2">{item.name}</div>
                </div>
                <img
                  alt={`${item.name}`}
                  src={`${item.logo}`}
                  className={'h-8'}
                />
              </div>
            </div>
          );
        })}
    </div>
    // <IconsWrapper>
    // <Row justify={spaceBetween ? 'space-between' : 'start'}>
    //   {data &&
    //     data.map((item, index) => {
    //       return (
    //         <Col key={index} className="px-4 mx-2 my-2 border-2 items-center">
    //           <div
    //             className={'cursor-pointer'}
    //             onClick={
    //               item.name === 'HIPAY' ||
    //               item.name === 'XACBANK' ||
    //               item.name === 'QPAY' ||
    //               item.name === 'GOLOMT' ||
    //               item.name === 'TDB' ||
    //               item.name === 'STATEBANK'
    //                 ? () => callback(item)
    //                 : null
    //             }
    //           >
    //             <img alt={`${item.name}`} src={`${item.logo}`} width="51" />
    //             <span className="text">{item.name}</span>
    //           </div>
    //         </Col>
    //       );
    //     })}
    // </Row>
    // </IconsWrapper>
  );
};

export default Banks;
