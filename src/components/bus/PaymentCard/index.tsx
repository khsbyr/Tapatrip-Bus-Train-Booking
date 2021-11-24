import { useGlobalStore } from '@context/globalStore';
import { arrayFilterSchedule, arrayFilterSeat } from '@helpers/array-format';

const persons = [];
const childs = [];

export default function PaymentCard({ datas, scheduleId }) {
  const { booking } = useGlobalStore();
  const { selectedSeats } = useGlobalStore();
  const formatSelectedSeats = arrayFilterSchedule(selectedSeats, scheduleId);

  formatSelectedSeats &&
    formatSelectedSeats.map(seat => {
      let isArray = arrayFilterSeat(persons, seat.seatNumber, scheduleId);
      if (isArray.length === 0) {
        seat.isChild ? childs.push(seat) : persons.push(seat);
      }
    });

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl p-4 text-cardDate text-base sm:text-lg">
      {persons.length > 0 && (
        <div className="flex justify-between">
          <p>{persons.length} Том хүн</p>
          <p>{datas.adultTicket * persons.length}₮</p>
        </div>
      )}
      {childs.length > 0 && (
        <div className="flex justify-between">
          <p>{childs.length} Хүүхэд</p>
          <p>{datas.childTicket * childs.length}₮</p>
        </div>
      )}
      <div className="flex justify-between font-bold">
        <p>Нийт үнэ</p>
        <p>{booking.toPay}₮</p>
      </div>
      <p className="flex justify-end text-sm">Амь даатгал багтсан үнэ</p>
    </div>
  );
}
