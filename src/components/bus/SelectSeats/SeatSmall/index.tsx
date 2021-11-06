import busSketch from '@public/assets/24.svg';
import Image from 'next/image';
import seat24RangeMap from '@helpers/seat24RangeMap';
import style from './SeatSmall.module.scss';

const Seat24 = ({ datas }) => {
  const seatRanges = seat24RangeMap(datas.seats);
  return (
    <div className="pl-10 flex">
      <div className="z-0 relative w-full">
        <Image src={busSketch} className="z-0" />
      </div>
      <div className="absolute mt-40 ml-7">
        <table>
          {seatRanges.map((seats, i) => (
            <tr>
              {seats.map((seat, k) =>
                i == 0 && (k == 0 || k == 1) ? (
                  <td></td>
                ) : (
                  <td>
                    <button
                      className={
                        seat.isAvialable
                          ? style.seatButtonDisabled
                          : style.seatButton
                      }
                      value={k}
                      disabled={seat.isAvialable}
                    >
                      {seat && seat.number}
                    </button>
                  </td>
                )
              )}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
export default Seat24;
