import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.id
  if (!userId) return

  const method = req.method;
  const prisma = new PrismaClient();

  let result;
  switch (method) {
    case 'GET': // get booking by ID
      result = await prisma.dSPUser.findFirst({
        where: {
          id: userId
        },
        include: {
          bookings: true,
          DSPTransactions: true
        }
      })
      break;
    case 'DELETE': // delete user by ID
      // result = await removeCustById(userId);
      res.json({ result, message: `user ${userId} deleted` });
      break;
    case 'POST': // create new user including user
      // const { name, age } = req.body;
      // result = await createNewCust();
      res.json({ result, message: `created user` });
      break;
    case 'PUT': // update a user - prob for amount or status
      // const { amount, status } = req.body;
      // result = await createNewCust();
      res.json({ result, message: `updated user` });
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
      break;
  }

  await prisma.$disconnect() // should be able to remove at some point

  res.json(result)
}