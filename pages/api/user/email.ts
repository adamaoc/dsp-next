import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

export default async function emailHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.query.email
  // console.log(req.query);
  if (!email) return

  const method = req.method;
  const prisma = new PrismaClient();

  let result;
  switch (method) {
    case 'GET': // get booking by ID
      result = await prisma.dSPUser.findFirst({
        where: {
          email: email
        },
        include: {
          bookings: true,
          DSPTransactions: true
        }
      })
      break;
    case 'DELETE': // delete booking by ID
      // result = await removeCustById(email);
      res.json({ result, message: `booking ${email} deleted` });
      break;
    case 'POST': // create new booking including user
      // const { name, age } = req.body;
      // result = await createNewCust();
      res.json({ result, message: `created booking` });
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