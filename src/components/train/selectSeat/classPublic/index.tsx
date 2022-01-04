import { arrayFilterSeat } from '@helpers/train-array-format';
import React from 'react';
import s from './classPublic.module.scss';

const seats = [];
const isSelected = [];

const classPublic = ({ data, voyageId, wagonName }) => {
  const selectSeat = e => {
    let isArray = arrayFilterSeat(seats, e.target.value);
    if (isArray.length === 0) {
      let passenger = {
        id: '',
        firstName: '',
        lastName: '',
        documentNumber: '',
        gender: '',
        isChild: false,
        isVaccine: false,
        seatNumber: e.target.value,
        voyageId: voyageId,
        wagonName: wagonName,
      };
      seats.push(passenger);
      //   isSelected[scheduleId + e.target.value] = true;
      //   setSelectedSeats(seats);
      //   setIsSelectedSeats(isSelected);
      console.log(seats);
    }
  };

  return (
    <>
      {data?.map((mests, index) => (
        <div className="flex gap-x-14" key={index}>
          <div className={s.plat3}>
            {mests?.map((mest, index) =>
              index < 9 && index > 5 ? (
                <button
                  className={`${s.button} ${
                    mest.MEST_STATE !== '0'
                      ? 'opacity-30 cursor-not-allowed'
                      : 'opacity-100 hover:opacity-80'
                  }`}
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
            <div className={s.plat1}>
              {mests?.map((mest, index) =>
                index < 3 ? (
                  <button
                    className={`${s.button} ${
                      mest.MEST_STATE !== '0'
                        ? 'opacity-30 cursor-not-allowed'
                        : 'opacity-100 hover:opacity-80'
                    }`}
                    key={index}
                    disabled={mest.MEST_STATE !== '0' ? true : false}
                  >
                    {mest.MEST_NO}
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
                index < 6 && index > 2 ? (
                  <button
                    className={`${s.button} ${
                      mest.MEST_STATE !== '0'
                        ? 'opacity-30 cursor-not-allowed'
                        : 'opacity-100 hover:opacity-80'
                    }`}
                    key={index}
                    disabled={mest.MEST_STATE !== '0' ? true : false}
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
