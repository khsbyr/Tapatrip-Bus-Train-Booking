import { useTrainContext } from '@context/trainContext';
import { arrayFilterSeat } from '@helpers/train-array-format';
import TrainService from '@services/train';
import React from 'react';
import s from './classPrivate.module.scss';

const seats = [];
const isSelected = [];

const classPrivate = ({
  data,
  voyageId,
  wagonName,
  startStop,
  endStop,
  wagonId,
}) => {
  const { selectedSeats, setSelectedSeats } = useTrainContext();
  const { isSelectedSeats, setIsSelectedSeats } = useTrainContext();
  const { orderId, setOrderId } = useTrainContext();

  const selectSeat = async e => {
    let isArray = arrayFilterSeat(seats, e.target.value, wagonName, voyageId);
    if (isArray.length === 0) {
      let passenger = {
        id: '',
        firstName: '',
        lastName: '',
        documentNumber: '',
        gender: '',
        isChild: false,
        isVaccine: false,
        isOrderedTea: false,
        seatNumber: e.target.value,
        voyageId: voyageId,
        wagonName: wagonName,
      };
      seats.push(passenger);
      isSelected[voyageId + wagonName + e.target.value] = true;
      setSelectedSeats(seats);
      setIsSelectedSeats(isSelected);

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
        if (res && res.status === 200) setOrderId(res.order_id);
      } catch (err) {
        console.log(err);
      }
    } else {
      const index = selectedSeats.findIndex(
        item =>
          item.seatNumber === e.target.value && item.wagonName === wagonName
      );
      if (index > -1) {
        selectedSeats.splice(index, 1);
        isSelected[voyageId + wagonName + e.target.value] = false;
        setSelectedSeats(selectedSeats);
        setIsSelectedSeats(isSelectedSeats);
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
        await TrainService.setMestState(params);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {data?.map((mests, index) => (
        <div className="flex gap-x-0" key={index}>
          <div className={s.plat3}>
            <div className="border-l-4 border-gray-200" />
            <div className="border-l-4 border-gray-400" />
            <div className="border-l-4 border-gray-200" />
          </div>

          <div className="w-full text-center">
            <div className={s.plat1}>
              {mests?.map((mest, index) =>
                index < 2 ? (
                  <button
                    className={`${s.button} 
                        ${
                          mest.MEST_STATE !== '0'
                            ? 'opacity-30 cursor-not-allowed'
                            : 'opacity-100 hover:opacity-80'
                        }     
                        ${
                          isSelectedSeats[voyageId + wagonName + mest.MEST_NO]
                            ? 'bg-white border-2 border-red-500 text-red-500'
                            : 'bg-bg border-2 text-trainTicket'
                        }   
                        ${mest.MEST_NO % 2 === 0 ? 'shadow-lg' : ''}           
                    `}
                    key={index}
                    disabled={mest.MEST_STATE !== '0' ? true : false}
                    onClick={selectSeat}
                    value={mest.MEST_NO}
                  >
                    {mest.MEST_NO}{' '}
                    {mest.MEST_NO % 2 === 0 ? '(Дээр)' : '(Доор)'}
                  </button>
                ) : (
                  ''
                )
              )}
            </div>

            <div className={s.tableMain}>
              <div className={s.table}></div>
            </div>

            <div className={s.plat2}>
              {mests?.map((mest, index) =>
                index > 1 && index < 4 ? (
                  <button
                    className={`${s.button} 
                        ${
                          mest.MEST_STATE !== '0'
                            ? 'opacity-30 cursor-not-allowed'
                            : 'opacity-100 hover:opacity-80'
                        }
                         ${
                           isSelectedSeats[voyageId + wagonName + mest.MEST_NO]
                             ? 'bg-white border-2 border-red-500 text-red-500'
                             : 'bg-bg border-2 text-trainTicket'
                         }
                         ${mest.MEST_NO % 2 === 0 ? 'shadow-lg' : ''}     
                    `}
                    key={index}
                    disabled={mest.MEST_STATE !== '0' ? true : false}
                    onClick={selectSeat}
                    value={mest.MEST_NO}
                  >
                    {mest.MEST_NO}{' '}
                    {mest.MEST_NO % 2 === 0 ? '(Дээр)' : '(Доор)'}
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

export default classPrivate;
