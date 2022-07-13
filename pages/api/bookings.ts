// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { BookingType } from '../../types/types';

type RespType = {
  bookings: BookingType[],
  timesAvailable: string[]
}

const Bookings = [
  {
    name: "John Doe",
    date: '7/22/2022',
    time: '15',
    email: 'testing@tester.com',
    notes: 'Testing account'
  },
  {
    name: "John Doe",
    date: '7/22/2022',
    time: '10',
    email: 'testing@tester.com',
    notes: 'Testing account'
  },
  {
    name: "John Doe",
    date: '7/22/2022',
    time: '18',
    email: 'testing@tester.com',
    notes: 'Testing account'
  },
  {
    name: "John Doe",
    date: '7/21/2022',
    time: '15',
    email: 'testing@tester.com',
    notes: 'Testing account'
  }
]

const timesAvailable = [
  '10',
  '15',
  '18'
]

const data = {
  bookings: Bookings,
  timesAvailable
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RespType>
) {
  res.status(200).json(data)
}
