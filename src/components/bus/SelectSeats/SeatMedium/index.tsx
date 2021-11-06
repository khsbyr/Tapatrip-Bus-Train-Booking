import busSketch from '@public/assets/45.svg';
import Image from 'next/image';
import seatRangeMap from '@helpers/seatRangeMap';
import style from './SeatMedium.module.scss';

const Seat48_52 = ({ datas }) => {
  const seatRanges = seatRangeMap(datas.seats);
  console.log(seatRanges);
  return (
    <div className="pl-10 flex">
      <div className="z-0 relative w-full">
        <Image src={busSketch} className="z-0" />
      </div>
      <div className="absolute mt-40 ml-7">
        <table>
          {seatRanges.map((seat, i) =>
            seat.length === 4 ? (
              <tr>
                {seat.map((seat, j) =>
                  j !== 2 ? (
                    <td>
                      <button
                        className={
                          seat.isAvialable
                            ? style.seatButtonDisabled
                            : style.seatButton
                        }
                        value={j}
                        disabled={seat.isAvialable}
                      >
                        {seat && seat.number}
                      </button>
                    </td>
                  ) : (
                    <td>
                      <button
                        className={
                          seat.isAvialable
                            ? style.seatButtonMarginLeftDisabled
                            : style.seatButtonMarginLeft
                        }
                        value={j}
                        disabled={seat.isAvialable}
                      >
                        {seat && seat.number}
                      </button>
                    </td>
                  )
                )}
              </tr>
            ) : (
              <tr>
                {seat.map((seat, k) =>
                  k == 3 || k == 4 ? (
                    <td>
                      <button
                        className={
                          seat.isAvialable
                            ? style.seatButtonMarginRightDisabled
                            : style.seatButtonMarginRight
                        }
                        value={k}
                        disabled={seat.isAvialable}
                      >
                        {seat && seat.number}
                      </button>
                    </td>
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
            )
          )}
        </table>
      </div>
    </div>
  );
};
export default Seat48_52;
