import busSketch from '@public/assets/24.svg';
import Image from 'next/image';
import seat24RangeMap from '@helpers/seat24RangeMap';
import style from './SeatSmall.module.scss';
import { useGlobalStore } from '@context/globalStore';
import { message } from 'antd';
import { arrayFilterSeat } from '@helpers/array-format';

const seats = [];
const isSelected = [];

const Seat24 = ({ datas }) => {
  const seatRanges = seat24RangeMap(datas.seats);
  const { selectedSeats, setSelectedSeats } = useGlobalStore();
  const { isSelectedSeats, setIsSelectedSeats } = useGlobalStore();

  const handleSelectSeat = e => {
    let isArray = arrayFilterSeat(seats, e.target.value);
    if (isArray.length === 0) {
      let passenger = {
        id: '',
        firstName: '',
        lastName: '',
        documentNumber: '',
        gender: '',
        isChild: '',
        genderName: '',
        seatNumber: e.target.value,
      };
      seats.push(passenger);
      isSelected[e.target.value] = true;
      setSelectedSeats(seats);
      setIsSelectedSeats(isSelected);
    } else {
      const index = selectedSeats.findIndex(
        item => item.seatNumber === e.target.value
      );
      if (index > -1) {
        selectedSeats.splice(index, 1);
        isSelectedSeats[e.target.value] = false;
        setSelectedSeats(selectedSeats);
        setIsSelectedSeats(isSelectedSeats);
        console.log(isSelectedSeats);
      }
    }
  };

  return (
    <div className="flex">
      <div className="z-0 relative w-full">
        <Image src={busSketch} className="z-0" />
      </div>
      <div className="absolute mt-40 ml-7">
        <table>
          {seatRanges.map((seats, i) => (
            <tr key={i}>
              {seats.map((seat, k) =>
                i == 0 && (k == 0 || k == 1) ? (
                  <td key={k}></td>
                ) : (
                  <td key={k}>
                    <button
                      className={
                        seat.isAvialable
                          ? style.seatButtonDisabled
                          : isSelectedSeats[seat.number]
                          ? style.seatButtonSelected
                          : style.seatButton
                      }
                      value={seat.number}
                      onClick={handleSelectSeat}
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
