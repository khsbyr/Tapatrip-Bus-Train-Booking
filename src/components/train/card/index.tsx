import Loader from '@components/train/loader';
import LoadingRing from '@components/common/loadingRing';
import { useTrainContext } from '@context/trainContext';
import TrainService from '@services/train';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import style from './card.module.scss';

export default function Card({ voyage }) {
  const { setSelectedVoyageData } = useTrainContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [voyageStations, setVoyageStations] = useState([]);
  const { loadingOrder, setLoadingOrder } = useTrainContext();
  const [SelectedTicket, setSelectedTicket] = useState([]);
  const router = useRouter();
  const [loadingMarshrut, setLoadingMarshrut] = useState(false);

  const selectTicket = (voyage, wagon) => {
    if (
      SelectedTicket[0]?.voyage_id + SelectedTicket[0]?.price_type ===
      voyage.VOYAGE_ID + wagon.TARIF_TYPE
    ) {
      setSelectedTicket([]);
    } else {
      let params = {
        voyage_id: voyage.VOYAGE_ID,
        start_stop: voyage.FVSTOP_ID,
        end_stop: voyage.TVSTOP_ID,
        price_type: wagon.TARIF_TYPE,
      };

      setSelectedTicket([params]);
    }
  };

  const order = () => {
    setLoadingOrder(SelectedTicket[0]?.voyage_id);
    let params = {
      voyageId: SelectedTicket[0]?.voyage_id,
      startStop: SelectedTicket[0]?.start_stop,
      endStop: SelectedTicket[0]?.end_stop,
      priceType: SelectedTicket[0]?.price_type,
    };
    router.push({
      pathname: `/train/orders/${SelectedTicket[0]?.voyage_id}`,
      query: params,
    });
    setSelectedVoyageData(voyage);
  };

  const showModal = async () => {
    setLoadingMarshrut(true);
    setIsModalVisible(true);
    let params = {
      voyage_id: voyage.VOYAGE_ID,
    };
    try {
      const res = await TrainService.getVoyageStations(params);
      if (res && res.status === 200) {
        setVoyageStations(res.result);
        setLoadingMarshrut(false);
      }
    } catch (err) {
      console.log(err);
      setLoadingMarshrut(false);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="px-2 max-w-7xl mx-auto">
      <div className={style.card}>
        <div className={style.headerSection}>
          <div className="flex space-x-3">
            <img src="/assets/flagMongolia.png" className="w-10 h-5" />
            <div>
              <h1 className={style.trainName}>{voyage.TRAIN_NAME_MN}</h1>
              <h1 className={style.trainNo}>
                {voyage.TRAIN_NO}-р галт тэрэг /{voyage.TRAINTYPE_NAME}/
              </h1>
            </div>
          </div>
          <div className="pt-3 md:pt-0" onClick={showModal}>
            <h1 className={style.marshrut}>Аяллын маршрут</h1>
          </div>
          <Modal
            title={`${voyage.TRAIN_NO} ${voyage.TRAIN_NAME_MN} аялалын маршрут`}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={700}
            bodyStyle={{ height: '600px', overflow: 'auto' }}
            okButtonProps={{ style: { display: 'none' } }}
            cancelText="Хаах"
          >
            {loadingMarshrut ? (
              <Loader />
            ) : (
              <table className={style.styledTable}>
                <thead>
                  <tr>
                    <th className="w-8 md:w-14">№</th>
                    <th>Өртөөний нэр</th>
                    <th>Хүрэх цаг</th>
                    <th>Хөдлөх цаг</th>
                  </tr>
                </thead>
                <tbody>
                  {voyageStations &&
                    voyageStations?.map((station, index) => (
                      <tr>
                        <td>{++index}</td>
                        <td>
                          {station.stop_name
                            ? station.stop_name
                            : station.STOP_NAME}
                        </td>
                        <td>
                          {station.arr_time
                            ? station.arr_time
                            : station.ARR_TIME}
                        </td>
                        <td>
                          {station.dep_time
                            ? station.dep_time
                            : station.DEP_TIME}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </Modal>
        </div>

        <div className={style.line} />

        <div className={style.middleSection}>
          <div className="flex justify-between">
            <div>
              <p className={style.depDate}>{voyage.DEP_DATE}</p>
              <p className={style.depTime}>
                {voyage.DEP_TIME} / {voyage.FST_NAME}
              </p>
            </div>

            <div className="md:hidden">
              <p className={style.arrDate}>{voyage.ARR_DATE}</p>
              <p className={style.depTime}>
                {voyage.TST_NAME} / {voyage.ARR_TIME}
              </p>
            </div>
          </div>

          <div>
            <p className={style.distance}>
              Нийт туулах зам - {voyage.DISTANCE_KM}км
            </p>
            <div className={style.distanceLine} />
          </div>

          <div className="hidden md:block">
            <p className={style.arrDate}>{voyage.ARR_DATE}</p>
            <p className={style.depTime}>
              {voyage.TST_NAME} / {voyage.ARR_TIME}
            </p>
          </div>
        </div>

        <div className="flex items-center pt-4 sm:pt-4">
          <div className={style.rightRound}></div>
          <div className={style.border}></div>
          <div className={style.leftRound}></div>
        </div>

        <div className={style.footerSection}>
          {voyage.WAGONS.map(wagon => (
            <div
              className={`${style.ticket} 
              ${
                SelectedTicket[0]?.voyage_id + SelectedTicket[0]?.price_type ===
                voyage.VOYAGE_ID + wagon.TARIF_TYPE
                  ? 'bg-button'
                  : 'bg-bg hover:opacity-80'
              }           
              ${
                wagon.FREEMEST === 0
                  ? 'opacity-30 hover:opacity-30 cursor-not-allowed'
                  : 'opacity-100 cursor-pointer'
              }`}
              onClick={() =>
                (wagon.FREEMEST !== 0 && wagon.TARIF_TYPE === 5) ||
                (wagon.FREEMEST !== 0 && wagon.TARIF_TYPE === 8)
                  ? selectTicket(voyage, wagon)
                  : ''
              }
            >
              <div className="flex items-center space-x-2">
                <p
                  className={`font-semibold text-small2x md:text-xs ${
                    SelectedTicket[0]?.voyage_id +
                      SelectedTicket[0]?.price_type ===
                    voyage.VOYAGE_ID + wagon.TARIF_TYPE
                      ? 'text-white'
                      : 'text-gray-500'
                  }`}
                >
                  Том хүн:{' '}
                </p>
                <p
                  className={`font-semibold text-xs md:text-sm ${
                    SelectedTicket[0]?.voyage_id +
                      SelectedTicket[0]?.price_type ===
                    voyage.VOYAGE_ID + wagon.TARIF_TYPE
                      ? 'text-white'
                      : 'text-trainTicket'
                  }`}
                >
                  <CurrencyFormat
                    value={wagon.COST_ADULT}
                    displayType={'text'}
                    thousandSeparator={true}
                    renderText={value => <div>{value} ₮</div>}
                  />
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <p
                  className={`font-semibold text-small2x md:text-xs ${
                    SelectedTicket[0]?.voyage_id +
                      SelectedTicket[0]?.price_type ===
                    voyage.VOYAGE_ID + wagon.TARIF_TYPE
                      ? 'text-white'
                      : 'text-gray-500'
                  }`}
                >
                  Хүүхэд:{' '}
                </p>
                <p
                  className={`font-semibold text-xs md:text-sm ${
                    SelectedTicket[0]?.voyage_id +
                      SelectedTicket[0]?.price_type ===
                    voyage.VOYAGE_ID + wagon.TARIF_TYPE
                      ? 'text-white'
                      : 'text-trainTicket'
                  }`}
                >
                  <CurrencyFormat
                    value={wagon.COST_BABY}
                    displayType={'text'}
                    thousandSeparator={true}
                    renderText={value => <div>{value} ₮</div>}
                  />
                </p>
              </div>

              <div className="flex items-center space-x-2 mt-2">
                <p
                  className={`font-semibold text-small2x md:text-xs ${
                    SelectedTicket[0]?.voyage_id +
                      SelectedTicket[0]?.price_type ===
                    voyage.VOYAGE_ID + wagon.TARIF_TYPE
                      ? 'text-white'
                      : 'text-trainTicket'
                  }`}
                >
                  {wagon.MESTTYPE} - {wagon.FREEMEST} сул суудал
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className={`${style.orderButton} ${
              SelectedTicket.length > 0
                ? 'bg-button'
                : 'bg-red-200 cursor-not-allowed'
            }`}
            onClick={order}
            disabled={SelectedTicket.length > 0 ? false : true}
          >
            {loadingOrder === voyage.VOYAGE_ID ? <LoadingRing /> : 'Захиалах'}
          </button>
        </div>
      </div>
    </div>
  );
}
