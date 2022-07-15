// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import { BookingType } from '../../types/types';
import { PrismaClient } from '@prisma/client';

// type RespType = {
//   bookings: BookingType[],
//   timesAvailable: string[]
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const {
    name,
    date,
    time,
    email,
    notes
  } = req.body;

  const prisma = new PrismaClient();
  const data = await prisma.dSPBookings.create({
    data: {
      name: name,
      date: date,
      time: time.toString(),
      email: email,
      notes: notes
    }
  })

  res.status(200).json(data)
}
