import type { NextPage } from 'next'
import { useState } from 'react';
import { UserTable } from '../../components/Tables/UserTable';
import { InvoiceTable } from '../../components/Tables/InvoiceTable';

async function getInvoiceById(id: string) {
  // hit api
  const results = await fetch(`http://localhost:3000/api/booking/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  return await results.json();
}

async function getUserByEmail(email: string) {
  // hit api
  const results = await fetch(`http://localhost:3000/api/user/email?email=${email}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  return await results.json();
}

// an invoice to a customer is a booking to the api
// an invoice to to the api is a paid transaction to the user

const InvoicePage: NextPage = () => {
  const [invoiceNumber, setInvoiceNumber] = useState<string | undefined>()
  const [email, setEmail] = useState<string | undefined>()
  const [invoice, setInvoice] = useState();
  const [user, setUser] = useState();

  const findInvoice = async () => {
    if (invoiceNumber) {
      const respInv = await getInvoiceById(invoiceNumber)
      setInvoice(respInv);
      console.log({ respInv })
    }
    if (email) {
      const respUser = await getUserByEmail(email)
      setUser(respUser);
      console.log({ respUser })
    }
  }

  if (invoice) return <div><InvoiceTable invoice={invoice} /></div>
  if (user) return <div><UserTable user={user} /></div>

  return (
    <div>
      <p>Enter either an invoice number or enter your email address.</p>
      <div>
        <input type="text" placeholder="invoice number" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
        <span>or</span>
        <input type="email" placeholder="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button onClick={findInvoice}>Find</button>
    </div>
  )
}

export default InvoicePage;