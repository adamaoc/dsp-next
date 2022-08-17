import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
// should have a component that brings in PrismaClient
// so you don't have to instatiate it each time

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  let data;

  const prisma = new PrismaClient();

  if (req.method === 'GET') {
    const bookings = await prisma.dSPBookings.findMany();
    // check bookings for error...
    data = bookings;
    await prisma.$disconnect()
  }

  if (req.method === 'POST') {
    const { name, email, bookedDate, bookedTime, paymentType, paymentAmount } = req.body;
    const today = new Date();
    // see if user exists - if not create user //
    let user;
    let booking;
    let transaction;
    user = await prisma.dSPUser.findFirst({
      where: {
        email: email
      }
    });

    if (!user) {
      user = await prisma.dSPUser.create({
        data: {
          name: name,
          email: email
        }
      })
    }
    // add new booking based on user found or created //
    booking = await prisma.dSPBookings.create({
      data: {
        userId: user.id,
        date: bookedDate,
        time: bookedTime,
        total: 30000,
        status: 'pending'
      }
    })
    // add transaction to booking //
    transaction = await prisma.dSPTransactions.create({
      data: {
        datePaid: today,
        amount: paymentAmount,
        method: paymentType,
        userId: user.id,
        bookingId: booking.id
      }
    })

    res.status(200).json({ message: 'Booking Created!' })
    // res.json({
    //   user: user,
    //   booking: booking,
    //   transaction: transaction,
    //   message: 'booking created',
    //   status: '200'
    // })
  }

  res.status(200).json(data)
}