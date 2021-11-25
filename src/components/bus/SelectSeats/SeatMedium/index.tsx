import seatRangeMap from '@helpers/seatRangeMap';
import { useGlobalStore } from '@context/globalStore';
import style from './seatMedium.module.scss';
import { arrayFilterSeat } from '@helpers/array-format';

const seats = [];
const isSelected = [];

const SeatMedium = ({ datas, scheduleId }) => {
  const seatRanges = seatRangeMap(datas.seats);
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
        <img src="/assets/45Circle.svg" className="z-0" />
      </div>
      <div className="absolute mt-40 ml-7">
        <table>
          {seatRanges.map((seat, i) =>
            seat.length === 4 ? (
              <tr key={i}>
                {seat.map((seat, j) =>
                  j !== 2 ? (
                    <td key={j}>
                      <button
                        key={seat.number}
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
                  ) : (
                    <td key={j}>
                      <button
                        key={seat.number}
                        className={
                          !seat.isAvialable
                            ? style.seatButtonMarginLeftDisabled
                            : isSelectedSeats[scheduleId + seat.number]
                            ? style.seatButtonMarginLeftSelected
                            : style.seatButtonMarginLeft
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
            ) : (
              <tr key={i}>
                {seat.map((seat, k) =>
                  k == 3 || k == 4 ? (
                    <td key={k}>
                      <button
                        key={seat.number}
                        className={
                          !seat.isAvialable
                            ? style.seatButtonMarginRightDisabled
                            : isSelectedSeats[scheduleId + seat.number]
                            ? style.seatButtonMarginRightSelected
                            : style.seatButtonMarginRight
                        }
                        value={seat.number}
                        onClick={handleSelectSeat}
                        disabled={!seat.isAvialable}
                      >
                        {seat && seat.number}
                      </button>
                    </td>
                  ) : (
                    <td key={k}>
                      <button
                        key={seat.number}
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
            )
          )}
        </table>
      </div>
    </div>
  );
};
export default SeatMedium;
