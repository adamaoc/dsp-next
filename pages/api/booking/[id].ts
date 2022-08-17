import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bookingId = req.query.id
  if (!bookingId) return

  const method = req.method;
  const prisma = new PrismaClient();

  let result;
  switch (method) {
    case 'GET': // get booking by ID
      result = await prisma.dSPBookings.findFirst({
        where: {
          id: bookingId
        },
        include: {
          user: true,
          transactions: true
        }
      })
      break;
    case 'DELETE': // delete booking by ID
      // result = await removeCustById(bookingId);
      res.json({ result, message: `booking ${bookingId} deleted` });
      break;
    case 'PUT': // update a booking - prob for amount or status
      // const { amount, status } = req.body;
      // result = await createNewCust();
      res.json({ result, message: `updated Booking` });
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
      break;
  }

  await prisma.$disconnect() // should be able to remove at some point

  res.json(result)
}