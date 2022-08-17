import { IUser } from "../../types/types"
import { TIMESAVAILABLE } from '../../constants/BookingConstants';

function formatDate(date: string) {
  const formattedDate = new Date(date);
  return formattedDate.toDateString();
}
function formatTime(time: string) {
  if (time === '10') return '10:00 am';
  if (time === '15') return '3:00 pm';
  return '6:00 pm';
}
function formatMoney(amount: number) {
  return amount / 100;
}

export const UserTable = ({ user }: { user: IUser }) => {
  return (
    <div>
      <ul>
        <li>Name: {user.name}</li>
        <li>Email: {user.email}</li>
      </ul>
      <div>
        <label>Notes:</label>
        <textarea>
          {user.notes}
        </textarea>
      </div>
      <table>
        <thead>
          <tr>
            <th>Booked Date:</th>
            <th>Booked Time:</th>
            <th>Status:</th>
            <th>Total:</th>
          </tr>
        </thead>
        <tbody>
          {user.bookings.map((b) => {
            return (
              <tr key={b.id}>
                <td>
                  {formatDate(b.date)}
                </td>
                <td>
                  {formatTime(b.time)}
                </td>
                <td>
                  {b.status}
                </td>
                <td>
                  ${formatMoney(b.total)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}