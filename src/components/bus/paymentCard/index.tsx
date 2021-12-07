import { useGlobalStore } from '@context/globalStore';
import { arrayFilterSchedule, arrayFilterSeat } from '@helpers/array-format';
import CurrencyFormat from 'react-currency-format';
import { useTranslation } from 'next-i18next';

export default function PaymentCard({ datas, scheduleId }) {
  const persons = [];
  const childs = [];
  const { t } = useTranslation(['steps']);
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
          <p>{persons.length + ' ' + t('adult')}</p>
          <p className="flex">
            <CurrencyFormat
              value={datas.adultTicket * persons.length}
              displayType={'text'}
              thousandSeparator={true}
              renderText={value => <div>{value}</div>}
            />
            ₮
          </p>
        </div>
      )}
      <div className="flex justify-between text-sm">
        <p> {'Амь даатгал үнэ (Том хүн)'}</p>
        <p className="flex">
          <CurrencyFormat
            value={1000}
            displayType={'text'}
            thousandSeparator={true}
            renderText={value => <div>{value}</div>}
          />
          ₮
        </p>
      </div>
      {childs.length > 0 && (
        <div className="flex justify-between">
          <p>
            {childs.length} {t('child')}
          </p>
          <p className="flex">
            <CurrencyFormat
              value={datas?.childTicket * childs.length}
              displayType={'text'}
              thousandSeparator={true}
              renderText={value => <div>{value}</div>}
            />
            ₮
          </p>
        </div>
      )}
      <div className="flex justify-between text-sm">
        <p> {'Амь даатгал үнэ (Хүүхэд)'}</p>
        <p className="flex">
          <CurrencyFormat
            value={400}
            displayType={'text'}
            thousandSeparator={true}
            renderText={value => <div>{value}</div>}
          />
          ₮
        </p>
      </div>
      <div className="flex justify-between font-bold">
        <p> {t('totalPrice')}</p>
        <p className="flex">
          <CurrencyFormat
            value={booking.toPay}
            displayType={'text'}
            thousandSeparator={true}
            renderText={value => <div>{value}</div>}
          />
          ₮
        </p>
      </div>
    </div>
  );
}
