import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  let data;

  if (req.method === 'GET') {
    const prisma = new PrismaClient();
    const users = await prisma.dSPUser.findMany();
    // check users for error...
    data = users;
    await prisma.$disconnect()
  }

  res.status(200).json(data)
}