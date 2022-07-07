// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type BookingType = {
  name: string;
  date: string;
  time: string;
  email: string;
  notes: string;
}

const Bookings = [
  {
    name: "John Doe",
    date: '07/22/22',
    time: '15',
    email: 'testing@tester.com',
    notes: 'Testing account'
  },
  {
    name: "John Doe",
    date: '07/22/22',
    time: '10',
    email: 'testing@tester.com',
    notes: 'Testing account'
  },
  {
    name: "John Doe",
    date: '07/22/22',
    time: '18',
    email: 'testing@tester.com',
    notes: 'Testing account'
  },
  {
    name: "John Doe",
    date: '07/21/22',
    time: '13',
    email: 'testing@tester.com',
    notes: 'Testing account'
  }
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BookingType[]>
) {
  res.status(200).json(Bookings)
}
