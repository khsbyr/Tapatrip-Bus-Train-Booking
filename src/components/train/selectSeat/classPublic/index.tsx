import { useTrainContext } from '@context/trainContext';
import { arrayFilterSeat } from '@helpers/train-array-format';
import { message } from 'antd';
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
  const [isSelected] = useState([]);
  const { setIsSelectedSeats } = useTrainContext();

  const selectSeat = e => {
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
        wagonId: wagonId,
        mest_state: 1,
      };
      if (selectedSeats.length >= 4) {
        message.warning('Та 4-өөс их суудал сонгох боломжгүй!');
      } else {
        selectedSeats.push(passenger);
        isSelected[voyageId + wagonName + e.target.value] = true;
        setIsSelectedSeats(isSelected);
        setSelectedSeats(selectedSeats);
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
                  disabled={mest.MEST_STATE !== '0' ? true : false}
                  onClick={selectSeat}
                  value={mest.MEST_NO}
                >
                  {mest.MEST_NO}
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
                    disabled={mest.MEST_STATE !== '0' ? true : false}
                    onClick={selectSeat}
                    value={mest.MEST_NO}
                  >
                    {mest.MEST_NO}
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
                    disabled={mest.MEST_STATE !== '0' ? true : false}
                    onClick={selectSeat}
                    value={mest.MEST_NO}
                  >
                    {mest.MEST_NO}
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
