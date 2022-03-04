import { useMutation } from '@apollo/client';
import { BUS_BOOKING_CHECK } from '@graphql/mutation';
import { unixDate } from '@helpers/array-format';
import { PATTERN_PHONE } from '@helpers/constantValidation';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { Form, Input, Modal } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import ContentWrapper from '@components/bus/orderModal/style';
import style from './orderModal.module.scss';
import { useTranslation } from 'next-i18next';
import { useUI } from '@context/uiContext';
import TrainService from '@services/train';

export default function OrderModalTrain(props) {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const { closeLoadingModal, openLoadingModal, displayLoadingModal } = useUI();
  const [datas, setDatas] = useState(Object);

  const format = n =>
    `0${(n / 60) ^ 0}`.slice(-2) +
    ' ' +
    t('orderHours') +
    ('0' + (n % 60)).slice(-2) +
    ' ' +
    t('orderMinutes');

  const onFinish = async values => {
    let params = `?ref_number=${values.refNumber}&phone_number=${values.phone}`;
    openLoadingModal();
    try {
      const res = await TrainService.orderCheck(params);
      if (res && res.status === 200) {
        setDatas(res.result);
      }
      setIsActive(true);
      closeLoadingModal();
    } catch (e) {
      setIsActive(false);
      Modal.error({
        title: t('errorOrderTitle'),
        content: t('errorOrderContent'),
      });
      closeLoadingModal();
    }
  };

  const getStatusName = status => {
    switch (status) {
      case 1:
        return 'Төлбөр хүлээж байгаа';
      case 2:
        return 'Төлөгдсөн';
      case 3:
        return 'Тийз бичигдсэж байна';
      case 4:
        return 'Захиалга Амжилттай';
      case 5:
        return 'Өдөр сольсон';
      case 6:
        return 'Цуцалсан';
      case 7:
        return 'Цуцлагдсан';
      case 8:
        return 'Буцаалт хийгдэж байгаа';
      case 9:
        return 'Буцаалт хийгдсэн';
      default:
        return '';
    }
  };

  const getStatusColor = status => {
    switch (status) {
      case 1:
        return 'bg-yellow-400';
      case 2:
        return 'bg-green-400';
      case 4:
        return 'bg-green-400';
      case 6:
        return 'bg-red-400';
      case 7:
        return 'bg-red-400';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <Modal
      visible={props.isModalVisible}
      onCancel={() => props.close()}
      width={700}
      footer={null}
      title={t('orderInformationTitle')}
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
                    {t('orderNumber')}
                  </label>
                  <Form.Item
                    name="refNumber"
                    rules={[
                      {
                        required: true,
                        message: t('warningOrderNumber'),
                      },
                    ]}
                  >
                    <Input placeholder={t('orderNumberPlaceholder')} />
                  </Form.Item>
                </div>
                <div className="space-y-2">
                  <label
                    className="text-cardDate text-base pl-2 font-medium"
                    htmlFor=""
                  >
                    {t('phoneNumber')}
                  </label>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        pattern: PATTERN_PHONE,
                        message: t('errorPhoneNumber'),
                      },
                      {
                        required: true,
                        message: t('warningPhoneNumber'),
                      },
                    ]}
                  >
                    <Input placeholder={t('warningPhoneNumber')} />
                  </Form.Item>
                </div>

                <button
                  className="text-white bg-blue-500 text-base w-full font-medium py-3 rounded-lg hover:bg-blue-600 focus:bg-blue-700"
                  type="submit"
                >
                  {displayLoadingModal === true ? (
                    <div className={style.ldsDualRing}></div>
                  ) : (
                    t('checkButton')
                  )}
                </button>
              </div>
            </div>
          </Form>
          <div
            className={`${!isActive || datas === undefined ? 'hidden' : ''}`}
          >
            <div className="max-w-7xl mx-auto mt-5">
              <div className={style.card}>
                <div className="px-3 md:px-6 space-y-2 lg:space-y-4">
                  <h1 className={style.location}>
                    {datas?.from_name}
                    <p className="mr-3 ml-3 text-red-400"> - </p>
                    {datas?.to_name}
                  </h1>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-between pt-4">
                    <h1 className="text-cardDate font-medium">
                      {t('startDate')}: {datas?.dep_date} {datas?.dep_time}
                    </h1>
                    <h1 className="hidden sm:block">-</h1>
                    <h1 className="sm:hidden p-1">&darr;</h1>
                    <h1 className={'text-cardDate text-center -mt-2'}>
                      {datas?.miles}
                      {t('measurement')}
                      <br />
                    </h1>
                    <h1 className="hidden sm:block">-</h1>
                    <h1 className="sm:hidden p-1">&darr;</h1>
                    <h1 className="text-cardDate font-medium">
                      {t('endDate')}: {datas?.arr_date} {datas?.arr_time}
                    </h1>
                  </div>

                  <div className="flex justify-between flex-wrap">
                    <h1 className="font-medium text-cardDate text-center ">
                      Вагоны дугаар:{' '}
                      {datas?.rs_payload?.passengers[0]?.WAGON_NAME
                        ? datas?.rs_payload?.passengers[0]?.WAGON_NAME
                        : datas?.rs_payload?.passengers[0]?.WAGON}
                    </h1>

                    <h1 className="font-medium text-cardDate text-center">
                      {t('seatNumber')}:{' '}
                      {datas?.rs_payload?.passengers
                        ?.map(passenger =>
                          passenger.MEST_NO ? passenger.MEST_NO : passenger.MEST
                        )
                        .join(', ')}
                    </h1>
                  </div>
                  <div className="flex items-center pt-4 sm:pt-4">
                    <div className={style.rightRound}></div>
                    <div className="bg-white w-full h-0.5 "></div>
                    <div className={style.leftRound}></div>
                  </div>
                  <div className={style.rowDirection}>
                    <div className="flex">
                      <h1
                        className={`font-medium text-xs text-white p-2 rounded ${getStatusColor(
                          datas?.status
                        )}`}
                      >
                        {getStatusName(datas?.status)}
                      </h1>
                    </div>
                    {/* <div className="flex items-center space-x-8">
                      <button
                        className="text-direction font-medium flex text-xs md:text-sm"
                        onClick={() => setIsActive1(!isActive1)}
                      >
                        {t('busInformation')}
                        {isActive1 ? (
                          <ChevronUpIcon className="md:w-6 md:h-6 w-5 h-5" />
                        ) : (
                          <ChevronDownIcon className="md:w-6 md:h-6 w-5 h-5" />
                        )}
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className={`${!isActive1 ? 'hidden' : 'block'}`}>
                  <div className="border border-dashed "></div>
                  <div className="px-3 md:px-6 flex flex-col xs:flex-row justify-around py-5 space-y-3 xs:space-y-0">
                    <div className="space-y-3">
                      <h1 className="text-cardDate font-medium text-xs sm:text-sm">
                        {t('businessFirms')}:{' '}
                        {datas?.schedule?.bus?.transporter.name}
                      </h1>
                      <h1 className="text-cardDate font-medium text-xs sm:text-sm">
                        {t('busModel')}: {datas?.schedule?.bus?.modelName}
                      </h1>
                    </div>
                    <div className="space-y-3">
                      <h1 className="text-cardDate font-medium text-xs sm:text-sm">
                        {t('busModel')}: {datas?.schedule?.bus?.plateNumber}
                      </h1>
                      <h1 className="text-cardDate font-medium text-xs sm:text-sm">
                        {t('driverPhoneNumber')}: {datas?.schedule?.driverPhone}
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
