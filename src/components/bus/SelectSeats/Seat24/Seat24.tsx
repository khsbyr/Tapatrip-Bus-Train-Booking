import busSketch from '@public/assets/24.svg';
import Image from 'next/image';
import seat24RangeMap from '@helpers/seat24RangeMap';
import s from './Seat24.module.scss';
interface Props {
  datas?: any;
}
const Seat24 = ({ datas }) => {
  const seatRanges = seat24RangeMap(datas.seat24);
  console.log(datas);
  return (
    <div className="pl-10 flex">
      <div className="z-0 relative w-full">
        <Image src={busSketch} className="z-0" />
      </div>
      <div className="absolute mt-40 ml-7">
        <table>
          {seatRanges.map(
            (seats, i) => (
              <tr>
                {seats.map((seat, k) =>
                  i == 0 && (k == 0 || k == 1) ? (
                    <td></td>
                  ) : (
                    <td>
                      <button className={s.seatButton} value={k}>
                        {seat && seat.number}
                      </button>
                    </td>
                  )
                )}
              </tr>
            )
            // seat.length === 4 ? (
            //   <tr>
            //     {seat.map((seat, j) =>
            //       j !== 2 ? (
            //         <td>
            //           {/* <button className={s.seatButton} value={j}>
            //             {seat && seat.number}
            //           </button> */}
            //         </td>
            //       ) : (
            //         <td>
            //           {/* <button className={s.seatButtonNoBorder} value={j}>
            //             {seat && seat.number}
            //           </button> */}
            //         </td>
            //       )
            //     )}
            //   </tr>
            // ) : (
            //   <tr>
            //     {seat.map((seat, k) =>
            //       k == 3 || k == 4 ? (
            //         <td>
            //           {/* <button
            //             className={s.seatButtonMarginRight}
            //             value={k}
            //             onClick={seat.number}
            //           >
            //             {seat && seat.number}
            //           </button> */}
            //         </td>
            //       ) : (
            //         <td>
            //           <button className={s.seatButton} value={k}>
            //             {seat && seat.number}
            //           </button>
            //         </td>
            //       )
            //     )}
            //   </tr>
            // )
          )}
        </table>
      </div>
    </div>
  );
};
export default Seat24;
