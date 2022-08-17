import { IBookingType } from "../../types/types"

function formatDate(date: string) {
  const formattedDate = new Date(date);
  return formattedDate.toDateString();
}
function formatMoney(amount: number) {
  return amount / 100;
}

export const InvoiceTable = ({ invoice }: { invoice: IBookingType }) => {
  const user = invoice.user;
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
        <div>
          Total Due:
          {formatMoney(invoice.total)}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date Paid:</th>
            <th>Amount:</th>
            <th>Payment Method:</th>
          </tr>
        </thead>
        <tbody>
          {invoice.transactions.map((b) => {
            return (
              <tr key={b.id}>
                <td>
                  {formatDate(b.datePaid)}
                </td>
                <td>
                  ${formatMoney(b.amount)}
                </td>
                <td>
                  {b.method}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        Make a payment:
        <input type="number" />
        <button>Pay Now</button>
      </div>
    </div>
  )
}