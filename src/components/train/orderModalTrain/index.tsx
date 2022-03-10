import ContentWrapper from '@components/bus/orderModal/style';
import { useUI } from '@context/uiContext';
import { PATTERN_PHONE } from '@helpers/constantValidation';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import TrainService from '@services/train';
import { Form, Input, Modal } from 'antd';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import style from './orderModal.module.scss';

export default function OrderModalTrain(props) {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const { closeLoadingModal, openLoadingModal, displayLoadingModal } = useUI();
  const [datas, setDatas] = useState(Object);
  const [refNumber, setRefNumber] = useState('');

  const onFinish = async values => {
    setRefNumber(values.refNumber);
    let params = `?ref_number=${values.refNumber}&phone_number=${values.phone}`;
    openLoadingModal();
    const token =
      AuthTokenStorageService.getAccessToken() &&
      AuthTokenStorageService.getAccessToken() != 'false'
        ? AuthTokenStorageService.getAccessToken()
        : AuthTokenStorageService.getGuestToken();
    if (token) {
      try {
        const res = await TrainService.orderCheck(params, token);
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

  const getTicket = () => {
    window.open(`https://train.tapatrip.com/train/${refNumber}`, '_blank');
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
                    <div>
                      {datas?.status === 4 ? (
                        <button
                          className="font-medium text-xs text-white p-2 rounded bg-blue-400"
                          onClick={getTicket}
                        >
                          TICKET авах
                        </button>
                      ) : (
                        <button className="font-medium text-xs text-white p-2 rounded bg-blue-400">
                          {datas?.to_pay} MNT
                        </button>
                      )}
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
