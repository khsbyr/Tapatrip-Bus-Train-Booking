import seat24RangeMap from '@helpers/seat24RangeMap';
import style from './seatSmall.module.scss';
import { useGlobalStore } from '@context/globalStore';
import { arrayFilterSeat } from '@helpers/array-format';

const seats = [];
const isSelected = [];

const Seat24 = ({ datas, scheduleId }) => {
  const seatRanges = seat24RangeMap(datas?.seats);
  const { selectedSeats, setSelectedSeats } = useGlobalStore();
  const { isSelectedSeats, setIsSelectedSeats } = useGlobalStore();

  const handleSelectSeat = e => {
    let isArray = arrayFilterSeat(seats, e.target.value, scheduleId);
    if (isArray.length === 0) {
      let passenger = {
        id: '',
        firstName: '',
        lastName: '',
        scheduleId: scheduleId,
        documentNumber: '',
        gender: '',
        isChild: false,
        isVaccine: false,
        seatNumber: e.target.value,
      };
      seats.push(passenger);
      isSelected[scheduleId + e.target.value] = true;
      setSelectedSeats(seats);
      setIsSelectedSeats(isSelected);
    } else {
      const index = selectedSeats.findIndex(
        item =>
          item.seatNumber === e.target.value && item.scheduleId === scheduleId
      );
      if (index > -1) {
        selectedSeats.splice(index, 1);
        isSelected[scheduleId + e.target.value] = false;
        setSelectedSeats(selectedSeats);
        setIsSelectedSeats(isSelectedSeats);
      }
    }
  };

  return (
    <div className="flex">
      <div className="z-0 relative w-full">
        <img src="/assets/24Circle.svg" className="z-0" />
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
                        !seat.isAvialable
                          ? style.seatButtonDisabled
                          : isSelectedSeats[scheduleId + seat.number]
                          ? style.seatButtonSelected
                          : style.seatButton
                      }
                      value={seat.number}
                      onClick={handleSelectSeat}
                      disabled={!seat.isAvialable}
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
