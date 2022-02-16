import LoadingRingSeat from '@components/train/loadingRing';
import { useTrainContext } from '@context/trainContext';
import { arrayFilterSeat } from '@helpers/train-array-format';
import TrainService from '@services/train';
import { message } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import style from './classPublic.module.scss';

const classPublic = ({
  data,
  voyageId,
  wagonName,
  startStop,
  endStop,
  wagonId,
}) => {
  const { selectedSeats, setSelectedSeats } = useTrainContext();
  const { orderId, setOrderId } = useTrainContext();
  const [isSelected] = useState([]);
  const [isLoadingSeat, setIsLoadingSeat] = useState(false);
  const { setEndMinute, setEndDate, setIsSelectedSeats } = useTrainContext();
  const [seatLoading, setSeatLoading] = useState();

  const selectSeat = async e => {
    setSeatLoading(e.target.value);
    setIsLoadingSeat(true);
    let isArray = arrayFilterSeat(
      selectedSeats,
      e.target.value,
      wagonName,
      voyageId
    );
    if (isArray.length === 0) {
      let passenger = {
        firstName: '',
        lastName: '',
        registerNumber: '',
        passportNumber: '',
        birthDate: '',
        isOrderedTea: 0,
        isForeign: false,
        seatNumber: e.target.value,
        voyageId: voyageId,
        wagonName: wagonName,
      };
      if (selectedSeats.length >= 4) {
        message.warning('Та 4-өөс их суудал сонгох боломжгүй!');
        setIsLoadingSeat(false);
      } else {
        selectedSeats.push(passenger);
        isSelected[voyageId + wagonName + e.target.value] = true;
        setIsSelectedSeats(isSelected);
        setSelectedSeats(selectedSeats);
        let params = {
          mest_id: e.target.value,
          wagon_id: wagonId,
          start_stop: startStop,
          end_stop: endStop,
          state: 1,
          order_id: orderId ? orderId : 0,
        };

        try {
          const res = await TrainService.setMestState(params);
          if (res && res.status === 200) {
            setOrderId(res.order_id);
            setIsLoadingSeat(false);

            var now = moment(new Date()),
              end = moment(res.result.expired_date),
              minutes = end.diff(now, 'minutes');
            setEndMinute(minutes);

            setEndDate(res.result.expired_date);
          }
        } catch (err) {
          console.log(err);
          setIsLoadingSeat(false);
        }
      }
    } else {
      const index = selectedSeats.findIndex(
        item =>
          item.seatNumber === e.target.value && item.wagonName === wagonName
      );
      if (index > -1) {
        selectedSeats.splice(index, 1);
        isSelected[voyageId + wagonName + e.target.value] = false;
        setIsSelectedSeats(isSelected);
        setSelectedSeats(selectedSeats);
      }
      let params = {
        mest_id: e.target.value,
        wagon_id: wagonId,
        start_stop: startStop,
        end_stop: endStop,
        state: 0,
        order_id: orderId,
      };

      try {
        const res = await TrainService.setMestState(params);
        if (res && res.status === 200) {
          setIsLoadingSeat(false);
        }
      } catch (err) {
        console.log(err);
        setIsLoadingSeat(false);
      }
    }
  };

  return (
    <>
      {data?.map((mests, index) => (
        <div className="flex gap-x-5 lg:gap-x-14" key={index}>
          <div className={style.plat3}>
            {mests?.map((mest, index) =>
              index < 9 && index > 5 ? (
                <button
                  className={`${style.button} ${
                    mest.MEST_STATE !== '0'
                      ? 'opacity-30 cursor-not-allowed'
                      : 'opacity-100 hover:opacity-80'
                  }
                   ${
                     isSelected[voyageId + wagonName + mest.MEST_NO]
                       ? 'bg-white border-2 border-red-500 text-red-500'
                       : 'bg-bg border-2 text-trainTicket'
                   }
                  `}
                  key={index}
                  disabled={
                    mest.MEST_STATE !== '0'
                      ? true
                      : isLoadingSeat
                      ? true
                      : false
                  }
                  onClick={selectSeat}
                  value={mest.MEST_NO}
                >
                  {isLoadingSeat && parseInt(seatLoading) === mest.MEST_NO ? (
                    <LoadingRingSeat />
                  ) : (
                    mest.MEST_NO
                  )}
                </button>
              ) : (
                ''
              )
            )}
          </div>

          <div className="w-full text-center">
            <div className={style.plat1}>
              {mests?.map((mest, index) =>
                index < 3 ? (
                  <button
                    className={`${style.button} 
                    ${
                      mest.MEST_STATE !== '0'
                        ? 'opacity-30 cursor-not-allowed'
                        : 'opacity-100 hover:opacity-80'
                    }     
                         ${
                           isSelected[voyageId + wagonName + mest.MEST_NO]
                             ? 'bg-white border-2 border-red-500 text-red-500'
                             : 'bg-bg border-2 text-trainTicket'
                         }              
                        `}
                    key={index}
                    disabled={
                      mest.MEST_STATE !== '0'
                        ? true
                        : isLoadingSeat
                        ? true
                        : false
                    }
                    onClick={selectSeat}
                    value={mest.MEST_NO}
                  >
                    {isLoadingSeat && parseInt(seatLoading) === mest.MEST_NO ? (
                      <LoadingRingSeat />
                    ) : (
                      mest.MEST_NO
                    )}
                  </button>
                ) : (
                  ''
                )
              )}
            </div>

            <div className={style.tableMain}>
              <div className={style.table}></div>
            </div>

            <div className={style.plat2}>
              {mests?.map((mest, index) =>
                index < 6 && index > 2 ? (
                  <button
                    className={`${style.button} ${
                      mest.MEST_STATE !== '0'
                        ? 'opacity-30 cursor-not-allowed'
                        : 'opacity-100 hover:opacity-80'
                    }
                         ${
                           isSelected[voyageId + wagonName + mest.MEST_NO]
                             ? 'bg-white border-2 border-red-500 text-red-500'
                             : 'bg-bg border-2 text-trainTicket'
                         }
                    `}
                    key={index}
                    disabled={
                      mest.MEST_STATE !== '0'
                        ? true
                        : isLoadingSeat
                        ? true
                        : false
                    }
                    onClick={selectSeat}
                    value={mest.MEST_NO}
                  >
                    {isLoadingSeat && parseInt(seatLoading) === mest.MEST_NO ? (
                      <LoadingRingSeat />
                    ) : (
                      mest.MEST_NO
                    )}
                  </button>
                ) : (
                  ''
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default classPublic;
