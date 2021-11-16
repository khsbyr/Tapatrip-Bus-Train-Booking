import { Form, Input, Modal } from 'antd';
import React, { useState, FC } from 'react';
import TravelList from '@data/getTravelList[1].json';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { PATTERN_PHONE } from '@helpers/constantValidation';
import { useMutation } from '@apollo/client';
import { BUS_BOOKING_CHECK } from '@graphql/mutation';
import moment from 'moment';

interface Props {
  isModalVisible?: any;
  close?: any;
}

export default function OrderModal(props) {
  const [isActive, setIsActive] = useState(false);

  const [busBookingCheck, { data }] = useMutation(BUS_BOOKING_CHECK);
  // console.log(data);

  const onFinish = async values => {
    try {
      const { data } = await busBookingCheck({
        variables: {
          refNumber: values.refNumber,
          contactPhone: values.phone,
        },
      });
      setIsActive(true);
    } catch (e) {
      setIsActive(false);
      Modal.error({
        title: 'Алдаа',
        content: 'Таны захиалга олдсонгүй',
      });
    }
  };
  const datas = data && data.busBookingCheck.booking;

  console.log(datas);
  return (
    <div>
      <Modal
        visible={props.isModalVisible}
        onCancel={() => props.close()}
        width={650}
        footer={null}
      >
        <div className="sm:pt-3 pb-2 sm:pb-5 space-y-8">
          <h1 className="text-cardDate text-xl font-bold border-b-2">
            Захиалгын мэдээлэл шалгах
          </h1>
          <Form name="busBookingCheck" onFinish={onFinish}>
            <div className="flex justify-center">
              <div className="sm:w-2/3 space-y-5">
                <div className="space-y-2">
                  <label
                    className="text-cardDate text-base pl-2 font-medium"
                    htmlFor=""
                  >
                    Захиалгын дугаар
                  </label>
                  <Form.Item
                    name="refNumber"
                    rules={[
                      {
                        required: true,
                        message: 'Захиалгын дугаараа заавал бөглөнө үү!',
                      },
                    ]}
                  >
                    <Input
                      className="rounded-lg bg-bg border-0 p-2 py-3 text-cardDate text-base"
                      placeholder="Захиалгын дугаар оруулна уу"
                    />
                  </Form.Item>
                </div>
                <div className="space-y-2">
                  <label
                    className="text-cardDate text-base pl-2 font-medium"
                    htmlFor=""
                  >
                    Утасны дугаар
                  </label>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        pattern: PATTERN_PHONE,
                        message: 'Утасны дугаар буруу байна',
                      },
                      {
                        required: true,
                        message: 'Утасны дугаараа заавал бөглөнө үү!',
                      },
                    ]}
                  >
                    <Input
                      className="rounded-lg bg-bg border-0 p-2 py-3 text-cardDate text-base"
                      placeholder=" Утасны дугаараа оруулна уу"
                    />
                  </Form.Item>
                </div>

                <button
                  className="text-white bg-blue-500 text-base w-full font-medium py-3 rounded-lg hover:bg-blue-600 focus:bg-blue-700"
                  type="submit"
                >
                  Шалгах
                </button>
              </div>
            </div>
          </Form>
          <div
            className={`${
              !isActive ? 'hidden' : 'block grid grid-cols-1 sm:grid-cols-2'
            }`}
          >
            <div className="text-base font-medium text-cardDate">
              <h1 className="flex justify-center text-cardDate text-xl font-bold pb-4 border-b-2">
                Захиалгын мэдээлэл
              </h1>
              <div className="p-2 sm:border-r-2 space-y-2">
                <p className="space-y-2">
                  <p className="flex flex-wrap font-bold">
                    {datas?.schedule?.locationEnd?.locationStop?.location?.name}
                    , {datas?.schedule?.startStopName}
                    <h1 className="text-red-400 px-2">-аас </h1>
                    {datas?.schedule?.locationEnd?.locationEnd?.location?.name}
                    {', '}
                    {datas?.schedule?.endStopName}
                  </p>
                  <p className="flex justify-between">
                    Хөдлөх огноо:{' '}
                    <h1 className="font-bold text-cardDate">
                      {datas?.schedule?.leaveDate}
                    </h1>
                    {/* <ArrowRightIcon className="px-4 sm:px-10 h-7 text-direction" /> */}
                    <h1 className="font-bold text-cardDate">
                      {datas?.schedule?.leaveTime}
                    </h1>
                  </p>
                </p>

                <p className="text-base space-y-2">
                  <p className="flex">
                    Захиалга хийсэн огноо:
                    <h1 className="px-2 font-bold text-base text-cardDate">
                      {moment(datas?.createdAt).format('YYYY-MM-DD')}
                    </h1>
                  </p>
                  <p className="flex">
                    Суудлын дугаар:
                    <h1 className="px-2 font-bold text-base text-cardDate">
                      {datas?.status}
                    </h1>
                  </p>
                  <p className="flex">
                    Төлбөр төлөгдсөн эсэх:{' '}
                    <h1 className="px-2 font-bold text-base text-cardDate">
                      {datas?.statusName}
                    </h1>
                  </p>
                </p>
              </div>
            </div>
            <div>
              <h1 className="flex justify-center text-cardDate text-xl font-bold pb-4 border-b-2">
                Автобусны мэдээлэл
              </h1>
              <div className="sm:pl-4 p-2 text-base text-cardDate font-medium">
                <ul className="w-full space-y-2">
                  <li className="flex">
                    ААН:
                    <p className="font-bold pl-2">
                      {datas?.schedule?.bus?.transporter.name}
                    </p>
                  </li>
                  <li className="flex">
                    Марк загвар:
                    <p className="font-bold pl-2">
                      {datas?.schedule?.bus?.modelName}
                    </p>
                  </li>
                  <li className="flex">
                    Улсын дугаар:
                    <p className="font-bold pl-2">
                      {datas?.schedule?.bus?.plateNumber}
                    </p>
                  </li>
                  <li className="flex">
                    Утасны дугаар:
                    <p className="font-bold pl-2">
                      {datas?.schedule?.driverPhone}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
