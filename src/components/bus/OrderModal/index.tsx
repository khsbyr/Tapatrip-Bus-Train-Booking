import { useMutation } from '@apollo/client';
import { BUS_BOOKING_CHECK } from '@graphql/mutation';
import { unixDate } from '@helpers/array-format';
import { PATTERN_PHONE } from '@helpers/constantValidation';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { Form, Input, Modal } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import ContentWrapper from './style';
import style from './style.module.scss';

export default function OrderModal(props) {
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [loading, setLoading] = useState('');

  const [busBookingCheck, { data }] = useMutation(BUS_BOOKING_CHECK);

  const datas = data && data.busBookingCheck.booking;
  const unixDates = unixDate(datas?.schedule);

  const format = n =>
    `0${(n / 60) ^ 0}`.slice(-2) +
    ' цаг ' +
    ('0' + (n % 60)).slice(-2) +
    ' минут';

  const onFinish = async values => {
    setLoading('true');
    try {
      const { data } = await busBookingCheck({
        variables: {
          refNumber: values.refNumber,
          contactPhone: values.phone,
        },
      });
      setIsActive(true);
      setLoading('false');
    } catch (e) {
      setIsActive(false);
      Modal.error({
        title: 'Алдаа',
        content: 'Таны захиалга олдсонгүй',
      });
      setLoading('false');
    }
  };

  return (
    <Modal
      visible={props.isModalVisible}
      onCancel={() => props.close()}
      width={700}
      footer={null}
      title="Захиалгын мэдээлэл"
    >
      <ContentWrapper>
        <div className="sm:pt-3 pb-2 sm:pb-5 space-y-8">
          <Form name="busBookingCheck" onFinish={onFinish}>
            <div className="flex justify-center">
              <div className="w-full sm:w-4/5 space-y-5">
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
                    <Input placeholder="Захиалгын дугаар оруулна уу" />
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
                    <Input placeholder=" Утасны дугаараа оруулна уу" />
                  </Form.Item>
                </div>

                <button
                  className="text-white bg-blue-500 text-base w-full font-medium py-3 rounded-lg hover:bg-blue-600 focus:bg-blue-700"
                  type="submit"
                >
                  {loading === 'true' ? (
                    <div className={style.ldsDualRing}></div>
                  ) : (
                    'Шалгах'
                  )}
                </button>
              </div>
            </div>
          </Form>
          <div className={`${!isActive || data === undefined ? 'hidden' : ''}`}>
            <div className="max-w-7xl mx-auto mt-5">
              <div className={style.card}>
                <div className="px-3 md:px-6 space-y-2 lg:space-y-4">
                  <h1 className={style.location}>
                    {datas?.schedule?.locationEnd?.locationStop?.location?.name}{' '}
                    /{datas?.schedule?.startStopName}/
                    <p className="mr-3 text-red-400">-аас </p>
                    {
                      datas?.schedule?.locationEnd?.locationEnd?.location?.name
                    }{' '}
                    /{datas?.schedule?.endStopName}/
                  </h1>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-between pt-4">
                    <h1 className="text-cardDate font-medium">
                      Хөдлөх огноо: {datas?.schedule?.leaveDate}{' '}
                      {datas?.schedule?.leaveTime}
                    </h1>
                    <h1 className="hidden sm:block">-</h1>
                    <h1 className="sm:hidden p-1">&darr;</h1>
                    <h1 className="text-cardDate text-center -mt-2">
                      {datas?.schedule?.locationEnd?.distance}км
                      <br />
                      {format(datas?.schedule?.locationEnd?.estimatedDuration)}
                    </h1>
                    <h1 className="hidden sm:block">-</h1>
                    <h1 className="sm:hidden p-1">&#8593;</h1>
                    <h1 className="text-cardDate font-medium">
                      Хүрэх огноо: {moment.unix(unixDates).format('YYYY-MM-DD')}{' '}
                      {moment.unix(unixDates).format('HH:mm')}{' '}
                    </h1>
                  </div>

                  <div className="flex justify-between flex-wrap">
                    <h1 className="text-cardDate ">
                      Захиалга хийсэн:{' '}
                      {moment(datas?.createdAt).format('YYYY-MM-DD HH:mm')}
                    </h1>

                    <h1 className="font-medium text-cardDate text-center">
                      Суудлын дугаар: {datas?.pax?.map(z => z.seat).join(', ')}
                    </h1>
                  </div>
                  <div className="flex items-center pt-4 sm:pt-4">
                    <div className={style.rightRound}></div>
                    <div className="bg-white w-full h-0.5 "></div>
                    <div className={style.leftRound}></div>
                  </div>
                  <div className={style.rowDirection}>
                    <div className="flex">
                      <h1 className="text-cardDate font-semibold text-xs md:text-sm mr-1">
                        Төлбөр:
                      </h1>
                      <h1
                        className={`font-semibold text-xs md:text-sm ${
                          datas?.status === 7
                            ? 'text-red-400'
                            : datas?.status === 4
                            ? 'text-green-400'
                            : 'text-cardDate'
                        }`}
                      >
                        {datas?.statusName}
                      </h1>
                    </div>
                    <div className="flex items-center space-x-8">
                      <button
                        className="text-direction font-medium flex text-xs md:text-sm"
                        onClick={() => setIsActive1(!isActive1)}
                      >
                        Автобусны мэдээлэл
                        {isActive1 ? (
                          <ChevronUpIcon className="md:w-6 md:h-6 w-5 h-5" />
                        ) : (
                          <ChevronDownIcon className="md:w-6 md:h-6 w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className={`${!isActive1 ? 'hidden' : 'block'}`}>
                  <div className="border border-dashed "></div>
                  <div className="px-3 md:px-6 flex justify-around py-5">
                    <div className="space-y-3">
                      <h1 className="text-cardDate font-medium text-xs sm:text-sm">
                        ААН: {datas?.schedule?.bus?.transporter.name}
                      </h1>
                      <h1 className="text-cardDate font-medium text-xs sm:text-sm">
                        Марк, загвар: {datas?.schedule?.bus?.modelName}
                      </h1>
                    </div>
                    <div className="space-y-3">
                      <h1 className="text-cardDate font-medium text-xs sm:text-sm">
                        Улсын дугаар: {datas?.schedule?.bus?.plateNumber}
                      </h1>
                      <h1 className="text-cardDate font-medium text-xs sm:text-sm">
                        Жолоочийн утасны дугаар: {datas?.schedule?.driverPhone}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </Modal>
  );
}
